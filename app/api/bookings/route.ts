import { NextResponse } from 'next/server';
import db, { isPostgres } from '@/lib/db';
import { sql } from '@vercel/postgres';
import { sendAdminBookingRequest } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const booking = body?.bookingData;

    if (!booking?.name || !booking?.email || !booking?.phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const payload = {
      service: booking.service || 'N/A',
      type: booking.type || 'online',
      date: booking.date || 'N/A',
      time: booking.time || 'N/A',
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      notes: booking.notes || '',
    };

    let id: number | string | null = null;

    if (isPostgres) {
      const result = await sql`
        INSERT INTO bookings (service, type, date, time, name, email, phone, notes, payment_status, paypal_order_id, email_sent)
        VALUES (${payload.service}, ${payload.type}, ${payload.date}, ${payload.time}, ${payload.name}, ${payload.email}, ${payload.phone}, ${payload.notes}, 'pending', NULL, 0)
        RETURNING id
      `;
      id = result.rows?.[0]?.id ?? null;
    } else {
      const result = db.prepare(`
        INSERT INTO bookings (service, type, date, time, name, email, phone, notes, payment_status, paypal_order_id, email_sent, payment_method, status, admin_notified, customer_email_sent)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', NULL, 0, 'bank_transfer', 'pending', 0, 0)
      `).run(
        payload.service,
        payload.type,
        payload.date,
        payload.time,
        payload.name,
        payload.email,
        payload.phone,
        payload.notes
      );
      id = result.lastInsertRowid as any;
    }

    try {
      await sendAdminBookingRequest({ ...payload, id });
      if (!isPostgres && id) {
        db.prepare('UPDATE bookings SET admin_notified = 1 WHERE id = ?').run(id);
      }
    } catch (emailError) {
      console.error('Failed to notify admin by email:', emailError);
    }

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error('Create booking error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
