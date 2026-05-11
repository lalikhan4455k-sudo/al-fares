import { NextResponse } from 'next/server';
import db, { isPostgres } from '@/lib/db';
import { sql } from '@vercel/postgres';
import { sendNewSubscriberNotification } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    if (isPostgres) {
      await sql`INSERT INTO subscribers (email) VALUES (${email})`;
    } else {
      db.prepare('INSERT INTO subscribers (email) VALUES (?)').run(email);
    }

    // Notify owner + acknowledge client (email)
    try {
      await sendNewSubscriberNotification(email);
    } catch (notifyError) {
      console.error('Failed to notify owner of new subscriber:', notifyError);
      return NextResponse.json({ error: 'Email system error. Please try again later.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Subscribed successfully' });
  } catch (error: any) {
    // Check for duplicate key error
    if (error.code === '23505' || error.code === 'SQLITE_CONSTRAINT') {
      return NextResponse.json({ message: 'Already subscribed' });
    }
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
