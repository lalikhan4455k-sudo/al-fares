import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import db from '@/lib/db';
import { sendBookingConfirmation } from '@/lib/email';

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not defined');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia' as any,
  });
};

export async function POST(req: Request) {
  try {
    const { session_id } = await req.json();
    if (!session_id) {
      return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === 'paid') {
      const metadata = session.metadata;

      if (metadata) {
        // Check if already processed
        const existing = db.prepare('SELECT id FROM bookings WHERE stripe_session_id = ?').get(session.id);
        
        if (!existing) {
          // Save to DB
          db.prepare(`
            INSERT INTO bookings (service, type, date, time, name, email, phone, notes, payment_status, stripe_session_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'paid', ?)
          `).run(
            metadata.service || 'N/A',
            metadata.type || 'online',
            metadata.date || 'N/A',
            metadata.time || 'N/A',
            metadata.name || 'N/A',
            metadata.email || 'N/A',
            metadata.phone || 'N/A',
            metadata.notes || '',
            session.id
          );

          // Send Emails
          try {
            await sendBookingConfirmation(metadata);
          } catch (emailError) {
            console.error('Email sending failed:', emailError);
          }
        }
      }
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Payment not successful' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Confirm booking error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
