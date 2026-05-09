'use client';

import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const whatsappHref = 'https://wa.me/966581676798';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      alert('Error sending message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light text-primary min-h-screen">
      {/* Header */}
      <section className="bg-primary py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/600?random=7')] opacity-10 object-cover mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-xs font-bold text-secondary uppercase tracking-[0.3em] mb-4">Get In Touch</h1>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Contact Us</h2>
          <div className="w-16 h-[2px] bg-secondary mx-auto"></div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div>
              <h3 className="text-xs font-bold text-secondary uppercase tracking-[0.3em] mb-4">Contact Information</h3>
              <h4 className="text-3xl md:text-4xl font-bold mb-10 leading-tight tracking-tight">
                Get In <span className="text-secondary">Touch</span>
              </h4>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-2">Phone</h5>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary/70 mb-1 text-sm font-normal inline-block hover:text-secondary transition-colors"
                    >
                      0581676798
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-2">Email</h5>
                    <p className="text-primary/70 text-sm font-normal">gulflegalconsultat26@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary text-white p-8 rounded-xl mb-8">
                <h5 className="font-bold text-lg mb-4 text-secondary">Need Immediate Legal Advice?</h5>
                <p className="text-light/70 text-xs mb-6 leading-relaxed font-normal">
                  Skip the form and book a direct consultation with our legal expert to get immediate answers to your legal questions.
                </p>
                <Link 
                  href="/booking" 
                  className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-hover text-primary px-6 py-3 rounded-sm font-bold uppercase tracking-wider transition-colors w-full sm:w-auto"
                >
                  Book Consultation Now
                </Link>
              </div>

              <div className="bg-white p-8 border border-primary/5 shadow-sm rounded-sm">
                <h5 className="font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-green-500" /> WhatsApp Support
                </h5>
                <p className="text-primary/70 mb-6 text-sm">
                  For urgent inquiries, you can reach our legal team directly via WhatsApp. We typically respond within 1 hour during business hours.
                </p>
                <a 
                  href={whatsappHref} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-sm font-bold uppercase tracking-wider transition-colors w-full sm:w-auto"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 md:p-12 shadow-xl shadow-primary/5 border border-primary/5 rounded-xl h-fit">
              <h3 className="text-2xl font-bold mb-8 tracking-tight">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary/70 mb-2">Your Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full p-4 border border-primary/20 rounded-sm bg-light focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary/70 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required
                      className="w-full p-4 border border-primary/20 rounded-sm bg-light focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary/70 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      className="w-full p-4 border border-primary/20 rounded-sm bg-light focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary/70 mb-2">Subject</label>
                    <input 
                      type="text" 
                      required
                      className="w-full p-4 border border-primary/20 rounded-sm bg-light focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-primary/70 mb-2">Message</label>
                  <textarea 
                    required
                    rows={6}
                    className="w-full p-4 border border-primary/20 rounded-sm bg-light focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-sm font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] w-full relative">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3625.980870559512!2d46.70165247536452!3d24.658786778061533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03f7d5d5d5d5%3A0x5d5d5d5d5d5d5d5!2sMP53%2BGM9%20Al%20Murabba%2C%20Riyadh%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1778188004141!5m2!1sen!2sus" 
          width="100%" 
          height="400" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
        />
      </section>
    </div>
  );
}
