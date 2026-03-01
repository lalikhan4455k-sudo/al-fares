import { NextResponse } from 'next/server';
import db, { isPostgres } from '@/lib/db';
import { sql } from '@vercel/postgres';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    let blog: any;

    if (isPostgres) {
      const { rows } = await sql`SELECT * FROM blogs WHERE id = ${id}`;
      blog = rows[0];
    } else {
      blog = db.prepare('SELECT * FROM blogs WHERE id = ?').get(id);
    }
    
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (error) {
    console.error('Fetch blog error:', error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, excerpt, content, author, category, image } = body;

    if (isPostgres) {
      await sql`
        UPDATE blogs 
        SET title = ${title}, excerpt = ${excerpt}, content = ${content}, author = ${author}, category = ${category}, image = ${image}
        WHERE id = ${id}
      `;
    } else {
      db.prepare(`
        UPDATE blogs 
        SET title = ?, excerpt = ?, content = ?, author = ?, category = ?, image = ?
        WHERE id = ?
      `).run(title, excerpt, content, author, category, image, id);
    }

    return NextResponse.json({ message: 'Blog updated successfully' });
  } catch (error) {
    console.error('Update blog error:', error);
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    if (isPostgres) {
      await sql`DELETE FROM blogs WHERE id = ${id}`;
    } else {
      db.prepare('DELETE FROM blogs WHERE id = ?').run(id);
    }

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
