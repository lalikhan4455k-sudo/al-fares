import { NextResponse } from 'next/server';
import { sendContactFormNotification } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message, phone } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Notify owner
    try {
      await sendContactFormNotification({ name, email, subject, message, phone });
    } catch (notifyError) {
      console.error('Failed to notify owner of contact form submission:', notifyError);
    }

    return NextResponse.json({ message: 'Message sent successfully' });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
