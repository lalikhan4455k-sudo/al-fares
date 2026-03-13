import Image from 'next/image';
import { Award, BookOpen, Scale, ShieldCheck, GraduationCap, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'About The Lawyer | Gulf Legal Consultant',
  description: 'Learn about our licensed legal consultant providing expert services across Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, Oman, and Jordan.',
};

export default function AboutPage() {
  return (
    <div className="bg-light text-primary min-h-screen">
      {/* Header */}
      <section className="bg-primary py-24 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary z-10"></div>
        <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/600?random=4')] opacity-10 object-cover mix-blend-overlay"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-md tracking-tight">
            About The Lawyer
          </h1>
          <div className="w-16 h-[2px] bg-secondary mx-auto mb-6"></div>
          <h2 className="text-xl md:text-2xl text-secondary mb-6 drop-shadow-sm font-medium">
            Experience & Integrity
          </h2>
          <p className="text-base md:text-lg text-light/80 leading-relaxed max-w-2xl mx-auto">
            Professional legal consultancy services across the Middle East, providing strategic legal guidance in Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, Oman, and Jordan.
          </p>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] rounded-lg overflow-hidden relative z-10 shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
                  alt="Dedicated Lawyer - Legal Consultant"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-secondary/20 z-0 rounded-lg"></div>
              
              <div className="mt-10 bg-white p-8 border-l-4 border-secondary shadow-md rounded-r-lg">
                <h3 className="font-bold text-xl mb-4">Mission Statement</h3>
                <p className="text-primary/80 italic leading-relaxed text-base">
                  &quot;To provide unparalleled legal representation with integrity, dedication, and strategic foresight. We strive to protect our clients&apos; rights and secure their future across borders, ensuring justice and excellence in every case we handle.&quot;
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <h3 className="text-xs font-bold text-secondary uppercase tracking-[0.3em] mb-4">Professional Biography</h3>
              <h4 className="text-3xl md:text-4xl font-bold mb-8 leading-tight tracking-tight">
                Over 13 Years of <span className="text-secondary">Legal Excellence</span>
              </h4>
              
              <div className="prose prose-lg text-primary/80 mb-10 max-w-none">
                <p className="mb-6 text-lg leading-relaxed font-normal">
                  GLC is an experienced Legal Consultancy firm, with over 13 years of practice across, UAE, Oman, Qatar, Kuwait, Philippine, India, Bangladesh, Pakistan, Egypt and the Kingdom of Saudi Arabia. GLC specializes in labor law, civil matters, corporate advisory, and cross-border legal support for businesses and individuals operating in the Gulf region.
                </p>
                <p className="mb-6 text-lg leading-relaxed font-normal">
                  Since 2013 GLC is known for practical, business-focused legal solutions, including drafting legal notices, contract review, and regulatory compliance advisory. GLC maintains strategic joint ventures with licensed law firm, in every jurisdiction across Middle East and beyond, enabling broader legal coverage within the GCC.
                </p>
                <p className="text-lg leading-relaxed font-normal">
                  GLC is committed to delivering efficient, technology-driven legal consultancy tailored to modern client needs. We believe in a client-first approach, ensuring that every legal strategy is tailored to the unique needs and goals of the individuals and businesses we represent.
                </p>
              </div>

              {/* Office Video Section */}
              <div className="mb-16">
                <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-6">Our Office Environment</h3>
                <div className="aspect-video rounded-xl overflow-hidden bg-primary/5 relative group border border-primary/10 shadow-lg">
                  <iframe 
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1&loop=1&playlist=dQw4w9WgXcQ" 
                    title="Office Environment"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                  <div className="absolute inset-0 bg-primary/20 pointer-events-none group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <p className="mt-4 text-xs text-primary/50 italic font-normal">A glimpse into our professional workspace where strategic legal solutions are crafted.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white p-6 shadow-sm border border-primary/5 rounded-sm">
                  <GraduationCap className="w-10 h-10 text-secondary mb-4" />
                  <h5 className="font-bold uppercase tracking-wider mb-2">Education</h5>
                  <ul className="space-y-2 text-primary/70 text-sm">
                    <li>• LL.M. in International Commercial Law</li>
                    <li>• Bachelor of Laws (LL.B.)</li>
                    <li>• Diploma in Sharia Law</li>
                    <li>• Specialized in Anti-Money Laundering Matters</li>
                    <li>• Specialized in Immigration Laws</li>
                  </ul>
                </div>
                <div className="bg-white p-6 shadow-sm border border-primary/5 rounded-sm">
                  <Award className="w-10 h-10 text-secondary mb-4" />
                  <h5 className="font-bold uppercase tracking-wider mb-2">Certifications</h5>
                  <ul className="space-y-2 text-primary/70 text-sm">
                    <li>• Licensed Lawyer - Saudi Ministry of Justice</li>
                    <li>• Registered Legal Consultant - Dubai Legal Affairs</li>
                    <li>• Certified Arbitrator</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-6">Areas of Expertise</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
                {[
                  'Corporate Structuring & Governance',
                  'Cross-Border Commercial Disputes',
                  'Family Law & Inheritance (Sharia)',
                  'Real Estate & Property Law',
                  'Employment & Labor Law',
                  'Alternative Dispute Resolution'
                ].map((area, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-sm shadow-sm border border-primary/5">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="font-medium text-sm">{area}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-6">Professional Timeline</h3>
              <div className="space-y-8">
                {[
                  { year: '2010 - Present', title: 'Managing Partner', company: 'Gulf Legal Consultant', desc: 'Leading strategic legal advisory for high-net-worth individuals and multinational corporations in KSA and UAE.' },
                  { year: '2005 - 2010', title: 'Senior Legal Consultant', company: 'International Legal Group', desc: 'Specialized in cross-border commercial litigation and corporate restructuring across the GCC.' },
                  { year: '2000 - 2005', title: 'Legal Associate', company: 'Regional Advocacy Chambers', desc: 'Focused on Sharia-compliant family law and civil litigation in Saudi Arabia.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-secondary"></div>
                      {i < 2 && <div className="w-px flex-grow bg-secondary/20 my-2"></div>}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">{item.year}</span>
                      <h5 className="text-lg font-bold text-primary">{item.title}</h5>
                      <p className="text-xs text-primary/60 mb-1">{item.company}</p>
                      <p className="text-xs text-primary/70 leading-relaxed font-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold text-secondary uppercase tracking-[0.3em] mb-4">Our Foundation</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Core Values</h3>
            <p className="text-light/60 max-w-xl mx-auto text-base font-normal">
              Our practice is built on a foundation of unwavering principles that guide every legal strategy and client interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: 'Integrity', desc: 'We maintain the highest ethical standards, ensuring honesty and transparency in all our legal dealings.' },
              { icon: Scale, title: 'Excellence', desc: 'We strive for perfection in every case, combining deep legal knowledge with strategic innovation.' },
              { icon: BookOpen, title: 'Dedication', desc: 'Our commitment to our clients is absolute, providing relentless advocacy to protect their interests.' }
            ].map((value, i) => (
              <div key={i} className="text-center group p-8 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-500">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary transition-colors duration-500">
                  <value.icon className="w-8 h-8 text-secondary group-hover:text-primary transition-colors duration-500" />
                </div>
                <h4 className="text-xl font-bold mb-4">{value.title}</h4>
                <p className="text-light/70 leading-relaxed text-sm font-normal">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
