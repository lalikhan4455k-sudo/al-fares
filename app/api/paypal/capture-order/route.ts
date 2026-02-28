import { NextResponse } from 'next/server';
import { capturePayment } from '@/lib/paypal';
import { sendBookingConfirmation } from '@/lib/email';

// Import db carefully
let db: any;
try {
  db = require('@/lib/db').default;
} catch (e) {
  console.warn('Database could not be loaded on this environment', e);
}

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();
    if (!orderId) {
      return NextResponse.json({ error: 'Missing orderId' }, { status: 400 });
    }

    const captureData = await capturePayment(orderId);

    if (captureData.status === 'COMPLETED') {
      // Extract booking data from custom_id
      const purchaseUnit = captureData.purchase_units[0];
      const metadata = JSON.parse(purchaseUnit.payments.captures[0].custom_id || purchaseUnit.custom_id || '{}');
      
      console.log(`PayPal capture processing order: ${orderId}`);
      let dbId: number | null = null;

      // 1. Try to save to DB
      if (db) {
        try {
          const existing = db.prepare('SELECT id, email_sent FROM bookings WHERE paypal_order_id = ?').get(orderId) as { id: number, email_sent: number } | undefined;
          
          if (existing) {
            console.log(`Booking already exists in DB with ID: ${existing.id}`);
            dbId = existing.id;
            if (existing.email_sent === 1) {
              return NextResponse.json({ success: true, message: 'Already processed' });
            }
          } else {
            const result = db.prepare(`
              INSERT INTO bookings (service, type, date, time, name, email, phone, notes, payment_status, paypal_order_id, email_sent)
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
              orderId
            );
            dbId = result.lastInsertRowid as number;
            console.log(`Saved new booking to DB with ID: ${dbId}`);
          }
        } catch (dbError) {
          console.error('Database operation failed in paypal capture route:', dbError);
        }
      }

      // 2. Send Emails
      try {
        console.log(`Attempting to send booking confirmation emails to: ${metadata.email}`);
        const sent = await sendBookingConfirmation(metadata);
        
        if (sent && db && dbId) {
          try {
            db.prepare('UPDATE bookings SET email_sent = 1 WHERE id = ?').run(dbId);
          } catch (updateError) {
            console.error('Failed to update email_sent status in DB:', updateError);
          }
        }
      } catch (emailError) {
        console.error('Email sending threw an error in paypal capture route:', emailError);
      }

      return NextResponse.json({ success: true, captureData });
    } else {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('PayPal Capture Order Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
