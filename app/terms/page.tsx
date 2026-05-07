export const metadata = {
  title: 'Terms & Conditions | Gulf Legal Consultant',
  description: 'Terms and Conditions for Gulf Legal Consultant website.',
};

export default function TermsPage() {
  return (
    <div className="bg-light text-primary min-h-screen">
      <section className="bg-primary py-32 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1920&auto=format&fit=crop')] opacity-20 object-cover mix-blend-overlay"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight">Terms & Conditions</h1>
          <div className="w-20 h-1 bg-secondary mx-auto"></div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-16 shadow-2xl shadow-primary/5 rounded-2xl border border-primary/5 prose prose-lg prose-primary max-w-none">
            <p className="text-xl text-primary/60 font-medium mb-12 border-l-4 border-secondary pl-6 italic">
              Last Updated: February 26, 2026
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6">1. Agreement to Terms</h2>
            <p>
              These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;) and Gulf Legal Consultant (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), led by a dedicated lawyer, concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">2. Intellectual Property Rights</h2>
            <p>
              Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the &quot;Content&quot;) and the trademarks, service marks, and logos contained therein (the &quot;Marks&quot;) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">3. User Representations</h2>
            <p>
              By using the Site, you represent and warrant that:
            </p>
            <ul className="space-y-4">
              <li>All registration information you submit will be true, accurate, current, and complete.</li>
              <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
              <li>You have the legal capacity and you agree to comply with these Terms and Conditions.</li>
              <li>You will not access the Site through automated or non-human means, whether through a bot, script, or otherwise.</li>
            </ul>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">4. Legal Advice Disclaimer</h2>
            <p>
              The information provided on this website does not, and is not intended to, constitute legal advice; instead, all information, content, and materials available on this site are for general informational purposes only. Information on this website may not constitute the most up-to-date legal or other information.
            </p>
            <p>
              Readers of this website should contact their attorney to obtain advice with respect to any particular legal matter. No reader, user, or browser of this site should act or refrain from acting on the basis of information on this site without first seeking legal advice from counsel in the relevant jurisdiction.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">5. Contact Us</h2>
            <p>
              In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
            </p>
            <div className="bg-light p-8 rounded-xl border border-primary/5 mt-8">
              <p className="font-bold text-primary mb-2">Gulf Legal Consultant</p>
              <p className="text-primary/70">King Fahd Road, Olaya District</p>
              <p className="text-primary/70">Riyadh 12211, Saudi Arabia</p>
              <p className="text-secondary mt-2 font-medium">mr.advocate.law.firm@gmail.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
