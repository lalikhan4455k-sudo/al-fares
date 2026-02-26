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
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,ar',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
              }, 'google_translate_element');
            }
          `}
        </Script>
        <style>
          {`
            .goog-te-banner-frame.skiptranslate { display: none !important; }
            body { top: 0px !important; }
            .goog-te-gadget-icon { display: none !important; }
            .goog-te-gadget-simple { background-color: transparent !important; border: none !important; padding: 0 !important; }
            .goog-te-menu-value span { display: none !important; }
            .goog-te-menu-value:after { content: '' !important; }
            .goog-te-gadget-simple img { display: none !important; }
            .goog-tooltip { display: none !important; }
            .goog-tooltip:hover { display: none !important; }
            .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
          `}
        </style>
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased" suppressHydrationWarning>
        <div id="google_translate_element" style={{ display: 'none' }}></div>
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
