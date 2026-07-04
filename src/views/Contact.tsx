'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import ScrollReveal from '@/components/sharkbond/ScrollReveal';

const Reveal = ({ children, delay = 0, className = '', y = 30, x = 0 }: {
  children: React.ReactNode; delay?: number; className?: string; y?: number; x?: number;
}) => (
  <ScrollReveal delay={delay} className={className} y={y} x={x}>
    {children}
  </ScrollReveal>
);

/* ── Validation helpers ── */
const isValidIndianMobile = (val: string) => /^[6-9]\d{9}$/.test(val.replace(/[\s\-\+]/g, '').replace(/^91/, ''));
const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

/* ── Field wrapper with inline error ── */
const FieldError = ({ msg }: { msg: string }) => (
  <p className="flex items-center gap-1 text-red-500 text-xs mt-1.5 font-medium">
    <AlertCircle size={12} /> {msg}
  </p>
);

/* ── Input class helper ── */
const inputCls = (hasError: boolean, hasTouched: boolean, isValid: boolean) =>
  `w-full border rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white ${
    hasTouched && hasError
      ? 'border-red-400 focus:ring-red-200 focus:border-red-400'
      : hasTouched && isValid
      ? 'border-green-400 focus:ring-green-200 focus:border-green-400'
      : 'border-gray-200 focus:ring-sb-primary/30 focus:border-sb-primary'
  }`;

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', mobile: '', email: '', company_name: '', message: '' });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const mobileDigits = form.mobile.replace(/[\s\-\+]/g, '').replace(/^91/, '');
  const mobileValid = isValidIndianMobile(form.mobile);
  const mobileError = touched.mobile && !mobileValid
    ? mobileDigits.length === 0
      ? 'Mobile number is required'
      : mobileDigits.length !== 10
      ? `Must be 10 digits (${mobileDigits.length}/10 entered)`
      : 'Must start with 6, 7, 8, or 9'
    : '';

  const emailValid = isValidEmail(form.email);
  const emailError = touched.email && !emailValid ? 'Enter a valid email address' : '';
  const nameError = touched.name && !form.name.trim() ? 'Full name is required' : '';
  const messageError = touched.message && !form.message.trim() ? 'Message is required' : '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // For mobile: only allow digits, +, spaces, hyphens
    if (name === 'mobile') {
      const cleaned = value.replace(/[^\d\s\+\-]/g, '');
      setForm({ ...form, [name]: cleaned });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleBlur = (field: string) => setTouched(t => ({ ...t, [field]: true }));

  const formValid = form.name.trim() && mobileValid && emailValid && form.message.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Touch all fields to show all errors
    setTouched({ name: true, mobile: true, email: true, message: true });
    if (!formValid) return;

    setLoading(true); setStatus(null);
    try {
      const res = await fetch('/api/inquiries/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', mobile: '', email: '', company_name: '', message: '' });
        setTouched({});
        toast.success('Message sent successfully!', { description: 'Our team will contact you within 24 hours.' });
      } else {
        const data = await res.json().catch(() => null);
        setStatus('error');
        toast.error('Failed to send message', { description: data?.error || 'Please try again or contact us directly.' });
      }
    } catch {
      setStatus('error');
      toast.error('Network error', { description: 'Please check your connection and try again.' });
    }
    setLoading(false);
  };

  const infoCards = [
    { icon: MapPin, label: 'Our Address', value: '03, Shreedhar Industrial park, Opp simla Hundai service near Nikol Ring Road, Nikol, 382350', href: '' },
    { icon: Phone, label: 'Call Us', value: '+91 8866604466', href: 'tel:+918866604466' },
    { icon: Mail, label: 'Email Us', value: 'Info.chemsealindustries@gmail.com', href: 'mailto:Info.chemsealindustries@gmail.com' },
    { icon: Clock, label: 'Business Hours', value: 'Mon – Sat: 9:00 AM – 6:00 PM', href: '' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-[#001a3a] pt-24 pb-12 sm:pt-28 sm:pb-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,180,216,0.6) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label">Get in Touch</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-heading text-white mb-4">Contact Us</h1>
          <p className="text-gray-300 text-xl max-w-2xl font-body">Have a product inquiry or need technical advice? Our team is ready to assist you within 24 hours.</p>
        </motion.div>
      </section>

      {/* Info Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {infoCards.map(({ icon: Icon, label, value, href }, i) => (
            <Reveal key={label} delay={i * 0.1} className="h-full">
              <div className="bg-white rounded-[28px] p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow hover:border-sb-accent/20 group h-full flex flex-col">
                <div className="w-12 h-12 bg-sb-primary/5 group-hover:bg-sb-accent/10 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <Icon size={22} className="text-sb-primary group-hover:text-sb-accent transition-colors" />
                </div>
                <p className="text-xs font-semibold text-sb-grey uppercase tracking-[0.15em] mb-2">{label}</p>
                {href ? (
                  <a href={href} className="text-gray-800 font-semibold font-body text-sm hover:text-sb-accent transition-colors leading-snug">{value}</a>
                ) : (
                  <p className="text-gray-800 font-semibold font-body text-sm leading-snug">{value}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Map + WhatsApp */}
          <div className="lg:col-span-2 space-y-5">
            <Reveal>
              <div className="rounded-[28px] overflow-hidden shadow-lg border border-gray-100 h-56 sm:h-72">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.8143431608933!2d72.6683!3d23.0446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e87a6b95b8935%3A0x524cbacd383f37aa!2sChemseal+Industries+%28Sharkbond+Solvent+Cement%29!5e0!3m2!1sen!2sin!4v1718000000000"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" title="Chemseal Industries Location" aria-label="Chemseal Industries office location on Google Maps"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <a
                href="https://wa.me/918866604466?text=Hello%2C%20I%20need%20information%20about%20Shark%20Bond%20products"
                target="_blank" rel="noreferrer"
                className="flex items-center gap-4 bg-green-500 hover:bg-green-600 text-white rounded-[28px] p-5 transition-colors group shadow-md hover:shadow-lg"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.859 0c3.161.001 6.136 1.23 8.375 3.469 2.24 2.239 3.467 5.214 3.466 8.377-.003 6.528-5.329 11.854-11.859 11.854-.001 0-.001 0 0 0-2.002-.001-3.968-.538-5.7-1.558L0 24zm6.59-4.846c1.6.95 3.488 1.449 5.258 1.45 5.534 0 10.038-4.502 10.04-10.04.001-2.68-1.041-5.198-2.937-7.096C17.054 1.57 14.533.528 11.86.528c-5.535 0-10.04 4.502-10.041 10.04-.001 1.777.462 3.513 1.341 5.064L2.14 21.78l6.194-1.626zm10.748-7.39c-.294-.147-1.743-.86-2.012-.958-.269-.098-.465-.147-.66.147-.196.294-.759.957-.93 1.15-.171.196-.343.22-.637.072-.295-.147-1.243-.458-2.368-1.462-.875-.78-1.466-1.744-1.637-2.038-.172-.294-.018-.454.13-.601.132-.132.294-.343.441-.515.147-.171.196-.294.294-.49.098-.196.05-.367-.025-.515-.074-.147-.66-1.592-.905-2.181-.239-.574-.482-.496-.66-.505-.171-.008-.367-.01-.564-.01-.196 0-.514.073-.782.367-.269.294-1.028 1.005-1.028 2.449 0 1.445 1.051 2.84 1.198 3.037.147.196 2.067 3.156 5.007 4.43.7.303 1.246.484 1.671.62.704.223 1.346.19 1.854.114.565-.084 1.743-.712 1.989-1.4.245-.687.245-1.275.172-1.397-.074-.122-.27-.196-.565-.343z"/></svg>
                </div>
                <div>
                  <p className="font-bold text-base font-heading">Chat on WhatsApp</p>
                  <p className="text-green-100 text-sm font-body">Instant response during business hours</p>
                </div>
                <Send size={18} className="ml-auto group-hover:translate-x-1 transition-transform" />
              </a>
            </Reveal>
          </div>

          {/* Contact Form */}
          <Reveal className="lg:col-span-3" delay={0.15}>
            <div className="bg-white rounded-[28px] shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-sb-primary to-blue-800 px-8 py-6">
                <h2 className="text-2xl font-extrabold text-white font-heading">Send Us a Message</h2>
                <p className="text-blue-200 text-sm mt-1 font-body">We&apos;ll respond to your inquiry within 24 business hours.</p>
              </div>
              <div className="p-5 sm:p-8">
                {status === 'success' ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                      <CheckCircle size={40} className="text-green-500" />
                    </div>
                    <h3 className="text-2xl font-extrabold font-heading text-gray-800 mb-2">Message Sent!</h3>
                    <p className="text-sb-grey font-body">Thank you for contacting us. Our team will reach out to you within 24 hours.</p>
                    <button onClick={() => setStatus(null)}
                      className="mt-6 bg-sb-primary text-white font-semibold px-8 py-3 rounded-xl hover:bg-blue-900 transition-colors">
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {status === 'error' && (
                      <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-body">
                        Failed to send message. Please try again or contact us directly.
                      </div>
                    )}

                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} onBlur={() => handleBlur('name')}
                        placeholder="Your full name"
                        className={inputCls(!!nameError, !!touched.name, !!form.name.trim())} />
                      {nameError && <FieldError msg={nameError} />}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Mobile */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number *</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold select-none">+91</span>
                          <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} onBlur={() => handleBlur('mobile')}
                            placeholder="98765 43210" maxLength={15}
                            className={`${inputCls(!!mobileError, !!touched.mobile, mobileValid)} pl-12`} />
                        </div>
                        {mobileError && <FieldError msg={mobileError} />}
                        {touched.mobile && mobileValid && (
                          <p className="flex items-center gap-1 text-green-600 text-xs mt-1.5 font-medium">
                            <CheckCircle size={12} /> Valid mobile number
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} onBlur={() => handleBlur('email')}
                          placeholder="you@company.com"
                          className={inputCls(!!emailError, !!touched.email, emailValid)} />
                        {emailError && <FieldError msg={emailError} />}
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name <span className="text-gray-400 font-normal">(optional)</span></label>
                      <input type="text" name="company_name" value={form.company_name} onChange={handleChange}
                        placeholder="Your company or business name"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-sb-primary/30 focus:border-sb-primary transition-all bg-gray-50 focus:bg-white" />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                      <textarea name="message" value={form.message} onChange={handleChange} onBlur={() => handleBlur('message')} rows={5}
                        placeholder="Tell us about your requirements, the product you're interested in, or any technical questions..."
                        className={`resize-none ${inputCls(!!messageError, !!touched.message, !!form.message.trim())}`} />
                      {messageError && <FieldError msg={messageError} />}
                    </div>

                    <button type="submit" disabled={loading}
                      className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-base transition-all text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-sb-accent hover:bg-[#0096b4] shadow-lg shadow-cyan-500/20 hover:shadow-xl'}`}>
                      {loading ? 'Sending...' : <><Send size={20} /> Send Message</>}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default Contact;
