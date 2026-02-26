'use client';

import Link from 'next/link';
import { Menu, X, Globe, Phone } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useI18n } from '@/lib/i18n/context';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n();

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.services'), href: '/services' },
    { name: t('nav.booking'), href: '/booking' },
    { name: t('nav.blog'), href: '/blog' },
    { name: t('nav.faq'), href: '/faq' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-primary/95 backdrop-blur-sm border-b border-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-3 group transition-all duration-500 hover:scale-105">
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-primary font-bold text-xl group-hover:rotate-[360deg] transition-transform duration-1000 shadow-lg shadow-secondary/20">
                  AL
                </div>
                <div className="absolute -inset-1 bg-secondary/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-secondary tracking-tight uppercase group-hover:text-white transition-colors leading-none">Al-Ahmad</span>
                <span className="text-[9px] text-light/50 tracking-[0.4em] uppercase group-hover:text-secondary transition-colors mt-1">Law Firm</span>
              </div>
            </Link>
          </div>
          
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-light/90 hover:text-secondary transition-all duration-300 text-sm font-medium uppercase tracking-wider relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-secondary/30">
              <Link
                href="/booking"
                className="bg-secondary hover:bg-white text-primary px-5 py-2 rounded-sm font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95"
              >
                {t('nav.bookNow')}
              </Link>
            </div>
          </div>

          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-light hover:text-secondary p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-primary border-b border-secondary/20 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-light hover:text-secondary hover:bg-white/5 rounded-md"
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-secondary/20 px-3 flex items-center justify-center">
                <Link
                  href="/booking"
                  onClick={() => setIsOpen(false)}
                  className="bg-secondary text-primary px-4 py-2 rounded-sm font-semibold text-sm uppercase tracking-wider w-full text-center"
                >
                  {t('nav.bookNow')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
