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
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');
  const isTest = req.headers.get('x-test-webhook') === 'true';
  const stripe = getStripe();

  let event: Stripe.Event;

  if (process.env.NODE_ENV === 'development' && isTest) {
    // Local testing bypass
    event = JSON.parse(body);
    console.log('Local webhook test triggered');
  } else {
    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 });
    }
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err: any) {
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    if (metadata) {
      // Save to DB
      db.prepare(`
        INSERT INTO bookings (service, type, date, time, name, email, phone, notes, payment_status, stripe_session_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'paid', ?)
      `).run(
        metadata.service,
        metadata.type,
        metadata.date,
        metadata.time,
        metadata.name,
        metadata.email,
        metadata.phone,
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

  return NextResponse.json({ received: true });
}
