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
      // Check if already processed
      const existing = db.prepare('SELECT id, email_sent FROM bookings WHERE stripe_session_id = ?').get(session.id) as { id: number, email_sent: number } | undefined;
      
      if (!existing) {
        // Save to DB
        const result = db.prepare(`
          INSERT INTO bookings (service, type, date, time, name, email, phone, notes, payment_status, stripe_session_id, email_sent)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'paid', ?, 0)
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
          const sent = await sendBookingConfirmation(metadata);
          if (sent) {
            db.prepare('UPDATE bookings SET email_sent = 1 WHERE id = ?').run(result.lastInsertRowid);
          }
        } catch (emailError) {
          console.error('Email sending failed in webhook:', emailError);
        }
      } else if (existing.email_sent === 0) {
        // Record exists but email failed previously, try again
        try {
          const sent = await sendBookingConfirmation(metadata);
          if (sent) {
            db.prepare('UPDATE bookings SET email_sent = 1 WHERE id = ?').run(existing.id);
          }
        } catch (emailError) {
          console.error('Email retry failed in webhook:', emailError);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
