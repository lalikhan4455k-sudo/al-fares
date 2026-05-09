'use client';

import Link from 'next/link';
import { Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { useState, type SVGProps } from 'react';

function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.6 3c.4 3 2.1 4.9 5 5v3.3c-1.9.1-3.5-.5-5-1.5v6.1c0 4-3.3 7.1-7.3 6.6-2.7-.4-5-2.6-5.3-5.4C3.5 13 7 9.6 11.2 10v3.6c-.3-.1-.7-.1-1 0-1.1.2-1.9 1.3-1.7 2.5.1.9.9 1.6 1.8 1.8 1.3.2 2.4-.8 2.4-2.1V3h3.9Z" />
    </svg>
  );
}

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
                GL
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-secondary tracking-wider uppercase">Gulf Legal</span>
                <span className="text-xs text-light/70 tracking-widest uppercase">Consultant</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              {t('about.description')}
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-secondary" />
                <span>0581676798</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-secondary" />
                <span>+923485285571</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-secondary" />
                <span>gulflegalconsultat26@gmail.com</span>
              </div>
            </div>
            <div className="flex space-x-4 pt-4">
              <a href="https://www.facebook.com/share/1CgN1xE2Tz/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-light/60 hover:text-secondary transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="https://x.com/gulflegalconslt?s=21" target="_blank" rel="noopener noreferrer" className="text-light/60 hover:text-secondary transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="https://www.instagram.com/gulflegalconsultant?igsh=YTMxZGQ4ODNmOW53" target="_blank" rel="noopener noreferrer" className="text-light/60 hover:text-secondary transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="https://www.tiktok.com/@gulf.legal.consul?_r=1&_t=ZS-96ADmdjdKQy" target="_blank" rel="noopener noreferrer" className="text-light/60 hover:text-secondary transition-colors"><TikTokIcon className="w-5 h-5" /></a>
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
                t('services.visitVisa'),
                t('services.insurance'),
                t('services.loan'),
                t('services.cyber'),
                t('services.investor')
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
            <form className="space-y-3" onSubmit={handleSubscribe} suppressHydrationWarning>
              <input 
                type="email" 
                placeholder={t('newsletter.placeholder')} 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-secondary/20 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-secondary transition-colors"
                suppressHydrationWarning
              />
              <button 
                type="submit"
                disabled={submitting}
                className="w-full bg-secondary hover:bg-secondary-hover text-primary font-bold uppercase tracking-widest text-[10px] py-2 transition-colors disabled:opacity-50"
                suppressHydrationWarning
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
          <p className="text-sm text-light/60" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} Gulf Legal Consultant. {t('footer.rights')}
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
