import { createPool } from '@vercel/postgres';
import Database from 'better-sqlite3';
import path from 'path';

// Check if we are in a Vercel environment with a Postgres URL
const isVercelPostgres = !!process.env.POSTGRES_URL;

let db: any;

if (isVercelPostgres) {
  // Use Vercel Postgres Pool
  db = createPool();
} else {
  // Fallback to SQLite for local development/preview
  const dbPath = path.join(process.cwd(), 'database.sqlite');
  db = new Database(dbPath);
  
  // Ensure tables exist in SQLite
  db.exec(`
    CREATE TABLE IF NOT EXISTS blogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      excerpt TEXT,
      content TEXT NOT NULL,
      author TEXT,
      category TEXT,
      image TEXT,
      date TEXT,
      published INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      service TEXT,
      type TEXT,
      date TEXT,
      time TEXT,
      name TEXT,
      email TEXT,
      phone TEXT,
      notes TEXT,
      payment_status TEXT,
      paypal_order_id TEXT,
      email_sent INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL
    );
  `);
}

export const isPostgres = isVercelPostgres;
export default db;
