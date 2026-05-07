'use client';

import { Users, Building, Scale, Briefcase, FileText, Gavel, MonitorPlay, ArrowRight, Shield, CreditCard, ShieldCheck, Globe } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';

const services = [
  {
    id: 'family-law',
    icon: Users,
    title: 'Family Law',
    description: 'Compassionate and expert guidance through sensitive family matters. We handle divorce proceedings, child custody, alimony, and complex inheritance cases under Sharia and civil law frameworks across the GCC.',
  },
  {
    id: 'corporate-law',
    icon: Building,
    title: 'Corporate Law',
    description: 'Strategic legal counsel for businesses of all sizes. From company formation and restructuring to mergers, acquisitions, and corporate governance compliance in KSA, UAE, and the broader Middle Middle East.',
  },
  {
    id: 'civil-law',
    icon: Scale,
    title: 'Civil Law',
    description: 'Expert representation in civil disputes. We protect your rights in property disputes, debt recovery, tort claims, and other civil litigation matters with a focus on favorable resolutions across regional jurisdictions.',
  },
  {
    id: 'visit-visa',
    icon: Briefcase,
    title: 'Visit Visa & Family Visa',
    description: 'Comprehensive legal support for visit and family visa applications. We navigate complex immigration regulations to ensure smooth processing for individuals and families across the Gulf region.',
  },
  {
    id: 'insurance-services',
    icon: Shield,
    title: 'Insurance Services',
    description: 'Professional legal advisory for all types of insurance matters. We assist with policy reviews, claim disputes, and regulatory compliance to protect your interests against insurance providers.',
  },
  {
    id: 'loan-financing',
    icon: CreditCard,
    title: 'Loan Financing Services',
    description: 'Expert guidance on banking and finance laws. We provide legal support for loan agreements, mortgage financing, and debt restructuring for both personal and commercial clients.',
  },
  {
    id: 'cyber-crime',
    icon: ShieldCheck,
    title: 'Cyber Crime',
    description: 'Specialized legal protection in the digital landscape. We handle cases involving online fraud, data breaches, digital harassment, and other cyber-related offenses under regional cyber laws.',
  },
  {
    id: 'foreigner-investors',
    icon: Globe,
    title: 'Foreigner Investors Services',
    description: 'Strategic legal counsel for international investors. We provide comprehensive support for business setup, regulatory compliance, and investment protection for foreigners entering Middle Eastern markets.',
  },
  {
    id: 'legal-documentation',
    icon: FileText,
    title: 'Legal Documentation',
    description: 'Precise preparation of essential legal documents. We assist with wills, power of attorney, non-disclosure agreements, and official government correspondence throughout the Arab world.',
  },
  {
    id: 'court-representation',
    icon: Gavel,
    title: 'Court Representation',
    description: 'Strong advocacy and litigation services. Our licensed attorneys provide robust representation in all levels of courts across Saudi Arabia, Dubai, and other key regional legal hubs.',
  },
  {
    id: 'online-consultation',
    icon: MonitorPlay,
    title: 'Online Legal Consultation',
    description: 'Accessible legal advice from anywhere. Schedule secure, confidential video consultations to discuss your legal matters with our experts without leaving your home or office, serving clients globally.',
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-light text-primary min-h-screen">
      {/* Header */}
      <section className="bg-primary py-32 relative overflow-hidden flex items-center justify-center">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10 }}
          className="absolute inset-0 z-0"
        >
          <Image src="/GULF%20LEGAL%20CONSULTANT.jpeg" alt="Background" fill className="opacity-10 object-cover mix-blend-overlay" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/90 to-primary z-10"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-md tracking-tight">
              Practice Areas
            </h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-[2px] bg-secondary mx-auto mb-8"
            ></motion.div>
            <h2 className="text-xl md:text-2xl text-secondary mb-8 drop-shadow-sm font-medium uppercase tracking-[0.2em]">
              Expert Legal Services
            </h2>
            <p className="text-lg md:text-xl text-light/80 leading-relaxed max-w-2xl mx-auto font-normal">
              Strategic legal advisory solutions designed to protect and strengthen your personal and business interests across the GCC and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, i) => (
              <motion.div 
                key={service.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                whileHover={{ y: -10 }}
                className="bg-white p-12 border border-primary/5 shadow-sm hover:shadow-2xl transition-all duration-500 rounded-2xl group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"></div>
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-secondary/5 rounded-full group-hover:bg-secondary/10 transition-all duration-700 group-hover:scale-150"></div>
                
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <service.icon className="w-16 h-16 text-secondary mb-10 transition-colors duration-500 group-hover:text-primary" strokeWidth={1} />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-secondary transition-colors duration-300 leading-tight tracking-tight">{service.title}</h3>
                  
                  <p className="text-primary/60 leading-relaxed mb-8 font-normal text-base">
                    {service.description}
                  </p>
                  
                  <Link
                    href={`/booking?service=${service.id}`}
                    className="inline-flex items-center gap-3 text-[10px] font-bold text-primary uppercase tracking-[0.2em] hover:text-secondary transition-all duration-300 group/link relative"
                  >
                    Book Consultation
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform duration-300" />
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-secondary transition-all duration-300 group-hover/link:w-full"></span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 skew-x-12 translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-xs font-bold text-secondary uppercase tracking-[0.3em] mb-4">Methodology</h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight tracking-tight">Our Strategic Legal Process</h3>
              <p className="text-light/60 text-base mb-10 leading-relaxed font-normal">
                We follow a rigorous, multi-stage process to ensure that every client receives the highest standard of legal representation and strategic counsel.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: 'Initial Assessment', desc: 'A thorough review of your legal standing and objectives to identify potential risks and opportunities.' },
                  { title: 'Strategic Planning', desc: 'Developing a customized legal roadmap aligned with regional regulations and your specific goals.' },
                  { title: 'Execution & Advocacy', desc: 'Relentless pursuit of your interests through negotiation, documentation, or litigation.' }
                ].map((step, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-10 h-10 rounded-full border border-secondary/30 flex items-center justify-center text-secondary font-bold flex-shrink-0 text-sm">
                      0{i + 1}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1.5">{step.title}</h4>
                      <p className="text-light/70 text-xs leading-relaxed font-normal">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden relative z-10">
                <Image src="/GULF%20LEGAL%20CONSULTANT.jpeg" alt="Legal Strategy" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="absolute -top-8 -left-8 w-32 h-32 border-t-2 border-l-2 border-secondary/30 z-0"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 border-b-2 border-r-2 border-secondary/30 z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">Need Immediate Legal Assistance?</h2>
          <p className="text-light/80 text-base mb-10 max-w-xl mx-auto font-normal">
            Our team is ready to provide the expert guidance you need. Contact us today to discuss your case in confidence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-hover text-primary px-8 py-4 rounded-sm font-bold uppercase tracking-wider transition-all"
            >
              Schedule Consultation
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-secondary text-secondary hover:bg-secondary/10 px-8 py-4 rounded-sm font-bold uppercase tracking-wider transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
