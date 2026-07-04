'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, Send, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigation } from '@/store/navigation';
import ScrollReveal from '@/components/sharkbond/ScrollReveal';

const productImages: Record<string, { cane: string; tube: string }> = {
  PVC: { cane: '/assets/products/pvc-cane.png', tube: '/assets/products/pvc-tube.png' },
  UPVC: { cane: '/assets/products/upvc-cane.png', tube: '/assets/products/upvc-tube.png' },
  CPVC: { cane: '/assets/products/cpvc-cane.png', tube: '/assets/products/cpvc-tube.png' }
};

const themeColors: Record<string, { primary: string; bg: string; border: string; badge: string }> = {
  PVC: { primary: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-600 text-white' },
  UPVC: { primary: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200', badge: 'bg-indigo-600 text-white' },
  CPVC: { primary: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-600 text-white' }
};

interface ProductData {
  id: string;
  product_code: string;
  product_type: string;
  name: string;
  format: string;
  category: string;
  description: string;
  sizes: string[];
  features: string[];
  application_areas: string[];
  is_featured: number;
}

const defaultProducts: ProductData[] = [
  { id: 'pvc-cane', product_code: 'SB-PVC-CANE', product_type: 'Solvent Cement', name: 'Shark Bond PVC Clear', format: 'cane', category: 'PVC', description: 'Premium quality fast setting solvent cement for PVC pipes and fittings. Perfect for irrigation, conduits, and sewer applications.', sizes: ['59 ml', '118 ml', '237 ml', '500 ml', '1 Liter'], features: ['High shear strength & long term bonding', 'Specially formulated for PVC plumbing systems', 'Meets IS:848 quality standards'], application_areas: ['Plumbing Systems', 'Agriculture Irrigation', 'Water Supply Networks'], is_featured: 1 },
  { id: 'pvc-tube', product_code: 'SB-PVC-TUBE', product_type: 'Solvent Cement', name: 'Shark Bond PVC Clear', format: 'tube', category: 'PVC', description: 'Premium quality fast setting solvent cement for PVC pipes and fittings. Perfect for irrigation, conduits, and sewer applications.', sizes: ['10 ml', '25 ml'], features: ['High shear strength & long term bonding', 'Specially formulated for PVC plumbing systems', 'Meets IS:848 quality standards'], application_areas: ['Plumbing Systems', 'Agriculture Irrigation', 'Water Supply Networks'], is_featured: 0 },
  { id: 'upvc-cane', product_code: 'SB-UPVC-CANE', product_type: 'Solvent Cement', name: 'Shark Bond UPVC Heavy Duty', format: 'cane', category: 'UPVC', description: 'Heavy duty UPVC solvent cement designed for high pressure applications. Ideal for industrial pipelines and commercial plumbing systems.', sizes: ['59 ml', '118 ml', '237 ml', '500 ml', '1 Liter'], features: ['Resists pressure up to 16 bars', 'Chemical and corrosion-resistant shield', 'Ideal for industrial water supply networks'], application_areas: ['Industrial Pipelines', 'Commercial Construction', 'High-Rise Plumbing'], is_featured: 1 },
  { id: 'upvc-tube', product_code: 'SB-UPVC-TUBE', product_type: 'Solvent Cement', name: 'Shark Bond UPVC Heavy Duty', format: 'tube', category: 'UPVC', description: 'Heavy duty UPVC solvent cement designed for high pressure applications. Ideal for industrial pipelines and commercial plumbing systems.', sizes: ['10 ml', '25 ml'], features: ['Resists pressure up to 16 bars', 'Chemical and corrosion-resistant shield', 'Ideal for industrial water supply networks'], application_areas: ['Industrial Pipelines', 'Commercial Construction', 'High-Rise Plumbing'], is_featured: 0 },
  { id: 'cpvc-cane', product_code: 'SB-CPVC-CANE', product_type: 'Solvent Cement', name: 'Shark Bond CPVC FlowGuard', format: 'cane', category: 'CPVC', description: 'Specialized CPVC cement for hot and cold water distribution systems. Drinking water safe and high temperature resistant.', sizes: ['59 ml', '118 ml', '237 ml', '500 ml', '1 Liter'], features: ['Exceptional resistance to hot & cold water', 'NSF/ANSI drinking water safe certification', 'Quick joint assembly without primers'], application_areas: ['Residential Hot Water', 'Commercial Plumbing'], is_featured: 1 },
  { id: 'cpvc-tube', product_code: 'SB-CPVC-TUBE', product_type: 'Solvent Cement', name: 'Shark Bond CPVC FlowGuard', format: 'tube', category: 'CPVC', description: 'Specialized CPVC cement for hot and cold water distribution systems. Drinking water safe and high temperature resistant.', sizes: ['10 ml', '25 ml'], features: ['Exceptional resistance to hot & cold water', 'NSF/ANSI drinking water safe certification', 'Quick joint assembly without primers'], application_areas: ['Residential Hot Water', 'Commercial Plumbing'], is_featured: 0 },
];

/* ── Validation helpers ── */
const isValidIndianMobile = (val: string) => /^[6-9]\d{9}$/.test(val.replace(/[\s\-\+]/g, '').replace(/^91/, ''));
const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

const FieldError = ({ msg }: { msg: string }) => (
  <p className="flex items-center gap-1 text-red-500 text-xs mt-1 font-medium">
    <AlertCircle size={11} /> {msg}
  </p>
);

const inputCls = (hasError: boolean, hasTouched: boolean, isValid: boolean) =>
  `w-full border rounded-xl px-4 py-2.5 text-sm font-body focus:outline-none focus:ring-2 transition-all ${
    hasTouched && hasError
      ? 'border-red-400 focus:ring-red-200'
      : hasTouched && isValid
      ? 'border-green-400 focus:ring-green-200'
      : 'border-gray-200 focus:ring-sb-primary/30'
  }`;

const ProductDetail: React.FC = () => {
  const { productId, navigate } = useNavigation();
  const [form, setForm] = useState({ name: '', mobile: '', email: '', company_name: '', message: '' });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  const mobileDigits = form.mobile.replace(/[\s\-\+]/g, '').replace(/^91/, '');
  const mobileValid = isValidIndianMobile(form.mobile);
  const mobileError = touched.mobile && !mobileValid
    ? mobileDigits.length === 0 ? 'Mobile is required'
    : mobileDigits.length !== 10 ? `${mobileDigits.length}/10 digits entered`
    : 'Must start with 6, 7, 8, or 9'
    : '';

  const emailValid = isValidEmail(form.email);
  const emailError = touched.email && !emailValid ? 'Enter a valid email' : '';
  const nameError = touched.name && !form.name.trim() ? 'Name is required' : '';

  const handleBlur = (field: string) => setTouched(t => ({ ...t, [field]: true }));
  const formValid = form.name.trim() && mobileValid && emailValid;

  const product = useMemo(() => {
    if (!productId) return null;
    return defaultProducts.find(p => p.id === productId) || null;
  }, [productId]);

  // Redirect to products on the client side if no product is selected
  React.useEffect(() => {
    if (!productId || !product) {
      navigate('products');
    }
  }, [productId, product, navigate]);

  if (!productId || !product) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-t-sb-accent border-gray-200 rounded-full animate-spin" />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, mobile: true, email: true });
    if (!formValid) return;

    setFormLoading(true);
    try {
      const res = await fetch('/api/inquiries/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, product_id: product?.id }),
      });
      if (res.ok) {
        setStatus('success');
        toast.success('Quotation request submitted!', { description: 'Our business development team will contact you shortly.' });
      }
      else {
        const data = await res.json().catch(() => null);
        setStatus('error');
        toast.error('Submission failed', { description: data?.error || 'Please try again.' });
      }
    } catch { setStatus('error'); toast.error('Network error', { description: 'Please check your connection.' }); }
    setFormLoading(false);
  };

  const whatsappNum = '918866604466';
  const activeImage = productImages[product.category]?.[product.format as 'cane' | 'tube'] || '';
  const theme = themeColors[product.category] || { primary: 'text-sb-accent', bg: 'bg-sb-accent/10', border: 'border-sb-accent/20', badge: 'bg-sb-accent text-white' };
  const formatTitle = product.format === 'cane' ? 'Cane Packaging (With Built-in Brush)' : 'Tube Packaging (Squeeze Format)';
  const sizes = Array.isArray(product.sizes) ? product.sizes : [];

  // Related products
  const relatedProducts = defaultProducts
    .filter(p => p.id !== product.id)
    .sort((a, b) => {
      if (a.category === product.category && b.category !== product.category) return -1;
      if (a.category !== product.category && b.category === product.category) return 1;
      return 0;
    })
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header Banner */}
      <section className="bg-[#001a3a] pt-24 pb-12 sm:pt-28 sm:pb-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,180,216,0.6) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => navigate('products')} className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors mb-4 uppercase tracking-[0.15em] font-semibold">
            <ArrowLeft size={14} /> Back to Products
          </button>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-lg uppercase tracking-wider ${theme.badge}`}>
                  {product.category}
                </span>
                <span className="text-gray-400 text-xs font-semibold uppercase tracking-[0.15em]">{product.product_code}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading text-white mb-3">
                {product.name} — {product.format === 'cane' ? 'Cane Format' : 'Tube Format'}
              </h1>
              <p className="text-gray-300 text-sm max-w-xl font-semibold uppercase tracking-wider">{formatTitle}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed content grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Product Image */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-gray-100 rounded-[32px] p-8 flex items-center justify-center relative shadow-sm h-[280px] sm:h-[450px] overflow-hidden group">
              {product.format === 'cane' ? (
                <div className="absolute top-4 left-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-bold px-3 py-1 rounded-xl uppercase tracking-wider">
                  🖌️ Brush Inside Cap
                </div>
              ) : (
                <div className="absolute top-4 left-4 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-bold px-3 py-1 rounded-xl uppercase tracking-wider">
                  🧪 Squeeze Tube
                </div>
              )}
              <img src={activeImage} alt={product.name}
                className="h-full object-contain max-h-[320px] drop-shadow-xl group-hover:scale-105 transition-transform duration-500 select-none" />
            </div>
          </div>

          {/* Right: Specifications and Form */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white border border-gray-100 rounded-[32px] p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight font-heading text-sb-primary mb-3">Product Overview</h2>
                <p className="text-sb-grey text-sm sm:text-base leading-relaxed font-body">{product.description}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold font-heading text-sb-primary mb-3">Technical Specifications</h3>
                <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-inner bg-gray-50/50">
                  <table className="w-full border-collapse text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-gray-100/60 border-b border-gray-200/50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        <th className="px-4 py-3">Property</th>
                        <th className="px-4 py-3">Specifications details</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 bg-white/[0.3]">
                        <td className="px-4 py-3 font-semibold text-gray-700">Available Sizes</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1.5">
                            {sizes.map(size => (
                              <span key={size} className="bg-white border border-gray-200/60 text-gray-700 px-3 py-1 rounded-md text-xs font-bold shadow-sm">{size}</span>
                            ))}
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100 bg-white/[0.1]">
                        <td className="px-4 py-3 font-semibold text-gray-700">Packaging Type</td>
                        <td className="px-4 py-3 font-medium text-gray-600 font-body capitalize">
                          {product.format === 'cane' ? 'Tin Can with Cap brush' : 'Flexible squeeze tube'}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100 bg-white/[0.3]">
                        <td className="px-4 py-3 font-semibold text-gray-700">Brush Applicator</td>
                        <td className={`px-4 py-3 font-bold ${product.format === 'cane' ? 'text-emerald-500' : 'text-gray-400'}`}>
                          {product.format === 'cane' ? '✓ Included (Attached to Cap)' : '✗ Not Included (Squeeze Tube)'}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100 bg-white/[0.1]">
                        <td className="px-4 py-3 font-semibold text-gray-700">Curing Time</td>
                        <td className="px-4 py-3 font-medium text-gray-600 font-body">Initial set: 5 minutes, Full pressure: 24 Hours</td>
                      </tr>
                      {product.features && product.features.length > 0 && (
                        <tr className="border-b border-gray-100 bg-white/[0.3]">
                          <td className="px-4 py-3 font-semibold text-gray-700">Bond Features</td>
                          <td className="px-4 py-3 font-medium text-gray-600 font-body">{product.features.join(', ')}</td>
                        </tr>
                      )}
                      {product.application_areas && product.application_areas.length > 0 && (
                        <tr className="bg-white/[0.1]">
                          <td className="px-4 py-3 font-semibold text-gray-700">Application Areas</td>
                          <td className="px-4 py-3 font-medium text-gray-600 font-body">{product.application_areas.join(', ')}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="bg-white border border-gray-100 rounded-[32px] p-4 sm:p-8 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold font-heading text-sb-primary">Request a Wholesale Quote</h3>
                <p className="text-sb-grey text-xs mt-1 font-body">Submit your details below, and our business development team will contact you with bulk prices.</p>
              </div>
              {status === 'success' ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={24} className="text-green-500" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-1">Inquiry Submitted!</h4>
                  <p className="text-sb-grey text-xs">Our executive will respond within 24 hours.</p>
                  <button onClick={() => setStatus('')} className="mt-4 border border-sb-primary/20 text-sb-primary font-bold px-6 py-2 rounded-xl text-xs hover:bg-sb-primary/5 transition-colors">Submit Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Name *</label>
                      <input type="text" value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        onBlur={() => handleBlur('name')}
                        className={inputCls(!!nameError, !!touched.name, !!form.name.trim())} />
                      {nameError && <FieldError msg={nameError} />}
                    </div>
                    {/* Mobile */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Mobile *</label>
                      <div className="relative">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-semibold select-none">+91</span>
                        <input type="tel" value={form.mobile}
                          onChange={e => setForm({ ...form, mobile: e.target.value.replace(/[^\d\s\+\-]/g, '') })}
                          onBlur={() => handleBlur('mobile')}
                          placeholder="98765 43210" maxLength={15}
                          className={`${inputCls(!!mobileError, !!touched.mobile, mobileValid)} pl-10`} />
                      </div>
                      {mobileError && <FieldError msg={mobileError} />}
                      {touched.mobile && mobileValid && (
                        <p className="flex items-center gap-1 text-green-600 text-xs mt-1 font-medium">
                          <CheckCircle size={11} /> Valid
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Email *</label>
                      <input type="email" value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        onBlur={() => handleBlur('email')}
                        className={inputCls(!!emailError, !!touched.email, emailValid)} />
                      {emailError && <FieldError msg={emailError} />}
                    </div>
                    {/* Company Name */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Company Name</label>
                      <input type="text" value={form.company_name} onChange={e => setForm({ ...form, company_name: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-sb-primary/30" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Requirements Message</label>
                    <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={3}
                      placeholder={`Bulk inquiry requirements for ${product.name}...`}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-sb-primary/30 resize-none" />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button type="submit" disabled={formLoading}
                      className="flex-1 bg-sb-primary text-white font-semibold py-3 rounded-xl hover:bg-blue-900 transition-all text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer">
                      <Send size={14} /> {formLoading ? 'Submitting...' : 'Submit Quotation Request'}
                    </button>
                    <a href={`https://wa.me/${whatsappNum}?text=I'm interested in wholesale order for ${product.name} (${product.product_code})`}
                      target="_blank" rel="noreferrer"
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md text-xs cursor-pointer"
                      title="WhatsApp Inquiry">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.859 0c3.161.001 6.136 1.23 8.375 3.469 2.24 2.239 3.467 5.214 3.466 8.377-.003 6.528-5.329 11.854-11.859 11.854-.001 0-.001 0 0 0-2.002-.001-3.968-.538-5.7-1.558L0 24zm6.59-4.846c1.6.95 3.488 1.449 5.258 1.45 5.534 0 10.038-4.502 10.04-10.04.001-2.68-1.041-5.198-2.937-7.096C17.054 1.57 14.533.528 11.86.528c-5.535 0-10.04 4.502-10.041 10.04-.001 1.777.462 3.513 1.341 5.064L2.14 21.78l6.194-1.626zm10.748-7.39c-.294-.147-1.743-.86-2.012-.958-.269-.098-.465-.147-.66.147-.196.294-.759.957-.93 1.15-.171.196-.343.22-.637.072-.295-.147-1.243-.458-2.368-1.462-.875-.78-1.466-1.744-1.637-2.038-.172-.294-.018-.454.13-.601.132-.132.294-.343.441-.515.147-.171.196-.294.294-.49.098-.196.05-.367-.025-.515-.074-.147-.66-1.592-.905-2.181-.239-.574-.482-.496-.66-.505-.171-.008-.367-.01-.564-.01-.196 0-.514.073-.782.367-.269.294-1.028 1.005-1.028 2.449 0 1.445 1.051 2.84 1.198 3.037.147.196 2.067 3.156 5.007 4.43.7.303 1.246.484 1.671.62.704.223 1.346.19 1.854.114.565-.084 1.743-.712 1.989-1.4.245-.687.245-1.275.172-1.397-.074-.122-.27-.196-.565-.343z" /></svg> WhatsApp Inquiry
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <section className="bg-white border-t border-gray-100 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight font-heading text-sb-primary mb-8 text-center sm:text-left">Related Solvent Cements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map(p => {
              const pTheme = themeColors[p.category] || { primary: 'text-sb-accent', badge: 'bg-sb-accent text-white' };
              const pImage = productImages[p.category]?.[p.format as 'cane' | 'tube'] || '';
              return (
                <div key={p.id} className="bg-gray-50 border border-gray-100 rounded-[28px] overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between p-5 group">
                  <div className="h-44 bg-white rounded-2xl flex items-center justify-center p-4 relative border border-gray-100 overflow-hidden mb-4">
                    <span className={`absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${pTheme.badge}`}>
                      {p.category}
                    </span>
                    <img src={pImage} alt={p.name} className="h-full object-contain max-h-[120px] group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <span className={`text-xs font-bold uppercase tracking-wider ${pTheme.primary}`}>{p.product_code}</span>
                      <h4 className="font-bold text-gray-800 text-sm font-heading mt-1 group-hover:text-sb-accent transition-colors">
                        <button onClick={() => navigate('productDetail', p.id)}>{p.name} — {p.format === 'cane' ? 'Cane' : 'Tube'}</button>
                      </h4>
                      <p className="text-gray-500 text-xs mt-2 line-clamp-3 leading-relaxed font-body">{p.description}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-gray-200/50 pt-3">
                      <div className="flex flex-wrap gap-1">
                        {p.sizes.slice(0, 3).map(sz => (
                          <span key={sz} className="bg-white border border-gray-200/60 text-gray-600 px-2 py-1 rounded-md text-xs font-semibold">{sz}</span>
                        ))}
                        {p.sizes.length > 3 && <span className="text-xs text-gray-400 font-semibold self-center">+{p.sizes.length - 3} more</span>}
                      </div>
                      <button onClick={() => navigate('productDetail', p.id)} className="text-sm font-semibold text-sb-primary hover:text-sb-accent transition-colors flex items-center gap-0.5">
                        Details &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
