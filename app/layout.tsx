import type {Metadata} from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { I18nProvider } from '@/lib/i18n/context';
import Script from 'next/script';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Al-Fares Law Firm | Legal Consultation Middle East',
  description: 'Professional legal consultation services in Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, Oman, and Jordan. Expert representation in family, corporate, and civil law.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased" suppressHydrationWarning>
        <I18nProvider>
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
