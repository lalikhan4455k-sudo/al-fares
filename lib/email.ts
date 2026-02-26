import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const EMAIL_STYLE = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;600&display=swap');
    body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #1a1a1a; margin: 0; padding: 0; background-color: #f4f4f5; }
    .wrapper { padding: 40px 20px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #0c1c35 0%, #1a365d 100%); color: #ffffff; padding: 50px 40px; text-align: center; position: relative; }
    .header::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 4px; background: #d4af37; }
    .header h1 { font-family: 'Playfair Display', serif; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: 1px; color: #ffffff; }
    .header p { margin: 10px 0 0 0; color: #d4af37; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600; }
    .content { padding: 40px; }
    .content h2 { font-family: 'Playfair Display', serif; color: #0c1c35; font-size: 24px; margin-top: 0; margin-bottom: 20px; border-bottom: 1px solid #f0f0f0; padding-bottom: 15px; }
    .footer { background-color: #fafafa; padding: 30px 40px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee; }
    .button { background-color: #d4af37; color: #0c1c35 !important; padding: 14px 28px; text-decoration: none; font-weight: 600; display: inline-block; margin-top: 25px; border-radius: 4px; text-transform: uppercase; letter-spacing: 1px; font-size: 13px; }
    .details { background-color: #f8fafc; padding: 25px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 25px 0; }
    .details ul { list-style: none; padding: 0; margin: 0; }
    .details li { margin-bottom: 12px; font-size: 15px; display: flex; align-items: flex-start; }
    .details li:last-child { margin-bottom: 0; }
    .details strong { color: #0c1c35; font-weight: 600; min-width: 140px; display: inline-block; }
    .message-box { background-color: #fff; padding: 20px; border-left: 4px solid #d4af37; font-style: italic; color: #4a5568; margin-top: 15px; }
  </style>
`;

export async function sendBookingConfirmation(booking: any) {
  const { name, email, service, date, time, type } = booking;

  // Email to Client
  await transporter.sendMail({
    from: `"Ahmad Khan | Al-Fares Law Firm" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Consultation Confirmed - Al-Fares Law Firm',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
      ${EMAIL_STYLE}
      </head>
      <body>
      <div class="wrapper">
      <div class="container">
        <div class="header">
          <h1>Al-Fares Law Firm</h1>
          <p>Excellence in Legal Counsel</p>
        </div>
        <div class="content">
          <h2>Consultation Confirmed</h2>
          <p>Dear <strong>${name}</strong>,</p>
          <p>Your legal consultation has been successfully scheduled and the payment has been received. Our legal consultant will be ready to discuss your case at the appointed time.</p>
          <div class="details">
            <ul>
              <li><strong>Service:</strong> ${service}</li>
              <li><strong>Date:</strong> ${date}</li>
              <li><strong>Time:</strong> ${time}</li>
              <li><strong>Type:</strong> ${type}</li>
              <li><strong>Status:</strong> <span style="color: #10b981; font-weight: bold;">Paid (100.00 SAR)</span></li>
            </ul>
          </div>
          <p>If you need to reschedule or have any immediate questions, please contact our office directly.</p>
          <p>Thank you for choosing Al-Fares Law Firm.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Ahmad Khan | Al-Fares Law Firm. All rights reserved.</p>
          <p>Riyadh | Dubai | Abu Dhabi | Doha | Kuwait | Muscat</p>
        </div>
      </div>
      </div>
      </body>
      </html>
    `,
  });

  // Email to Owner
  await transporter.sendMail({
    from: `"System" <${process.env.EMAIL_USER}>`,
    to: process.env.OWNER_EMAIL,
    subject: 'NEW BOOKING: Consultation Scheduled',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
      ${EMAIL_STYLE}
      </head>
      <body>
      <div class="wrapper">
      <div class="container">
        <div class="header">
          <h1>New Booking Received</h1>
          <p>Action Required</p>
        </div>
        <div class="content">
          <h2>Client Details</h2>
          <div class="details">
            <ul>
              <li><strong>Client Name:</strong> ${name}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Phone:</strong> ${booking.phone || 'N/A'}</li>
              <li><strong>Service:</strong> ${service}</li>
              <li><strong>Date:</strong> ${date}</li>
              <li><strong>Time:</strong> ${time}</li>
              <li><strong>Type:</strong> ${type}</li>
            </ul>
          </div>
          <p><strong>Client Notes:</strong></p>
          <div class="message-box">${booking.notes || 'No notes provided'}</div>
        </div>
      </div>
      </div>
      </body>
      </html>
    `,
  });
}

export async function sendBlogUpdate(subscribers: string[], blog: any) {
  const { title, excerpt, id } = blog;
  const blogUrl = `${process.env.APP_URL}/blog/${id}`;

  for (const email of subscribers) {
    try {
      await transporter.sendMail({
        from: `"Ahmad Khan | Al-Fares Law Firm" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Legal Insight: ${title}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
          ${EMAIL_STYLE}
          </head>
          <body>
          <div class="wrapper">
          <div class="container">
            <div class="header">
              <h1>Legal Insights</h1>
              <p>Al-Fares Law Firm</p>
            </div>
            <div class="content">
              <h2>${title}</h2>
              <p>${excerpt}</p>
              <a href="${blogUrl}" class="button">Read Full Article</a>
              <hr style="margin-top: 30px; border: 0; border-top: 1px solid #eee;" />
              <p style="font-size: 11px; color: #999;">You are receiving this because you subscribed to Al-Fares Law Firm updates.</p>
            </div>
          </div>
          </div>
          </body>
          </html>
        `,
      });
    } catch (error) {
      console.error(`Failed to send blog update to ${email}:`, error);
    }
  }
}

export async function sendNewSubscriberNotification(email: string) {
  // Notify Owner
  await transporter.sendMail({
    from: `"System" <${process.env.EMAIL_USER}>`,
    to: process.env.OWNER_EMAIL,
    subject: 'NEW SUBSCRIBER: Newsletter Signup',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
      ${EMAIL_STYLE}
      </head>
      <body>
      <div class="wrapper">
      <div class="container">
        <div class="header">
          <h1>New Newsletter Subscriber</h1>
        </div>
        <div class="content">
          <p>A new user has subscribed to the Al-Fares Law Firm newsletter.</p>
          <div class="details">
            <p><strong>Email Address:</strong> ${email}</p>
          </div>
        </div>
      </div>
      </div>
      </body>
      </html>
    `,
  });

  // Acknowledge Client
  await transporter.sendMail({
    from: `"Ahmad Khan | Al-Fares Law Firm" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Welcome to Al-Fares Law Firm Newsletter',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
      ${EMAIL_STYLE}
      </head>
      <body>
      <div class="wrapper">
      <div class="container">
        <div class="header">
          <h1>Welcome</h1>
        </div>
        <div class="content">
          <h2>Thank you for subscribing!</h2>
          <p>You have successfully joined the Al-Fares Law Firm newsletter. You will now receive our latest legal insights and firm updates directly in your inbox.</p>
          <p>We look forward to sharing our expertise with you.</p>
        </div>
      </div>
      </div>
      </body>
      </html>
    `,
  });
}

export async function sendContactFormNotification(data: any) {
  const { name, email, subject, message, phone } = data;
  
  // Notify Owner
  await transporter.sendMail({
    from: `"System" <${process.env.EMAIL_USER}>`,
    to: process.env.OWNER_EMAIL,
    subject: `CONTACT FORM: ${subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
      ${EMAIL_STYLE}
      </head>
      <body>
      <div class="wrapper">
      <div class="container">
        <div class="header">
          <h1>Contact Form Submission</h1>
        </div>
        <div class="content">
          <h2>Message Details</h2>
          <div class="details">
            <ul>
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Phone:</strong> ${phone || 'N/A'}</li>
              <li><strong>Subject:</strong> ${subject}</li>
            </ul>
          </div>
          <p><strong>Message:</strong></p>
          <div class="message-box">${message}</div>
        </div>
      </div>
      </div>
      </body>
      </html>
    `,
  });

  // Acknowledge Client
  await transporter.sendMail({
    from: `"Ahmad Khan | Al-Fares Law Firm" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'We Received Your Message - Al-Fares Law Firm',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
      ${EMAIL_STYLE}
      </head>
      <body>
      <div class="wrapper">
      <div class="container">
        <div class="header">
          <h1>Message Received</h1>
        </div>
        <div class="content">
          <h2>Dear ${name},</h2>
          <p>Thank you for reaching out to Al-Fares Law Firm. We have received your message regarding "<strong>${subject}</strong>" and our team will review it promptly.</p>
          <p>One of our legal consultants will get back to you within 24-48 business hours.</p>
          <div class="details">
            <p><strong>Your Message:</strong></p>
            <div class="message-box">${message}</div>
          </div>
          <p>Thank you for your patience.</p>
        </div>
      </div>
      </div>
      </body>
      </html>
    `,
  });
}
