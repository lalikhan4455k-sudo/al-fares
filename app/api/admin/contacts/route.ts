import { NextResponse } from 'next/server';
import db, { isPostgres } from '@/lib/db';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    let contacts: any[] = [];

    if (isPostgres) {
      const { rows } = await sql`SELECT * FROM contact_messages ORDER BY id DESC`;
      contacts = rows;
    } else {
      contacts = db.prepare('SELECT * FROM contact_messages ORDER BY id DESC').all();
    }

    return NextResponse.json(contacts);
  } catch (error: any) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

