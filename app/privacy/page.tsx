export const metadata = {
  title: 'Privacy Policy | Al-Fares Law Firm',
  description: 'Privacy Policy for Al-Fares Law Firm website.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-light text-primary min-h-screen">
      <section className="bg-primary py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Privacy Policy</h1>
          <div className="w-24 h-1 bg-secondary mx-auto"></div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg text-primary/80">
          <h2>1. Introduction</h2>
          <p>
            Al-Fares Law Firm (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our legal consultation services.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our services, when you participate in activities on the website, or otherwise when you contact us.
          </p>
          <ul>
            <li><strong>Personal Data:</strong> Name, email address, phone number, and other contact details.</li>
            <li><strong>Case Information:</strong> Details regarding your legal matters provided during consultation booking.</li>
            <li><strong>Technical Data:</strong> IP address, browser type, operating system, and usage details.</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>
            We use the information we collect or receive:
          </p>
          <ul>
            <li>To facilitate account creation and logon process.</li>
            <li>To provide and manage our legal services.</li>
            <li>To respond to your inquiries and offer support.</li>
            <li>To send administrative information to you.</li>
            <li>To protect our Services.</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
          </p>

          <h2>5. Contact Us</h2>
          <p>
            If you have questions or comments about this notice, you may email us at privacy@alfareslaw.com or by post to:
          </p>
          <p>
            Al-Fares Law Firm<br />
            King Fahd Road, Olaya District<br />
            Riyadh 12211, Saudi Arabia
          </p>
        </div>
      </section>
    </div>
  );
}
