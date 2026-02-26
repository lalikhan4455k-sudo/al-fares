'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { useState } from 'react';

export default function Footer() {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: t('newsletter.success') });
        setEmail('');
      } else {
        setMessage({ type: 'error', text: data.error || t('newsletter.error') });
      }
    } catch (error) {
      setMessage({ type: 'error', text: t('newsletter.error') });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-primary border-t border-secondary/20 pt-16 pb-8 text-light/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-xl font-serif">
                AL
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-secondary tracking-wider uppercase">Al-Fares</span>
                <span className="text-xs text-light/70 tracking-widest uppercase">Law Firm</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              {t('about.description')}
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light/60 hover:text-secondary transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light/60 hover:text-secondary transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-light/60 hover:text-secondary transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light/60 hover:text-secondary transition-colors"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-secondary font-serif text-lg font-bold uppercase tracking-wider mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: t('nav.home'), href: '/' },
                { name: t('nav.about'), href: '/about' },
                { name: t('nav.services'), href: '/services' },
                { name: t('nav.booking'), href: '/booking' },
                { name: t('nav.blog'), href: '/blog' },
                { name: t('nav.faq'), href: '/faq' },
                { name: t('nav.contact'), href: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm hover:text-secondary transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-secondary"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-secondary font-serif text-lg font-bold uppercase tracking-wider mb-6">{t('services.title')}</h3>
            <ul className="space-y-3">
              {[
                t('services.corporate'),
                t('services.family'),
                t('services.litigation'),
                t('services.realEstate'),
                t('services.employment'),
                t('services.intellectual')
              ].map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-sm hover:text-secondary transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-secondary"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-secondary font-serif text-lg font-bold uppercase tracking-wider mb-6">{t('newsletter.title')}</h3>
            <p className="text-sm mb-6 leading-relaxed">
              {t('newsletter.subtitle')}
            </p>
            <form className="space-y-3" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                placeholder={t('newsletter.placeholder')} 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-secondary/20 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-secondary transition-colors"
              />
              <button 
                type="submit"
                disabled={submitting}
                className="w-full bg-secondary hover:bg-secondary-hover text-primary font-bold uppercase tracking-widest text-[10px] py-2 transition-colors disabled:opacity-50"
              >
                {submitting ? '...' : t('newsletter.button')}
              </button>
              {message && (
                <p className={`text-[10px] mt-2 ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {message.text}
                </p>
              )}
            </form>
          </div>

        </div>

        <div className="border-t border-secondary/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-light/60">
            &copy; {new Date().getFullYear()} Al-Fares Law Firm. {t('footer.rights')}
          </p>
          <div className="flex space-x-6 text-sm text-light/60">
            <Link href="/privacy" className="hover:text-secondary transition-colors">{t('footer.privacy')}</Link>
            <Link href="/terms" className="hover:text-secondary transition-colors">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
