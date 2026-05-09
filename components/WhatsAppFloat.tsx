import { MessageCircle } from 'lucide-react';

const WHATSAPP_HREF = 'https://wa.me/966581676798';

export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-black/20 transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-white"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}

