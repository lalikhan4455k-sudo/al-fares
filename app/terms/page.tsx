export const metadata = {
  title: 'Terms & Conditions | Al-Fares Law Firm',
  description: 'Terms and Conditions for Al-Fares Law Firm website.',
};

export default function TermsPage() {
  return (
    <div className="bg-light text-primary min-h-screen">
      <section className="bg-primary py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Terms & Conditions</h1>
          <div className="w-24 h-1 bg-secondary mx-auto"></div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg text-primary/80">
          <h2>1. Agreement to Terms</h2>
          <p>
            These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;) and Al-Fares Law Firm (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
          </p>

          <h2>2. Intellectual Property Rights</h2>
          <p>
            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the &quot;Content&quot;) and the trademarks, service marks, and logos contained therein (the &quot;Marks&quot;) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
          </p>

          <h2>3. User Representations</h2>
          <p>
            By using the Site, you represent and warrant that:
          </p>
          <ul>
            <li>All registration information you submit will be true, accurate, current, and complete.</li>
            <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
            <li>You have the legal capacity and you agree to comply with these Terms and Conditions.</li>
            <li>You will not access the Site through automated or non-human means, whether through a bot, script, or otherwise.</li>
          </ul>

          <h2>4. Legal Advice Disclaimer</h2>
          <p>
            The information provided on this website does not, and is not intended to, constitute legal advice; instead, all information, content, and materials available on this site are for general informational purposes only. Information on this website may not constitute the most up-to-date legal or other information.
          </p>
          <p>
            Readers of this website should contact their attorney to obtain advice with respect to any particular legal matter. No reader, user, or browser of this site should act or refrain from acting on the basis of information on this site without first seeking legal advice from counsel in the relevant jurisdiction.
          </p>

          <h2>5. Contact Us</h2>
          <p>
            In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
          </p>
          <p>
            Al-Fares Law Firm<br />
            King Fahd Road, Olaya District<br />
            Riyadh 12211, Saudi Arabia<br />
            info@alfareslaw.com
          </p>
        </div>
      </section>
    </div>
  );
}
