import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { sendBlogUpdate } from '@/lib/email';

export async function GET() {
  try {
    const { rows: blogs } = await sql`SELECT * FROM blogs ORDER BY id DESC`;
    
    if (blogs.length === 0) {
      // Auto-seed if empty
      const seedData = [
        {
          title: 'Understanding Corporate Law in Saudi Arabia',
          excerpt: 'A comprehensive guide to the latest changes in corporate regulations and compliance for businesses operating in the Kingdom.',
          content: 'Corporate law in Saudi Arabia has undergone significant transformations recently...',
          author: 'Advocate Ejaz',
          category: 'Corporate Law',
          image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop',
          date: 'February 15, 2024'
        },
        {
          title: 'Real Estate Investment: Legal Pitfalls to Avoid',
          excerpt: 'Navigating the complexities of property law in the UAE and Saudi Arabia requires a keen eye for detail.',
          content: 'Investing in real estate is a major decision...',
          author: 'Legal Expert',
          category: 'Real Estate',
          image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=800&auto=format&fit=crop',
          date: 'February 10, 2024'
        }
      ];

      for (const post of seedData) {
        await sql`
          INSERT INTO blogs (title, excerpt, content, author, category, image, date, published)
          VALUES (${post.title}, ${post.excerpt}, ${post.content}, ${post.author}, ${post.category}, ${post.image}, ${post.date}, 1)
        `;
      }

      const { rows: seededBlogs } = await sql`SELECT * FROM blogs ORDER BY id DESC`;
      return NextResponse.json(seededBlogs);
    }

    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Fetch blogs error:', error);
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

    const result = await sql`
      INSERT INTO blogs (title, excerpt, content, author, category, image, date, published)
      VALUES (${title}, ${excerpt}, ${content}, ${author}, ${category}, ${image}, ${date}, 1)
      RETURNING id
    `;

    const blogId = result.rows[0].id;

    // Notify subscribers
    try {
      const { rows: subscribers } = await sql`SELECT email FROM subscribers`;
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
