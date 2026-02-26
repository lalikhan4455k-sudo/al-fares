'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      // In a real app, we might verify the session here
      const timer = setTimeout(() => setLoading(false), 0);
      return () => clearTimeout(timer);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      </div>
    );
  }

  return (
    <div className="bg-light min-h-screen py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-16 shadow-2xl rounded-sm border border-primary/5 text-center"
        >
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-serif font-bold text-primary mb-4">Payment Successful!</h1>
          <p className="text-primary/60 text-lg mb-12 max-w-md mx-auto">
            Your consultation has been successfully booked and confirmed. A confirmation email has been sent to your inbox.
          </p>

          <div className="bg-light p-8 rounded-sm border border-primary/10 mb-12 text-left max-w-md mx-auto space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-secondary mb-4">Booking Reference</h3>
            <div className="flex items-center gap-3 text-primary/80">
              <Calendar className="w-5 h-5 text-secondary" />
              <span>Session ID: {sessionId?.slice(-8).toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-3 text-primary/80">
              <Clock className="w-5 h-5 text-secondary" />
              <span>Duration: 20 Minutes</span>
            </div>
            <div className="flex items-center gap-3 text-primary/80">
              <MapPin className="w-5 h-5 text-secondary" />
              <span>Location: Online / Office</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-xs transition-all hover:bg-primary/90"
            >
              Return to Home
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 text-primary hover:text-secondary px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-xs transition-all"
            >
              Read Latest Insights
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-light">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      </div>
    }>
      <BookingSuccessContent />
    </Suspense>
  );
}
