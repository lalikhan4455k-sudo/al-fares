'use client';

import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blogs/${resolvedParams.id}`);
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [resolvedParams.id]);

  const handleShare = async () => {
    if (!post) return;
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-light gap-6">
        <h1 className="text-2xl font-serif font-bold">Insight not found</h1>
        <Link href="/blog" className="text-secondary font-bold uppercase tracking-widest text-xs">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="bg-light text-primary min-h-screen">
      <article>
        {/* Hero Image */}
        <div className="relative h-[40vh] md:h-[60vh] w-full">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <Link href="/blog" className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors font-bold uppercase tracking-wider text-sm mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </Link>
              <div className="bg-secondary text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm inline-block mb-4">
                {post.category}
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6">
                {post.title}
              </h1>
              <div className="flex items-center gap-6 text-light/80 font-medium">
                <span className="flex items-center gap-2"><Calendar className="w-5 h-5" /> {post.date}</span>
                <span className="flex items-center gap-2"><User className="w-5 h-5" /> {post.author}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div 
            className="prose prose-lg prose-headings:font-serif prose-headings:text-primary prose-a:text-secondary hover:prose-a:text-secondary-hover prose-img:rounded-sm"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="mt-16 pt-8 border-t border-primary/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-bold uppercase tracking-wider text-sm text-primary/60">Share this article</span>
              <button 
                onClick={handleShare}
                className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
