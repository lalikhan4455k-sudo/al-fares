export const metadata = {
  title: 'Privacy Policy | Al-Fares Law Firm',
  description: 'Privacy Policy for Al-Fares Law Firm website.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-light text-primary min-h-screen">
      <section className="bg-primary py-32 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1920&auto=format&fit=crop')] opacity-20 object-cover mix-blend-overlay"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight">Privacy Policy</h1>
          <div className="w-20 h-1 bg-secondary mx-auto"></div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-16 shadow-2xl shadow-primary/5 rounded-2xl border border-primary/5 prose prose-lg prose-primary max-w-none">
            <p className="text-xl text-primary/60 font-medium mb-12 border-l-4 border-secondary pl-6 italic">
              Last Updated: February 26, 2026
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6">1. Introduction</h2>
            <p>
              Al-Fares Law Firm (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), led by Ahmad Khan, is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our legal consultation services.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">2. Information We Collect</h2>
            <p>
              We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our services, when you participate in activities on the website, or otherwise when you contact us.
            </p>
            <ul className="space-y-4">
              <li><strong className="text-secondary">Personal Data:</strong> Name, email address, phone number, and other contact details.</li>
              <li><strong className="text-secondary">Case Information:</strong> Details regarding your legal matters provided during consultation booking.</li>
              <li><strong className="text-secondary">Technical Data:</strong> IP address, browser type, operating system, and usage details.</li>
            </ul>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">3. How We Use Your Information</h2>
            <p>
              We use the information we collect or receive:
            </p>
            <ul className="space-y-4">
              <li>To facilitate account creation and logon process.</li>
              <li>To provide and manage our legal services.</li>
              <li>To respond to your inquiries and offer support.</li>
              <li>To send administrative information to you.</li>
              <li>To protect our Services.</li>
            </ul>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">4. Data Security</h2>
            <p>
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">5. Contact Us</h2>
            <p>
              If you have questions or comments about this notice, you may email us at <a href="mailto:mr.advocate.law.firm@gmail.com" className="text-secondary hover:underline">mr.advocate.law.firm@gmail.com</a> or by post to:
            </p>
            <div className="bg-light p-8 rounded-xl border border-primary/5 mt-8">
              <p className="font-bold text-primary mb-2">Al-Fares Law Firm</p>
              <p className="text-primary/70">King Fahd Road, Olaya District</p>
              <p className="text-primary/70">Riyadh 12211, Saudi Arabia</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
