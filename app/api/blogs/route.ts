import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { sendBlogUpdate } from '@/lib/email';

export async function GET() {
  try {
    let blogs = db.prepare('SELECT * FROM blogs ORDER BY date DESC').all();
    
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
        },
        {
          title: 'The Future of Fintech Regulation in the Middle East',
          excerpt: 'How regulatory sandboxes and new licensing frameworks are shaping the growth of financial technology.',
          content: 'The Middle East is becoming a global hub for fintech...',
          author: 'Advocate Ejaz',
          category: 'Fintech',
          image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop',
          date: 'February 5, 2024'
        },
        {
          title: 'Intellectual Property Protection for Startups',
          excerpt: 'Protecting your ideas is as important as executing them. Learn how to secure your trademarks.',
          content: 'For startups, intellectual property is often their most valuable asset...',
          author: 'IP Specialist',
          category: 'Intellectual Property',
          image: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=800&auto=format&fit=crop',
          date: 'January 28, 2024'
        },
        {
          title: 'Employment Law: Rights and Responsibilities',
          excerpt: 'An overview of the labor laws governing the relationship between employers and employees in the GCC.',
          content: 'Understanding labor law is essential for both employers and employees...',
          author: 'HR Legal Advisor',
          category: 'Employment Law',
          image: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?q=80&w=800&auto=format&fit=crop',
          date: 'January 20, 2024'
        },
        {
          title: 'Navigating International Arbitration',
          excerpt: 'Why arbitration is becoming the preferred method for resolving cross-border commercial disputes.',
          content: 'International arbitration offers a neutral and efficient way to settle disputes...',
          author: 'Senior Consultant',
          category: 'Dispute Resolution',
          image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop',
          date: 'January 15, 2024'
        },
        {
          title: 'Cybersecurity Laws: What Businesses Need to Know',
          excerpt: 'As digital threats evolve, so do the laws designed to combat them. Stay compliant and protected.',
          content: 'Cybersecurity is no longer just an IT issue; it is a legal one...',
          author: 'Tech Lawyer',
          category: 'Cybersecurity',
          image: 'https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?q=80&w=800&auto=format&fit=crop',
          date: 'January 10, 2024'
        },
        {
          title: 'Taxation Trends in the GCC',
          excerpt: 'From VAT to Corporate Tax, we analyze the shifting fiscal landscape and its impact on your business.',
          content: 'The GCC is moving away from a tax-free model...',
          author: 'Tax Consultant',
          category: 'Taxation',
          image: 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?q=80&w=800&auto=format&fit=crop',
          date: 'January 5, 2024'
        },
        {
          title: 'Maritime Law: Navigating Global Trade',
          excerpt: 'The legal complexities of shipping, logistics, and international waters explained.',
          content: 'Maritime law governs a vast array of activities...',
          author: 'Maritime Expert',
          category: 'Maritime Law',
          image: 'https://images.unsplash.com/photo-1505663912202-ac22d4cb3707?q=80&w=800&auto=format&fit=crop',
          date: 'December 28, 2023'
        },
        {
          title: 'Family Law and Inheritance in the UAE',
          excerpt: 'Understanding the legal frameworks for personal status and estate planning for residents.',
          content: 'Family law matters are deeply personal...',
          author: 'Family Law Attorney',
          category: 'Family Law',
          image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop',
          date: 'December 20, 2023'
        },
        {
          title: 'Environmental Regulations and Sustainability',
          excerpt: 'How new green initiatives and laws are impacting industrial operations and corporate responsibility.',
          content: 'Sustainability is now a legal requirement in many sectors...',
          author: 'Advocate Ejaz',
          category: 'Environmental Law',
          image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=800&auto=format&fit=crop',
          date: 'December 15, 2023'
        },
        {
          title: 'The Legal Implications of AI in Business',
          excerpt: 'Exploring the ethical and legal challenges posed by the integration of Artificial Intelligence.',
          content: 'AI is changing the way we do business...',
          author: 'AI Policy Expert',
          category: 'Technology Law',
          image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop',
          date: 'December 10, 2023'
        }
      ];

      const insert = db.prepare(`
        INSERT INTO blogs (title, excerpt, content, author, category, image, date, published)
        VALUES (?, ?, ?, ?, ?, ?, ?, 1)
      `);

      db.transaction(() => {
        for (const post of seedData) {
          insert.run(post.title, post.excerpt, post.content, post.author, post.category, post.image, post.date);
        }
      })();

      blogs = db.prepare('SELECT * FROM blogs ORDER BY date DESC').all();
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
