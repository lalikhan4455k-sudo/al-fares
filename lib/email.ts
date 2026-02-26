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
    body { font-family: 'Georgia', serif; line-height: 1.6; color: #1a1a1a; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; border: 1px solid #e5e5e5; }
    .header { background-color: #0c1c35; color: #d4af37; padding: 40px; text-align: center; }
    .content { padding: 40px; background-color: #ffffff; }
    .footer { background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #666; }
    .button { background-color: #d4af37; color: #0c1c35; padding: 12px 24px; text-decoration: none; font-weight: bold; display: inline-block; margin-top: 20px; text-transform: uppercase; letter-spacing: 1px; }
    .details { background-color: #f5f5f5; padding: 20px; border-left: 4px solid #d4af37; margin: 20px 0; }
    h1 { margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px; }
    h2 { color: #0c1c35; font-size: 20px; margin-top: 0; }
    ul { list-style: none; padding: 0; }
    li { margin-bottom: 10px; }
    strong { color: #0c1c35; }
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
      ${EMAIL_STYLE}
      <div class="container">
        <div class="header">
          <h1>Al-Fares Law Firm</h1>
          <p>Excellence in Legal Counsel</p>
        </div>
        <div class="content">
          <h2>Consultation Confirmed & Paid</h2>
          <p>Dear ${name},</p>
          <p>Your legal consultation has been successfully scheduled and the payment has been received. Our legal consultant will be ready to discuss your case at the appointed time.</p>
          <div class="details">
            <ul>
              <li><strong>Service:</strong> ${service}</li>
              <li><strong>Date:</strong> ${date}</li>
              <li><strong>Time:</strong> ${time}</li>
              <li><strong>Consultation Type:</strong> ${type}</li>
              <li><strong>Payment Status:</strong> Paid (100.00 SAR)</li>
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
    `,
  });

  // Email to Owner
  await transporter.sendMail({
    from: `"System" <${process.env.EMAIL_USER}>`,
    to: process.env.OWNER_EMAIL,
    subject: 'NEW BOOKING: Consultation Scheduled',
    html: `
      ${EMAIL_STYLE}
      <div class="container">
        <div class="header">
          <h1>New Booking Received</h1>
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
              <li><strong>Notes:</strong> ${booking.notes || 'No notes provided'}</li>
            </ul>
          </div>
        </div>
      </div>
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
          ${EMAIL_STYLE}
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
      ${EMAIL_STYLE}
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
    `,
  });

  // Acknowledge Client
  await transporter.sendMail({
    from: `"Ahmad Khan | Al-Fares Law Firm" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Welcome to Al-Fares Law Firm Newsletter',
    html: `
      ${EMAIL_STYLE}
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
      ${EMAIL_STYLE}
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
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      </div>
    `,
  });

  // Acknowledge Client
  await transporter.sendMail({
    from: `"Ahmad Khan | Al-Fares Law Firm" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'We Received Your Message - Al-Fares Law Firm',
    html: `
      ${EMAIL_STYLE}
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
            <p style="font-style: italic;">${message}</p>
          </div>
          <p>Thank you for your patience.</p>
        </div>
      </div>
    `,
  });
}
