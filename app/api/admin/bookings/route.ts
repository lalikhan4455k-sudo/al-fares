import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const bookings = db.prepare('SELECT * FROM bookings ORDER BY id DESC').all();
    return NextResponse.json(bookings);
  } catch (error: any) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
