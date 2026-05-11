'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, FileText, LayoutDashboard, LogOut, Calendar, User, Phone, Mail, Clock, CreditCard, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState<'blogs' | 'bookings'>('blogs');
  const [approvingId, setApprovingId] = useState<number | string | null>(null);

  const fetchBlogs = async () => {
    const res = await fetch('/api/blogs');
    const data = await res.json();
    setBlogs(data);
  };

  const fetchBookings = async () => {
    const res = await fetch('/api/admin/bookings');
    const data = await res.json();
    setBookings(data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      const load = async () => {
        setLoading(true);
        try {
          await Promise.all([fetchBlogs(), fetchBookings()]);
        } finally {
          setLoading(false);
        }
      };
      load();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this should be a server-side check with a secure session
    // For this request, we'll use a simple client-side check with an env var or hardcoded value
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const handleDeleteBlog = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchBlogs();
      } else {
        alert('Failed to delete blog');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting blog');
    }
  };

  const approveBooking = async (id: number | string) => {
    if (!confirm('Approve this consultation after receiving the payment screenshot on WhatsApp?')) return;

    setApprovingId(id);
    try {
      const res = await fetch(`/api/admin/bookings/${id}/approve`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to approve booking');
      await fetchBookings();
    } catch (error: any) {
      alert(error.message || 'Error approving booking');
    } finally {
      setApprovingId(null);
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

  return (
    <div className="min-h-screen bg-gray-50 flex text-black">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white p-6 flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-primary font-bold">GL</div>
          <span className="font-serif font-bold text-xl">Admin Panel</span>
        </div>
        
        <nav className="flex-grow space-y-2">
          <button 
            onClick={() => setTab('blogs')}
            className={`w-full flex items-center gap-3 p-3 rounded-sm transition-colors ${tab === 'blogs' ? 'bg-white/10 text-secondary' : 'hover:bg-white/5'}`}
          >
            <FileText className="w-5 h-5" />
            <span>Manage Blogs</span>
          </button>
          <button 
            onClick={() => setTab('bookings')}
            className={`w-full flex items-center gap-3 p-3 rounded-sm transition-colors ${tab === 'bookings' ? 'bg-white/10 text-secondary' : 'hover:bg-white/5'}`}
          >
            <Calendar className="w-5 h-5" />
            <span>Consultations</span>
          </button>
          <Link href="/admin/blogs/new" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-sm transition-colors">
            <Plus className="w-5 h-5" />
            <span>New Blog</span>
          </Link>
        </nav>

        <button 
          onClick={() => setIsAuthenticated(false)}
          className="flex items-center gap-3 p-3 text-white/60 hover:text-white transition-colors mt-auto"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-12 overflow-y-auto">
        {tab === 'blogs' ? (
          <>
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
                        <Link 
                          href={`/admin/blogs/edit/${blog.id}`}
                          className="inline-block p-2 text-primary/40 hover:text-primary transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDeleteBlog(blog.id)}
                          className="p-2 text-primary/40 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <div className="mb-12">
              <h1 className="text-3xl font-serif font-bold text-primary">Consultation Bookings</h1>
              <p className="text-primary/60">View and manage all legal consultation requests.</p>
            </div>

            <div className="space-y-6">
              {loading ? (
                <div className="bg-white p-12 text-center text-primary/40 rounded-sm border border-primary/5">Loading bookings...</div>
              ) : bookings.length === 0 ? (
                <div className="bg-white p-12 text-center text-primary/40 rounded-sm border border-primary/5">No bookings found.</div>
              ) : bookings.map((booking) => (
                <div key={booking.id} className="bg-white p-8 rounded-sm border border-primary/5 shadow-sm hover:shadow-md transition-all">
                  <div className="flex flex-col lg:flex-row justify-between gap-8">
                    <div className="space-y-4 flex-grow">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary">
                          <User className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-serif font-bold text-primary">{booking.name}</h3>
                          <p className="text-xs font-bold uppercase tracking-widest text-secondary">{booking.service}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-primary/70">
                          <Mail className="w-4 h-4 text-secondary" />
                          <span>{booking.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary/70">
                          <Phone className="w-4 h-4 text-secondary" />
                          <span>{booking.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary/70">
                          <Calendar className="w-4 h-4 text-secondary" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary/70">
                          <Clock className="w-4 h-4 text-secondary" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary/70">
                          <MapPin className="w-4 h-4 text-secondary" />
                          <span className="capitalize">{booking.type}</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary/70">
                          <CreditCard className="w-4 h-4 text-secondary" />
                          {booking.status === 'approved' || booking.payment_status === 'paid' ? (
                            <span className="uppercase font-bold text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Approved</span>
                          ) : (
                            <span className="uppercase font-bold text-[10px] px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">Pending</span>
                          )}
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-sm border border-primary/5">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary/40 mb-2">Case Summary</p>
                        <p className="text-sm text-primary/80 italic">&quot;{booking.notes || 'No notes provided'}&quot;</p>
                      </div>
                    </div>
                    
                    <div className="lg:w-48 flex flex-col justify-between items-end">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary/30">ID: #{booking.id}</span>
                      <div className="flex gap-2">
                        {booking.status !== 'approved' && booking.payment_status !== 'paid' ? (
                          <button
                            onClick={() => approveBooking(booking.id)}
                            disabled={approvingId === booking.id}
                            className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest bg-secondary text-primary hover:bg-secondary-hover transition-colors rounded-sm disabled:opacity-50"
                          >
                            {approvingId === booking.id ? '...' : 'Approve'}
                          </button>
                        ) : null}
                        <button className="p-2 text-primary/40 hover:text-primary transition-colors border border-primary/10 rounded-sm"><Edit className="w-4 h-4" /></button>
                        <button className="p-2 text-primary/40 hover:text-red-600 transition-colors border border-primary/10 rounded-sm"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
