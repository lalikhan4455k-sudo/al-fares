import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { sendNewSubscriberNotification } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    await sql`INSERT INTO subscribers (email) VALUES (${email})`;

    // Notify owner
    try {
      await sendNewSubscriberNotification(email);
    } catch (notifyError) {
      console.error('Failed to notify owner of new subscriber:', notifyError);
    }

    return NextResponse.json({ message: 'Subscribed successfully' });
  } catch (error: any) {
    // Check for duplicate key error in Postgres (code 23505)
    if (error.code === '23505') {
      return NextResponse.json({ message: 'Already subscribed' });
    }
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
