import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { sendNewSubscriberNotification } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const stmt = db.prepare('INSERT INTO subscribers (email) VALUES (?)');
    stmt.run(email);

    // Notify owner
    try {
      await sendNewSubscriberNotification(email);
    } catch (notifyError) {
      console.error('Failed to notify owner of new subscriber:', notifyError);
    }

    return NextResponse.json({ message: 'Subscribed successfully' });
  } catch (error: any) {
    if (error.code === 'SQLITE_CONSTRAINT') {
      return NextResponse.json({ message: 'Already subscribed' });
    }
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
