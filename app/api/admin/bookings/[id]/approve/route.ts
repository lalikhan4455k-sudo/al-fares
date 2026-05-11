import { NextResponse } from 'next/server';
import db, { isPostgres } from '@/lib/db';
import { sql } from '@vercel/postgres';
import { sendBookingApprovedConfirmation } from '@/lib/email';

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: 'Missing booking id' }, { status: 400 });

    let booking: any = null;

    if (isPostgres) {
      const { rows } = await sql`SELECT * FROM bookings WHERE id = ${id}`;
      booking = rows?.[0] ?? null;
      if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });

      await sql`
        UPDATE bookings
        SET payment_status = 'paid'
        WHERE id = ${id}
      `;
    } else {
      booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(id);
      if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });

      db.prepare(`
        UPDATE bookings
        SET status = 'approved',
            payment_status = 'paid',
            approved_at = datetime('now')
        WHERE id = ?
      `).run(id);
    }

    try {
      const sent = await sendBookingApprovedConfirmation(booking);
      if (sent) {
        if (isPostgres) {
          await sql`UPDATE bookings SET email_sent = 1 WHERE id = ${id}`;
        } else {
          db.prepare('UPDATE bookings SET customer_email_sent = 1 WHERE id = ?').run(id);
          db.prepare('UPDATE bookings SET email_sent = 1 WHERE id = ?').run(id);
        }
      } else {
        return NextResponse.json({ error: 'Failed to send confirmation email to customer' }, { status: 500 });
      }
    } catch (emailError) {
      console.error('Failed to send approval email to customer:', emailError);
      return NextResponse.json({ error: 'Failed to send confirmation email to customer' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Approve booking error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
