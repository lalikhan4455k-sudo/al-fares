'use client';

import { ArrowRight, Scale, Briefcase, FileText, Users, Building, Gavel, Star, CheckCircle2, Shield, Globe, Clock, MessageCircle, MapPin, Phone, Mail, Send, Award, ShieldCheck, CreditCard } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import { useState, useEffect } from 'react';

export default function Home() {
  const { t } = useI18n();

  const [latestBlogs, setLatestBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch('/api/blogs');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setLatestBlogs(data.slice(0, 3));
        } else {
          console.error('Expected array of blogs, got:', data);
        }
      } catch (error) {
        console.error('Error fetching latest blogs:', error);
      }
    };
    fetchLatest();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-primary">
        {/* Immersive Background */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1920&auto=format&fit=crop"
            alt="Law Office"
            fill
            className="object-cover opacity-30 mix-blend-luminosity"
            referrerPolicy="no-referrer"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary via-primary/80 to-transparent"></div>
          
          {/* Animated Floating Shapes */}
          <motion.div 
            animate={{ 
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]"
          ></motion.div>
          <motion.div 
            animate={{ 
              y: [0, 40, 0],
              x: [0, -30, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px]"
          ></motion.div>
        </motion.div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 gap-12 items-center">
            <div className="lg:col-span-12">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-4xl"
              >
                <div className="inline-flex items-center gap-4 px-5 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 text-secondary mb-8 backdrop-blur-xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase">{t('hero.badge')}</span>
                </div>
                
                <h1 className="text-6xl md:text-8xl font-bold text-white leading-[1.1] mb-8 tracking-tight">
                  Strategic <br />
                  <span className="text-secondary relative">
                    Legal Counsel
                    <motion.span 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
                      className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-secondary to-transparent"
                    ></motion.span>
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-light/70 mb-12 leading-relaxed max-w-2xl font-normal tracking-wide">
                  {t('hero.subtitle')}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <Link
                    href="/booking"
                    className="group relative min-w-[240px] h-16 inline-flex items-center justify-center overflow-hidden bg-secondary text-primary rounded-sm font-bold uppercase tracking-[0.2em] text-[10px] transition-all active:scale-95"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {t('hero.cta1')}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-2 transition-transform duration-500" />
                    </span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  </Link>
                  <Link
                    href="/services"
                    className="group min-w-[240px] h-16 inline-flex items-center justify-center gap-2 border border-white/20 text-white hover:border-secondary px-10 rounded-sm font-bold uppercase tracking-[0.2em] text-[10px] transition-all backdrop-blur-md hover:bg-secondary/5 active:scale-95"
                  >
                    {t('hero.cta2')}
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Dynamic Process Visualization */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(212,175,55,0.08),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <h2 className="text-xs font-bold text-secondary uppercase tracking-[0.3em] mb-4">{t('process.title')}</h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">{t('process.subtitle')}</h3>
              <p className="text-light/50 text-lg font-normal leading-relaxed mb-8">
                {t('process.description')}
              </p>
              <div className="flex items-center gap-3">
                <div className="h-px w-16 bg-secondary"></div>
                <span className="text-secondary font-medium text-lg">Excellence in every step</span>
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 gap-6">
                {[
                  { 
                    step: '01', 
                    title: t('process.step1Title'), 
                    desc: t('process.step1Desc'),
                    icon: Scale
                  },
                  { 
                    step: '02', 
                    title: t('process.step2Title'), 
                    desc: t('process.step2Desc'),
                    icon: FileText
                  },
                  { 
                    step: '03', 
                    title: t('process.step3Title'), 
                    desc: t('process.step3Desc'),
                    icon: Shield
                  },
                  { 
                    step: '04', 
                    title: t('process.step4Title'), 
                    desc: t('process.step4Desc'),
                    icon: CreditCard
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, duration: 0.8 }}
                    whileHover={{ x: 15, scale: 1.02 }}
                    className="group bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl flex items-start gap-6 transition-all duration-500 hover:bg-white/10 hover:border-secondary/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary font-bold text-xl group-hover:bg-secondary group-hover:text-primary transition-all duration-500">
                        {item.step}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-secondary transition-colors">{item.title}</h4>
                      <p className="text-light/60 leading-relaxed font-normal text-base">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section - Editorial Layout */}
      <section className="py-24 bg-light text-primary relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 aspect-[5/6] rounded-xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)]"
              >
                <Image
                  src="/GULF%20LEGAL%20CONSULTANT%20LAWYER.jpeg"
                  alt="Dedicated Lawyer - Legal Consultant"
                  fill
                  className="object-cover transition-all duration-1000"
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
              </motion.div>
              
              {/* Floating Experience Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 bg-secondary text-primary p-8 rounded-xl shadow-xl z-20 border border-white/20 backdrop-blur-md"
              >
                <p className="text-5xl font-bold mb-1">15+</p>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-70">{t('about.years')}</p>
              </motion.div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-secondary/20 -z-10"></div>
            </div>
            
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-xs font-bold text-secondary uppercase tracking-[0.3em] mb-4">{t('about.title')}</h2>
                <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight tracking-tight">
                  13+ Years of <br/>
                  <span className="text-secondary">Legal Excellence</span>
                </h3>
                <p className="text-primary/70 text-lg mb-8 leading-relaxed font-normal">
                  GLC is an experienced Legal Consultancy firm with over 13 years of practice across the UAE, Oman, Qatar, Kuwait, Philippines, India, Bangladesh, Pakistan, Egypt, and KSA.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                  {[
                    'Licensed Lawyer',
                    'Corporate Specialist',
                    'Strategic Guidance',
                    'Bilingual Advisory'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 group">
                      <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-primary transition-all duration-300">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-primary/80 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                
                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 text-primary font-bold uppercase tracking-[0.2em] text-[10px] hover:text-secondary transition-all group"
                >
                  {t('about.readMore')}
                  <div className="w-10 h-px bg-primary group-hover:bg-secondary group-hover:w-16 transition-all duration-500"></div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Visual Data */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: 'Cases Resolved', value: '1,200+', icon: Scale },
              { label: 'Corporate Clients', value: '450+', icon: Building },
              { label: 'Success Rate', value: '98%', icon: ShieldCheck },
              { label: 'Years Experience', value: '15+', icon: Award },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary group-hover:text-primary transition-all duration-500 border border-secondary/20">
                  <stat.icon className="w-8 h-8 text-secondary group-hover:text-primary transition-colors" />
                </div>
                <h4 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">{stat.value}</h4>
                <p className="text-light/60 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview - Creative Grid */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-xs font-bold text-secondary uppercase tracking-[0.3em] mb-4">{t('services.title')}</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">{t('services.subtitle')}</h3>
            </div>
            <p className="text-primary/60 max-w-sm text-lg font-normal leading-relaxed text-left">
              Comprehensive legal solutions tailored to protect your personal and business interests across jurisdictions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/5 border border-primary/5 rounded-xl overflow-hidden">
            {[
              { icon: Users, title: t('services.family'), desc: 'Compassionate guidance through divorce, custody, and inheritance matters.' },
              { icon: Building, title: t('services.corporate'), desc: 'Strategic counsel for business formation, mergers, and corporate governance.' },
              { icon: Scale, title: t('services.litigation'), desc: 'Expert legal advisory services in civil disputes, property rights, and liability claims.' },
              { icon: Briefcase, title: t('services.visitVisa'), desc: 'Comprehensive support for visit and family visa applications and regulations.' },
              { icon: Shield, title: t('services.insurance'), desc: 'Professional legal advisory for insurance claims, policies, and disputes.' },
              { icon: CreditCard, title: t('services.loan'), desc: 'Expert guidance on loan financing, banking regulations, and financial agreements.' },
              { icon: ShieldCheck, title: t('services.cyber'), desc: 'Legal protection and advisory for cyber crime and digital security matters.' },
              { icon: Globe, title: t('services.investor'), desc: 'Strategic counsel for foreign investors navigating regional legal landscapes.' },
              { icon: FileText, title: 'Legal Documentation', desc: 'Precise preparation of legal documents, wills, and power of attorney.' },
            ].map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.02)' }}
                className="group bg-white p-10 transition-all duration-500 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-primary transition-all duration-500 group-hover:rotate-12">
                    <service.icon className="w-7 h-7" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-300">{service.title}</h4>
                  <p className="text-primary/60 leading-relaxed mb-6 font-normal text-base">{service.desc}</p>
                  <Link href="/services" className="inline-flex items-center gap-2 text-secondary text-[10px] font-bold uppercase tracking-[0.2em] hover:text-primary transition-all duration-300 group/link">
                    Explore Service 
                    <div className="w-6 h-px bg-secondary group-hover/link:w-10 transition-all duration-300"></div>
                  </Link>
                </div>
                {/* Decorative Background Number */}
                <div className="absolute -bottom-6 -right-6 text-8xl font-bold text-primary/[0.01] group-hover:text-secondary/[0.03] transition-colors duration-500 pointer-events-none">
                  0{i + 1}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-3 bg-primary text-white px-10 py-5 rounded-sm font-bold uppercase tracking-[0.2em] text-[10px] transition-all hover:bg-secondary hover:text-primary hover:shadow-xl active:scale-95"
            >
              View All Services
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Bento Grid Layout */}
      <section className="py-24 bg-white text-primary overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-xs font-bold text-secondary uppercase tracking-[0.3em] mb-4">Our Advantage</h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Why Choose <span className="text-secondary">Gulf Legal Consultant</span></h3>
            </div>
            <p className="text-primary/60 max-w-sm text-lg font-normal leading-relaxed text-left">
              We combine deep regional expertise with international standards to deliver exceptional legal outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* Large Feature Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-4 lg:col-span-3 bg-primary text-white p-10 rounded-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-secondary/20 transition-colors duration-700"></div>
              <Shield className="w-12 h-12 text-secondary mb-6 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
              <h4 className="text-2xl font-bold mb-4">Confidential & Discreet</h4>
              <p className="text-light/60 text-base leading-relaxed font-normal">
                Absolute privacy and professional client confidentiality protection maintained at all times. We understand the sensitive nature of legal matters in the Middle East.
              </p>
            </motion.div>

            {/* Medium Feature Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-2 lg:col-span-3 bg-light p-10 rounded-xl border border-primary/5 flex flex-col justify-between group"
            >
              <div>
                <Clock className="w-10 h-10 text-secondary mb-6 group-hover:rotate-12 transition-transform duration-500" strokeWidth={1.5} />
                <h4 className="text-xl font-bold mb-3">15+ Years Experience</h4>
                <p className="text-primary/60 leading-relaxed font-normal text-sm">
                  A proven track record of successful strategic legal guidance and advisory services across multiple jurisdictions.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-primary/10 flex items-center justify-between">
                <span className="text-3xl font-bold text-secondary">15+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Years of Excellence</span>
              </div>
            </motion.div>

            {/* Small Feature Card 1 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-2 lg:col-span-2 bg-secondary/5 p-8 rounded-xl border border-secondary/20 group"
            >
              <Globe className="w-8 h-8 text-secondary mb-4 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
              <h4 className="text-lg font-bold mb-2">Cross-Border Advisory</h4>
              <p className="text-primary/60 text-xs leading-relaxed font-normal">
                Seamless cross-border legal consultancy across Saudi Arabia, UAE, and GCC jurisdictions.
              </p>
            </motion.div>

            {/* Small Feature Card 2 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-2 lg:col-span-2 bg-primary/5 p-8 rounded-xl border border-primary/10 group"
            >
              <Users className="w-8 h-8 text-secondary mb-4 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
              <h4 className="text-lg font-bold mb-2">Client-Focused Strategy</h4>
              <p className="text-primary/60 text-xs leading-relaxed font-normal">
                Client-focused legal strategy tailored to your specific personal or business goals.
              </p>
            </motion.div>

            {/* Small Feature Card 3 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-4 lg:col-span-2 bg-light p-8 rounded-xl border border-primary/5 group"
            >
              <MessageCircle className="w-8 h-8 text-secondary mb-4 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
              <h4 className="text-lg font-bold mb-2">Bilingual Support</h4>
              <p className="text-primary/60 text-xs leading-relaxed font-normal">
                Full legal advisory services and documentation in both Arabic and English for global clients.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Latest Insights - Editorial Layout */}
      <section className="py-24 bg-white text-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-xs font-bold text-secondary uppercase tracking-[0.3em] mb-4">Latest Insights</h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Legal <span className="text-secondary">Intelligence</span></h3>
            </div>
            <Link href="/blog" className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-primary hover:text-secondary transition-all">
              View All Insights
              <div className="w-10 h-px bg-primary group-hover:bg-secondary group-hover:w-16 transition-all duration-500"></div>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            {latestBlogs.length === 0 ? (
              <div className="lg:col-span-12 text-center py-16 bg-light border border-primary/5 rounded-xl">
                <p className="text-primary/40 italic">New insights arriving soon...</p>
              </div>
            ) : (
              <>
                {/* Featured Post */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="lg:col-span-7 group relative overflow-hidden rounded-xl"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image 
                      src={latestBlogs[0].image} 
                      alt={latestBlogs[0].title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-1000" 
                      referrerPolicy="no-referrer" 
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-secondary text-primary text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                        {latestBlogs[0].category}
                      </span>
                      <span className="text-white/60 text-[8px] uppercase tracking-widest font-bold">{latestBlogs[0].date}</span>
                    </div>
                    <h4 className="text-2xl md:text-3xl font-bold text-white mb-6 group-hover:text-secondary transition-colors duration-300 leading-tight">
                      {latestBlogs[0].title}
                    </h4>
                    <Link href={`/blog/${latestBlogs[0].id}`} className="inline-flex items-center gap-2 text-secondary text-[10px] font-bold uppercase tracking-[0.2em] group/link">
                      Read Full Insight
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-2 transition-transform duration-300" />
                    </Link>
                  </div>
                </motion.div>

                {/* Secondary Posts */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  {latestBlogs.slice(1, 3).map((post) => (
                    <motion.div 
                      key={post.id}
                      whileHover={{ x: 5 }}
                      className="group flex gap-5 items-center p-5 bg-light rounded-xl border border-primary/5 hover:border-secondary/30 transition-all duration-500"
                    >
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image 
                          src={post.image} 
                          alt={post.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-700" 
                          referrerPolicy="no-referrer" 
                          sizes="96px"
                        />
                      </div>
                      <div>
                        <p className="text-[8px] text-secondary uppercase tracking-widest mb-1.5 font-bold">{post.category}</p>
                        <h4 className="text-base font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-300 line-clamp-2 leading-snug">
                          {post.title}
                        </h4>
                        <Link href={`/blog/${post.id}`} className="text-[8px] font-bold uppercase tracking-widest text-primary/40 group-hover:text-secondary transition-colors">
                          Read More
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials - Premium Quote Layout */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(212,175,55,0.05),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold text-secondary uppercase tracking-[0.3em] mb-4">Client Success</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Trusted by <span className="text-secondary">Global Leaders</span></h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Ahmed Al-Rashid', role: 'CEO, TechCorp KSA', text: 'Exceptional legal advisory support during our company restructuring. The attention to detail and strategic approach saved us significant time and resources.' },
              { name: 'Sarah M.', role: 'Private Client, Dubai', text: 'I was guided through a complex family law matter with utmost professionalism and compassion. I felt supported and confident throughout the entire advisory process.' },
              { name: 'Mohammed K.', role: 'Real Estate Developer', text: 'The best strategic legal guidance we have had for our cross-border transactions between Saudi Arabia and the UAE. Highly recommended for corporate advisory services.' }
            ].map((testimonial, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -5 }}
                className="relative p-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl group hover:bg-white/10 hover:border-secondary/30 transition-all duration-500"
              >
                <div className="text-5xl font-bold text-secondary/20 absolute top-6 left-6 group-hover:text-secondary/40 transition-colors">&quot;</div>
                <div className="relative z-10">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-light/80 text-lg italic mb-8 leading-relaxed font-normal">&quot;{testimonial.text}&quot;</p>
                  <div className="pt-6 border-t border-white/10">
                    <p className="font-bold text-secondary uppercase tracking-[0.2em] text-[10px] mb-1.5">{testimonial.name}</p>
                    <p className="text-light/40 text-[8px] uppercase tracking-widest font-bold">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-[8px] text-light/30 italic uppercase tracking-[0.2em] max-w-2xl mx-auto">
              Client testimonials reflect advisory experiences. Services are provided in accordance with applicable laws and professional regulations.
            </p>
          </div>
        </div>
      </section>

      {/* Legal Advisory Notice & Regulation Section */}
      <section className="py-24 bg-light text-primary border-t border-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Legal Advisory Notice Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 md:p-12 rounded-xl shadow-sm border border-primary/5 hover:shadow-xl transition-all duration-500 group"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4 tracking-tight group-hover:text-secondary transition-colors">
                Legal Advisory Notice
              </h3>
              <div className="w-12 h-px bg-secondary mb-6 group-hover:w-20 transition-all duration-500"></div>
              <p className="text-primary/70 leading-relaxed text-lg font-normal">
                GULF LEGAL CONSULTANT provides professional legal consultancy and advisory services. We focus on providing strategic legal guidance rather than courtroom litigation services. Legal services are provided in accordance with applicable laws and professional regulations.
              </p>
            </motion.div>

            {/* Licensed & Regulated Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-10 md:p-12 rounded-xl shadow-sm border border-primary/5 hover:shadow-xl transition-all duration-500 group"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4 tracking-tight group-hover:text-secondary transition-colors">
                Licensed & Regulated
              </h3>
              <div className="w-12 h-px bg-secondary mb-6 group-hover:w-20 transition-all duration-500"></div>
              <p className="text-primary/70 leading-relaxed text-lg font-normal">
                Fully licensed legal consultant authorized to provide legal advisory services in the Kingdom of Saudi Arabia and the United Arab Emirates. All services are delivered in compliance with local legal and professional regulatory authorities.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <Image 
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1920&auto=format&fit=crop" 
            alt="CTA Background" 
            fill 
            className="opacity-10 mix-blend-multiply object-cover" 
            sizes="100vw"
          />
        </motion.div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 tracking-tight">Ready to Discuss Your Case?</h2>
            <p className="text-primary/80 text-xl mb-10 max-w-2xl mx-auto font-normal">
              Schedule a confidential consultation today to explore your legal options and secure your rights.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-sm font-bold uppercase tracking-wider transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95"
            >
              Schedule Consultation Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
