'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Image as ImageIcon, FileText, User, Tag } from 'lucide-react';
import Link from 'next/link';

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: 'Al-Ahmad Legal Team',
    category: 'Legal Updates',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin');
      } else {
        throw new Error('Failed to create blog');
      }
    } catch (error) {
      alert('Error creating blog');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-12">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/admin"
          className="inline-flex items-center gap-2 text-primary/60 hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="bg-white p-10 rounded-sm border border-primary/5 shadow-sm">
          <h1 className="text-3xl font-serif font-bold text-primary mb-8">Create New Insight</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-primary/60">Post Title</label>
              <input 
                type="text" 
                required
                className="w-full p-4 border border-primary/10 rounded-sm focus:outline-none focus:border-secondary transition-colors text-xl font-serif"
                placeholder="Enter a compelling title..."
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-widest text-primary/60">Author</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                  <input 
                    type="text" 
                    className="w-full p-4 pl-12 border border-primary/10 rounded-sm focus:outline-none focus:border-secondary transition-colors"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-widest text-primary/60">Category</label>
                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                  <select 
                    className="w-full p-4 pl-12 border border-primary/10 rounded-sm focus:outline-none focus:border-secondary transition-colors appearance-none"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option>Legal Updates</option>
                    <option>Corporate Law</option>
                    <option>Family Law</option>
                    <option>Case Studies</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-primary/60">Excerpt (Short Summary)</label>
              <textarea 
                rows={3}
                className="w-full p-4 border border-primary/10 rounded-sm focus:outline-none focus:border-secondary transition-colors resize-none"
                placeholder="Briefly describe what this post is about..."
                value={formData.excerpt}
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
              ></textarea>
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-primary/60">Content (Markdown supported)</label>
              <textarea 
                rows={12}
                required
                className="w-full p-4 border border-primary/10 rounded-sm focus:outline-none focus:border-secondary transition-colors resize-none font-mono text-sm"
                placeholder="Write your legal insight here..."
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
              ></textarea>
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-primary/60">Cover Image URL</label>
              <div className="relative">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                <input 
                  type="text" 
                  className="w-full p-4 pl-12 border border-primary/10 rounded-sm focus:outline-none focus:border-secondary transition-colors"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                />
              </div>
            </div>

            <div className="pt-8 border-t border-primary/5 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white px-10 py-4 rounded-sm font-bold uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-primary/90 transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {loading ? 'Publishing...' : 'Publish Insight'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
