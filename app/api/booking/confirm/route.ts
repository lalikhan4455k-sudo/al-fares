import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sendBookingConfirmation } from '@/lib/email';

// Import db carefully, it might fail on Vercel read-only filesystem
let db: any;
try {
  db = require('@/lib/db').default;
} catch (e) {
  console.warn('Database could not be loaded on this environment (expected on Vercel)', e);
}

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
        console.log(`Confirm route processing session: ${session.id}`);
        let dbId: number | null = null;

        // 1. Try to save to DB (may fail on Vercel)
        if (db) {
          try {
            const existing = db.prepare('SELECT id, email_sent FROM bookings WHERE stripe_session_id = ?').get(session.id) as { id: number, email_sent: number } | undefined;
            
            if (existing) {
              console.log(`Booking already exists in DB with ID: ${existing.id}`);
              dbId = existing.id;
              if (existing.email_sent === 1) {
                console.log('Email already sent for this booking, skipping.');
                return NextResponse.json({ success: true, message: 'Already processed' });
              }
            } else {
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
              dbId = result.lastInsertRowid as number;
              console.log(`Saved new booking to DB with ID: ${dbId}`);
            }
          } catch (dbError) {
            console.error('Database operation failed in confirm route (expected on Vercel):', dbError);
            // CRITICAL: Do not throw here. We must proceed to send the email!
          }
        }

        // 2. Send Emails (Must happen even if DB fails)
        try {
          console.log(`Attempting to send booking confirmation emails to: ${metadata.email}`);
          const sent = await sendBookingConfirmation(metadata);
          console.log(`Email sending result: ${sent}`);
          
          if (sent && db && dbId) {
            try {
              db.prepare('UPDATE bookings SET email_sent = 1 WHERE id = ?').run(dbId);
              console.log(`Updated email_sent status in DB for ID: ${dbId}`);
            } catch (updateError) {
              console.error('Failed to update email_sent status in DB:', updateError);
            }
          }
        } catch (emailError) {
          console.error('Email sending threw an error in confirm route:', emailError);
        }
      } else {
        console.warn(`Checkout session ${session.id} retrieved but missing metadata.`);
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
