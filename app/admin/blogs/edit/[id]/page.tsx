'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Image as ImageIcon, FileText, User, Tag, Upload } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: 'Gulf Legal Consultant Team',
    category: 'Legal Updates',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop',
  });

  useEffect(() => {
    if (isAuthenticated && params.id) {
      const fetchBlog = async () => {
        try {
          const res = await fetch(`/api/blogs/${params.id}`);
          if (res.ok) {
            const data = await res.json();
            setFormData(data);
          } else {
            alert('Blog not found');
            router.push('/admin');
          }
        } catch (error) {
          console.error('Fetch error:', error);
        } finally {
          setFetching(false);
        }
      };
      fetchBlog();
    }
  }, [isAuthenticated, params.id, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/blogs/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin');
      } else {
        throw new Error('Failed to update blog');
      }
    } catch (error) {
      alert('Error updating blog');
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-sm shadow-2xl w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-primary font-bold text-2xl mx-auto mb-4">GL</div>
            <h1 className="text-2xl font-serif font-bold text-primary">Admin Access</h1>
            <p className="text-primary/60 text-sm">Please enter your administrator password.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input 
                type="password" 
                placeholder="Enter Password"
                className="w-full p-4 border border-primary/10 rounded-sm focus:outline-none focus:border-secondary transition-colors text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-secondary text-primary font-bold py-4 rounded-sm uppercase tracking-widest text-xs hover:bg-secondary-hover transition-colors"
            >
              Login to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-12 text-black">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/admin"
          className="inline-flex items-center gap-2 text-primary/60 hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="bg-white p-10 rounded-sm border border-primary/5 shadow-sm">
          <h1 className="text-3xl font-serif font-bold text-primary mb-8">Edit Insight</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-primary/60">Post Title</label>
              <input 
                type="text" 
                required
                className="w-full p-4 border border-primary/10 rounded-sm focus:outline-none focus:border-secondary transition-colors text-xl font-serif text-black"
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
                    className="w-full p-4 pl-12 border border-primary/10 rounded-sm focus:outline-none focus:border-secondary transition-colors text-black"
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
                    className="w-full p-4 pl-12 border border-primary/10 rounded-sm focus:outline-none focus:border-secondary transition-colors appearance-none text-black"
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
                className="w-full p-4 border border-primary/10 rounded-sm focus:outline-none focus:border-secondary transition-colors resize-none text-black"
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
                className="w-full p-4 border border-primary/10 rounded-sm focus:outline-none focus:border-secondary transition-colors resize-none font-mono text-sm text-black"
                placeholder="Write your legal insight here..."
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
              ></textarea>
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-primary/60">Cover Image</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                    <input 
                      type="text" 
                      placeholder="Image URL"
                      className="w-full p-4 pl-12 border border-primary/10 rounded-sm focus:outline-none focus:border-secondary transition-colors text-black"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-primary/40 uppercase font-bold">Or</span>
                    <label className="flex-grow flex items-center justify-center gap-2 p-4 border-2 border-dashed border-primary/10 rounded-sm cursor-pointer hover:border-secondary hover:bg-secondary/5 transition-all">
                      <Upload className="w-4 h-4 text-secondary" />
                      <span className="text-xs font-bold uppercase tracking-widest text-primary/60">Upload from Gallery</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </label>
                  </div>
                </div>
                {formData.image && (
                  <div className="relative aspect-video rounded-sm overflow-hidden border border-primary/10">
                    <Image 
                      src={formData.image} 
                      alt="Preview" 
                      fill 
                      unoptimized
                      className="object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="pt-8 border-t border-primary/5 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white px-10 py-4 rounded-sm font-bold uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-primary/90 transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {loading ? 'Saving Changes...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
