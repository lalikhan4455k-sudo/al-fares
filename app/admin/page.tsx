'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, FileText, LayoutDashboard, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    const res = await fetch('/api/blogs');
    const data = await res.json();
    setBlogs(data);
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBlogs();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white p-6 flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-primary font-bold">A</div>
          <span className="font-serif font-bold text-xl">Admin Panel</span>
        </div>
        
        <nav className="flex-grow space-y-2">
          <Link href="/admin" className="flex items-center gap-3 p-3 bg-white/10 rounded-sm text-secondary">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/blogs/new" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-sm transition-colors">
            <Plus className="w-5 h-5" />
            <span>New Blog</span>
          </Link>
        </nav>

        <Link href="/" className="flex items-center gap-3 p-3 text-white/60 hover:text-white transition-colors mt-auto">
          <LogOut className="w-5 h-5" />
          <span>Exit Admin</span>
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-serif font-bold text-primary">Blog Management</h1>
            <p className="text-primary/60">Manage your law firm&apos;s latest insights and updates.</p>
          </div>
          <Link 
            href="/admin/blogs/new"
            className="bg-secondary text-primary px-6 py-3 rounded-sm font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-secondary-hover transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create New Post
          </Link>
        </div>

        <div className="bg-white rounded-sm border border-primary/5 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-primary/5">
              <tr>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-primary/60">Title</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-primary/60">Date</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-primary/60">Category</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-primary/60">Status</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-primary/60 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-primary/40">Loading blogs...</td></tr>
              ) : blogs.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-primary/40">No blogs found.</td></tr>
              ) : blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-secondary" />
                      <span className="font-medium text-primary">{blog.title}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-primary/60">{blog.date}</td>
                  <td className="p-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-primary/5 text-primary rounded-full">
                      {blog.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="flex items-center gap-2 text-xs text-green-600 font-medium">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                      Published
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button className="p-2 text-primary/40 hover:text-primary transition-colors"><Edit className="w-4 h-4" /></button>
                    <button className="p-2 text-primary/40 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
