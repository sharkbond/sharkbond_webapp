'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase, Target, Handshake, TrendingUp, CheckCircle,
  Send, ChevronRight, AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import ScrollReveal from '@/components/sharkbond/ScrollReveal';

const benefits = [
  { icon: TrendingUp, title: 'High Profit Margins', desc: 'Our competitive pricing structure ensures maximum profitability for your retail or wholesale business.' },
  { icon: Target, title: 'Marketing Support', desc: 'Receive branded collateral, regional ad support, and promotional materials at no extra cost.' },
  { icon: Handshake, title: 'Dedicated Support', desc: 'Get a dedicated account manager for seamless ordering, fast dispatch, and after-sales assistance.' },
  { icon: Briefcase, title: 'Exclusive Territories', desc: 'Operate with exclusive dealership rights in your city or district, protecting your market share.' },
];

const INDIA_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman & Nicobar', 'Chandigarh', 'Dadra & Nagar Haveli', 'Daman & Diu', 'Delhi', 'Jammu & Kashmir',
  'Ladakh', 'Lakshadweep', 'Puducherry'
];

/* ── Validation helpers ── */
const isValidIndianMobile = (val: string) => /^[6-9]\d{9}$/.test(val.replace(/[\s\-\+]/g, '').replace(/^91/, ''));
const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

/* ── Field error display ── */
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

const Dealership: React.FC = () => {
  const [form, setForm] = useState({ name: '', business_name: '', mobile: '', email: '', state: '', city: '', message: '' });
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
  const nameError = touched.name && !form.name.trim() ? 'Applicant name is required' : '';
  const businessError = touched.business_name && !form.business_name.trim() ? 'Business name is required' : '';
  const stateError = touched.state && !form.state ? 'Please select a state' : '';
  const cityError = touched.city && !form.city.trim() ? 'City is required' : '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      setForm({ ...form, [name]: value.replace(/[^\d\s\+\-]/g, '') });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleBlur = (field: string) => setTouched(t => ({ ...t, [field]: true }));

  const formValid = form.name.trim() && form.business_name.trim() && mobileValid && emailValid && form.state && form.city.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, business_name: true, mobile: true, email: true, state: true, city: true });
    if (!formValid) return;

    setLoading(true); setStatus(null);
    try {
      const res = await fetch('/api/inquiries/dealer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', business_name: '', mobile: '', email: '', state: '', city: '', message: '' });
        setTouched({});
        toast.success('Application submitted!', { description: 'Our dealership team will contact you within 48 hours.' });
      } else {
        const data = await res.json().catch(() => null);
        setStatus('error');
        toast.error('Submission failed', { description: data?.error || 'Please try again or contact us directly.' });
      }
    } catch {
      setStatus('error');
      toast.error('Network error', { description: 'Please check your connection and try again.' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#001a3a] pt-24 pb-12 sm:pt-28 sm:pb-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,180,216,0.6) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5"
          style={{ background: 'radial-gradient(circle at 80% 50%, #00b4d8, transparent 60%)' }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label">Partnership Program</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-heading text-white mb-4">Become a Dealer</h1>
          <p className="text-gray-300 text-xl font-body max-w-2xl mb-8">Join 5,000+ dealers across India and grow your business with India&apos;s most trusted solvent cement brand.</p>
          <div className="flex flex-wrap gap-3">
            {['High Profit Margins', 'PAN India Network', 'Marketing Support', 'Priority Shipping'].map(t => (
              <span key={t} className="flex items-center gap-2 bg-white/10 border border-white/10 text-white text-sm font-medium px-4 py-2 rounded-full">
                <CheckCircle size={14} className="text-sb-accent" /> {t}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Left: Benefits */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight font-heading text-sb-primary mb-2">Why Partner<br />with Shark Bond?</h2>
              <p className="text-sb-grey text-sm leading-relaxed font-body">We provide everything you need to build a successful distribution business with one of India&apos;s fastest growing solvent cement brands.</p>
            </div>
            <div className="space-y-4">
              {benefits.map(({ icon: Icon, title, desc }, i) => (
                <ScrollReveal key={title} delay={i * 0.1} x={-30} y={0}>
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}
                    className="flex gap-4 bg-white p-5 rounded-[28px] border border-gray-100 shadow-sm hover:shadow-md hover:border-sb-accent/20 transition-all group">
                    <div className="w-10 h-10 bg-sb-primary/5 group-hover:bg-sb-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors mt-0.5">
                      <Icon size={20} className="text-sb-primary group-hover:text-sb-accent transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm font-heading mb-1">{title}</h4>
                      <p className="text-sb-grey text-xs leading-relaxed font-body">{desc}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>

            {/* Requirements */}
            <ScrollReveal delay={0.3}>
              <div className="bg-[#001a3a] rounded-[28px] p-6 text-white shadow-lg">
                <h3 className="font-bold text-base font-heading text-white mb-4 flex items-center gap-2">
                  <CheckCircle size={18} className="text-sb-accent" /> Eligibility Requirements
                </h3>
                <ul className="space-y-2.5 text-sm text-gray-300 font-body">
                  {[
                    'Valid GST Registration',
                    'Established hardware / plumbing retail shop',
                    'Minimum initial order commitment',
                    'Service area in the dealership region',
                  ].map((r, i) => (
                    <motion.li key={r} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.08 }} viewport={{ once: true }} className="flex items-start gap-2">
                      <ChevronRight size={14} className="text-sb-accent mt-0.5 flex-shrink-0" />
                      {r}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Form */}
          <ScrollReveal className="lg:col-span-3" delay={0.2} x={30} y={0}>
            <div className="bg-white rounded-[28px] shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-sb-primary to-blue-800 px-8 py-6">
                <h2 className="text-2xl font-extrabold text-white font-heading">Dealership Application</h2>
                <p className="text-blue-200 text-sm font-body mt-1">Fill in your details and our team will contact you within 48 hours.</p>
              </div>
              <div className="p-5 sm:p-8">
                {status === 'success' ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                      <CheckCircle size={40} className="text-green-500" />
                    </div>
                    <h3 className="text-2xl font-extrabold font-heading text-gray-800 mb-2">Application Submitted!</h3>
                    <p className="text-sb-grey max-w-sm mx-auto font-body">Thank you for your interest. Our dealership team will review your application and contact you within 48 hours.</p>
                    <button onClick={() => setStatus(null)}
                      className="mt-6 bg-sb-primary text-white font-semibold px-8 py-3 rounded-xl hover:bg-blue-900 transition-colors">
                      Submit Another Application
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {status === 'error' && (
                      <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-body">
                        Submission failed. Please try again or contact us directly.
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Applicant Name */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Applicant Name *</label>
                        <input type="text" name="name" value={form.name} onChange={handleChange} onBlur={() => handleBlur('name')}
                          placeholder="Your full name"
                          className={inputCls(!!nameError, !!touched.name, !!form.name.trim())} />
                        {nameError && <FieldError msg={nameError} />}
                      </div>
                      {/* Business Name */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Business / Firm Name *</label>
                        <input type="text" name="business_name" value={form.business_name} onChange={handleChange} onBlur={() => handleBlur('business_name')}
                          placeholder="M/s Example Enterprises"
                          className={inputCls(!!businessError, !!touched.business_name, !!form.business_name.trim())} />
                        {businessError && <FieldError msg={businessError} />}
                      </div>
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
                          placeholder="you@business.com"
                          className={inputCls(!!emailError, !!touched.email, emailValid)} />
                        {emailError && <FieldError msg={emailError} />}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* State */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                        <select name="state" value={form.state} onChange={handleChange} onBlur={() => handleBlur('state')}
                          className={inputCls(!!stateError, !!touched.state, !!form.state)}>
                          <option value="">Select State</option>
                          {INDIA_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {stateError && <FieldError msg={stateError} />}
                      </div>
                      {/* City */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                        <input type="text" name="city" value={form.city} onChange={handleChange} onBlur={() => handleBlur('city')}
                          placeholder="Your city"
                          className={inputCls(!!cityError, !!touched.city, !!form.city.trim())} />
                        {cityError && <FieldError msg={cityError} />}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Information <span className="text-gray-400 font-normal">(optional)</span></label>
                      <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                        placeholder="Tell us about your existing business, current customer base, monthly turnover expectations..."
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-sb-primary/30 bg-gray-50 focus:bg-white transition-all resize-none" />
                    </div>

                    <button type="submit" disabled={loading} aria-label="Submit dealership application"
                      className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-base transition-all text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-sb-accent hover:bg-[#0096b4] shadow-lg shadow-cyan-500/20'}`}>
                      {loading ? 'Submitting...' : <><Send size={20} /> Submit Application</>}
                    </button>
                    <p className="text-xs text-center text-sb-grey font-body">By submitting, you agree to be contacted by our dealership team.</p>
                  </form>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Dealership;
