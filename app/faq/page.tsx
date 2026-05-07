'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';

export default function FAQPage() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What areas of law do you specialize in?',
      answer: 'We provide professional legal advisory services in Corporate Law, Civil Law, Family Law, Business Contracts, Legal Documentation, and cross-border legal matters across Saudi Arabia and the United Arab Emirates.',
    },
    {
      question: 'Are you licensed to practice in both Saudi Arabia and Dubai?',
      answer: 'Yes. Our legal consultancy services are provided in compliance with the professional regulations of both the Kingdom of Saudi Arabia and the United Arab Emirates.',
    },
    {
      question: 'How do online legal consultations work?',
      answer: 'Online consultations are conducted via secure video conferencing. Once you book an appointment through our website, you will receive a confirmation email with a link to join the meeting at the scheduled time.',
    },
    {
      question: 'What are your consultation fees?',
      answer: 'Our standard initial consultation fee is 100 SAR. This fee covers a comprehensive review of your case and preliminary legal advice. Fees for ongoing representation are discussed during the consultation.',
    },
    {
      question: 'Do you handle cross-border business disputes?',
      answer: 'Absolutely. With expertise in both KSA and UAE jurisdictions, we are uniquely positioned to handle complex cross-border commercial disputes, contract negotiations, and corporate structuring.',
    },
    {
      question: 'What languages do you provide services in?',
      answer: 'We provide full legal services, including document drafting and court representation, in both Arabic and English.',
    },
  ];

  return (
    <div className="bg-light text-primary min-h-screen">
      {/* Header */}
      <section className="bg-primary py-24 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary z-10"></div>
        <div className="absolute inset-0 bg-[url('/GULF%20LEGAL%20CONSULTANT.jpeg')] opacity-10 object-cover mix-blend-overlay"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center animate-in fade-in duration-1000">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-md tracking-tight">
            {t('faq.title')}
          </h1>
          <div className="w-16 h-[2px] bg-secondary mx-auto mb-6"></div>
          <h2 className="text-xl md:text-2xl text-secondary mb-6 drop-shadow-sm font-medium">
            {t('faq.subtitle')}
          </h2>
          <p className="text-base md:text-lg text-light/80 leading-relaxed max-w-2xl mx-auto font-normal">
            {t('faq.description')}
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <h3 className="text-xs font-bold text-secondary uppercase tracking-[0.3em] mb-4">{t('faq.sidebarTitle')}</h3>
              <h4 className="text-3xl font-bold mb-6 leading-tight tracking-tight">
                {t('faq.sidebarSubtitle')}
              </h4>
              <p className="text-primary/70 text-base leading-relaxed mb-10 font-normal">
                {t('faq.sidebarDesc')}
              </p>
              
              <div className="bg-white p-8 border border-primary/5 shadow-sm rounded-xl">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                  <MessageCircle className="w-5 h-5 text-secondary" />
                </div>
                <h5 className="font-bold text-lg mb-3">{t('faq.stillQuestions')}</h5>
                <p className="text-primary/70 mb-6 text-xs leading-relaxed font-normal">
                  {t('faq.stillQuestionsDesc')}
                </p>
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wider hover:text-secondary transition-colors group"
                >
                  {t('faq.contactBtn')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Content - Accordions */}
            <div className="lg:col-span-8">
              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className="border-b border-primary/10 last:border-0"
                  >
                    <button
                      className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    >
                      <span className={`font-bold text-lg pr-8 transition-colors ${openIndex === index ? 'text-secondary' : 'text-primary group-hover:text-secondary/80'}`}>
                        {faq.question}
                      </span>
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openIndex === index ? 'border-secondary bg-secondary text-primary' : 'border-primary/20 text-primary/40 group-hover:border-secondary/50 group-hover:text-secondary/80'}`}>
                        {openIndex === index ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="text-primary/70 text-base leading-relaxed pr-12 font-normal">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
