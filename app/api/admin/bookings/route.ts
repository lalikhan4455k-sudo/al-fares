import { NextResponse } from 'next/server';
import db, { isPostgres } from '@/lib/db';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    let bookings: any[] = [];
    
    if (isPostgres) {
      const { rows } = await sql`SELECT * FROM bookings ORDER BY id DESC`;
      bookings = rows;
    } else {
      bookings = db.prepare('SELECT * FROM bookings ORDER BY id DESC').all();
    }

    return NextResponse.json(bookings);
  } catch (error: any) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
