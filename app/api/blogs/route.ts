import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { sendBlogUpdate } from '@/lib/email';

export async function GET() {
  try {
    const blogs = db.prepare('SELECT * FROM blogs ORDER BY date DESC').all();
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, excerpt, content, author, category, image } = body;
    
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const info = db.prepare(`
      INSERT INTO blogs (title, excerpt, content, author, category, image, date, published)
      VALUES (?, ?, ?, ?, ?, ?, ?, 1)
    `).run(title, excerpt, content, author, category, image, date);

    const blogId = info.lastInsertRowid;

    // Notify subscribers
    try {
      const subscribers = db.prepare('SELECT email FROM subscribers').all() as { email: string }[];
      if (subscribers.length > 0) {
        const emails = subscribers.map(s => s.email);
        await sendBlogUpdate(emails, { id: blogId, title, excerpt });
      }
    } catch (notifyError) {
      console.error('Failed to notify subscribers:', notifyError);
    }

    return NextResponse.json({ id: blogId, message: 'Blog created successfully' });
  } catch (error) {
    console.error('Blog creation error:', error);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}
