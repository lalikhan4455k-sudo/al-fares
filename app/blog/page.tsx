'use client';

import { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, Search, Tag, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useI18n } from '@/lib/i18n/context';

export default function BlogPage() {
  const { t } = useI18n();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setBlogs(data);
        } else {
          console.error('Expected array of blogs, got:', data);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

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
    <div className="bg-light text-primary min-h-screen">
      {/* Header */}
      <section className="bg-primary py-32 relative overflow-hidden flex items-center justify-center">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10 }}
          className="absolute inset-0 z-0"
        >
          <Image src="https://picsum.photos/1920/600?random=5" alt="Background" fill className="opacity-10 object-cover mix-blend-overlay" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/90 to-primary z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-xs font-bold text-secondary uppercase tracking-[0.4em] mb-6">{t('nav.blog')}</h1>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">News & Updates</h2>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-[2px] bg-secondary mx-auto"
            ></motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Blog Posts */}
            <div className="lg:col-span-2 space-y-16">
              {loading ? (
                <div className="text-center py-20">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-secondary mx-auto"></div>
                </div>
              ) : blogs.length === 0 ? (
                <div className="text-center py-20 bg-white border border-primary/5 rounded-sm">
                  <p className="text-primary/40">No insights published yet.</p>
                </div>
              ) : blogs.map((post, i) => (
                <motion.article 
                  key={post.id} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="group"
                >
                  <div className="relative h-[400px] mb-10 overflow-hidden rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-700">
                    <Image 
                      src={post.image} 
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-primary/30 group-hover:bg-primary/10 transition-colors duration-500"></div>
                    <div className="absolute top-8 left-8 bg-secondary text-primary px-5 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-2xl">
                      {post.category}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-6">
                    <span className="flex items-center gap-2.5 group-hover:text-secondary transition-colors"><Calendar className="w-4 h-4 text-secondary" /> {post.date}</span>
                    <span className="flex items-center gap-2.5 group-hover:text-secondary transition-colors"><User className="w-4 h-4 text-secondary" /> {post.author}</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-bold mb-6 group-hover:text-secondary transition-colors leading-tight tracking-tight">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  
                  <p className="text-primary/60 text-xl mb-10 leading-relaxed max-w-3xl font-normal">
                    {post.excerpt}
                  </p>
                  
                  <Link 
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-3 text-secondary font-bold uppercase tracking-[0.2em] text-[10px] hover:text-primary transition-all duration-300 group/btn relative"
                  >
                    Read Full Insight
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-secondary transition-all duration-300 group-hover/btn:w-full"></span>
                  </Link>
                </motion.article>
              ))}
            </div>

            {/* Sidebar */}
            <aside className="space-y-12">
              {/* Search */}
              <div className="bg-white p-8 border border-primary/5 rounded-sm">
                <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Search Insights</h4>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Keywords..."
                    className="w-full p-4 pr-12 border border-primary/10 rounded-sm focus:outline-none focus:border-secondary transition-colors text-sm"
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white p-8 border border-primary/5 rounded-sm">
                <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Categories</h4>
                <ul className="space-y-4">
                  {['Corporate Law', 'Family Law', 'Business Law', 'Legal Updates', 'Case Studies'].map((cat) => (
                    <li key={cat}>
                      <Link href="#" className="flex items-center justify-between group">
                        <span className="text-sm text-primary/70 group-hover:text-secondary transition-colors">{cat}</span>
                        <span className="text-[10px] font-bold text-primary/30 group-hover:text-secondary transition-colors">(12)</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div className="bg-primary p-8 rounded-xl text-white">
                <MessageCircle className="w-8 h-8 text-secondary mb-6" />
                <h4 className="text-lg font-bold mb-4">{t('newsletter.title')}</h4>
                <p className="text-light/60 text-xs mb-6 leading-relaxed font-normal">
                  {t('newsletter.subtitle')}
                </p>
                <form className="space-y-4" onSubmit={handleSubscribe}>
                  <input 
                    type="email" 
                    required
                    placeholder={t('newsletter.placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-sm focus:outline-none focus:border-secondary transition-colors text-sm"
                  />
                  <button 
                    disabled={submitting}
                    className="w-full bg-secondary text-primary py-4 rounded-sm font-bold uppercase tracking-widest text-[10px] hover:bg-secondary-hover transition-colors disabled:opacity-50"
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
            </aside>

          </div>
        </div>
      </section>
    </div>
  );
}
