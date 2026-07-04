'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle, X, Send, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigation } from '@/store/navigation';
import ScrollReveal from '@/components/sharkbond/ScrollReveal';

const parseJSON = (str: string | string[]): string[] => {
  if (Array.isArray(str)) return str;
  try { return JSON.parse(str || '[]'); } catch { return []; }
};

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

interface Product {
  id: string;
  product_code: string;
  product_type: string;
  name: string;
  format: string;
  category: string;
  description: string;
  sizes: string[];
  is_featured: number;
}

const defaultProducts: Product[] = [
  { id: 'pvc-cane', product_code: 'SB-PVC-CANE', product_type: 'Solvent Cement', name: 'Shark Bond PVC Clear', format: 'cane', category: 'PVC', description: 'Premium quality fast setting solvent cement for PVC pipes and fittings. Perfect for irrigation, conduits, and sewer applications.', sizes: ['59 ml', '118 ml', '237 ml', '500 ml', '1 Liter'], is_featured: 1 },
  { id: 'pvc-tube', product_code: 'SB-PVC-TUBE', product_type: 'Solvent Cement', name: 'Shark Bond PVC Clear', format: 'tube', category: 'PVC', description: 'Premium quality fast setting solvent cement for PVC pipes and fittings. Perfect for irrigation, conduits, and sewer applications.', sizes: ['10 ml', '25 ml'], is_featured: 0 },
  { id: 'upvc-cane', product_code: 'SB-UPVC-CANE', product_type: 'Solvent Cement', name: 'Shark Bond UPVC Heavy Duty', format: 'cane', category: 'UPVC', description: 'Heavy duty UPVC solvent cement designed for high pressure applications. Ideal for industrial pipelines and commercial plumbing systems.', sizes: ['59 ml', '118 ml', '237 ml', '500 ml', '1 Liter'], is_featured: 1 },
  { id: 'upvc-tube', product_code: 'SB-UPVC-TUBE', product_type: 'Solvent Cement', name: 'Shark Bond UPVC Heavy Duty', format: 'tube', category: 'UPVC', description: 'Heavy duty UPVC solvent cement designed for high pressure applications. Ideal for industrial pipelines and commercial plumbing systems.', sizes: ['10 ml', '25 ml'], is_featured: 0 },
  { id: 'cpvc-cane', product_code: 'SB-CPVC-CANE', product_type: 'Solvent Cement', name: 'Shark Bond CPVC FlowGuard', format: 'cane', category: 'CPVC', description: 'Specialized CPVC cement for hot and cold water distribution systems. Drinking water safe and high temperature resistant.', sizes: ['59 ml', '118 ml', '237 ml', '500 ml', '1 Liter'], is_featured: 1 },
  { id: 'cpvc-tube', product_code: 'SB-CPVC-TUBE', product_type: 'Solvent Cement', name: 'Shark Bond CPVC FlowGuard', format: 'tube', category: 'CPVC', description: 'Specialized CPVC cement for hot and cold water distribution systems. Drinking water safe and high temperature resistant.', sizes: ['10 ml', '25 ml'], is_featured: 0 },
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
  `w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
    hasTouched && hasError
      ? 'border-red-400 focus:ring-red-200'
      : hasTouched && isValid
      ? 'border-green-400 focus:ring-green-200'
      : 'border-gray-200 focus:ring-sb-primary/30'
  }`;

/* ── Inquiry Modal ── */
const InquiryModal = ({ product, onClose }: { product: Product; onClose: () => void }) => {
  const [form, setForm] = useState({ name: '', mobile: '', email: '', company_name: '', message: '' });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const whatsappNum = '918866604466';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, mobile: true, email: true });
    if (!formValid) return;

    setLoading(true);
    try {
      const res = await fetch('/api/inquiries/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, product_id: product.id }),
      });
      if (res.ok) {
        setStatus('success');
        toast.success('Inquiry submitted!', { description: 'Our team will contact you within 24 hours.' });
      } else {
        const data = await res.json().catch(() => null);
        setStatus('error');
        toast.error('Submission failed', { description: data?.error || 'Please try again.' });
      }
    } catch { setStatus('error'); toast.error('Network error', { description: 'Please check your connection.' }); }
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}>
      <motion.div initial={{ y: 50, scale: 0.95, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 50, scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="bg-white rounded-[28px] max-w-lg w-full shadow-2xl overflow-hidden border border-white/10"
        onClick={e => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-sb-primary to-blue-800 p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold font-heading text-white">Product Inquiry</h3>
              <p className="text-blue-200 text-sm font-body mt-1">{product.name}</p>
            </div>
            <button onClick={onClose} className="text-white/60 hover:text-white transition-colors"><X size={22} /></button>
          </div>
        </div>
        <div className="p-6">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Inquiry Submitted!</h4>
              <p className="text-sb-grey text-sm">Our team will contact you within 24 hours.</p>
              <button onClick={onClose} className="mt-6 bg-sb-primary text-white px-8 py-2 rounded-xl font-bold">Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-2 gap-3">
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
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Email *</label>
                <input type="email" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  onBlur={() => handleBlur('email')}
                  className={inputCls(!!emailError, !!touched.email, emailValid)} />
                {emailError && <FieldError msg={emailError} />}
              </div>
              {/* Company */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Company Name <span className="text-gray-400">(optional)</span></label>
                <input type="text" value={form.company_name}
                  onChange={e => setForm({ ...form, company_name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sb-primary/30" />
              </div>
              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Message <span className="text-gray-400">(optional)</span></label>
                <textarea value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })} rows={3}
                  placeholder={`Inquiry for ${product.name}...`}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sb-primary/30 resize-none" />
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={loading}
                  className="flex-1 bg-sb-primary text-white font-semibold py-3 rounded-xl hover:bg-blue-900 transition-all text-sm shadow-md cursor-pointer">
                  {loading ? 'Submitting...' : 'Submit Inquiry'}
                </button>
                <a href={`https://wa.me/${whatsappNum}?text=I am interested in ${product.name} (${product.product_code})`}
                  target="_blank" rel="noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 rounded-xl transition-all flex items-center justify-center shadow-md">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.859 0c3.161.001 6.136 1.23 8.375 3.469 2.24 2.239 3.467 5.214 3.466 8.377-.003 6.528-5.329 11.854-11.859 11.854-.001 0-.001 0 0 0-2.002-.001-3.968-.538-5.7-1.558L0 24zm6.59-4.846c1.6.95 3.488 1.449 5.258 1.45 5.534 0 10.038-4.502 10.04-10.04.001-2.68-1.041-5.198-2.937-7.096C17.054 1.57 14.533.528 11.86.528c-5.535 0-10.04 4.502-10.041 10.04-.001 1.777.462 3.513 1.341 5.064L2.14 21.78l6.194-1.626zm10.748-7.39c-.294-.147-1.743-.86-2.012-.958-.269-.098-.465-.147-.66.147-.196.294-.759.957-.93 1.15-.171.196-.343.22-.637.072-.295-.147-1.243-.458-2.368-1.462-.875-.78-1.466-1.744-1.637-2.038-.172-.294-.018-.454.13-.601.132-.132.294-.343.441-.515.147-.171.196-.294.294-.49.098-.196.05-.367-.025-.515-.074-.147-.66-1.592-.905-2.181-.239-.574-.482-.496-.66-.505-.171-.008-.367-.01-.564-.01-.196 0-.514.073-.782.367-.269.294-1.028 1.005-1.028 2.449 0 1.445 1.051 2.84 1.198 3.037.147.196 2.067 3.156 5.007 4.43.7.303 1.246.484 1.671.62.704.223 1.346.19 1.854.114.565-.084 1.743-.712 1.989-1.4.245-.687.245-1.275.172-1.397-.074-.122-.27-.196-.565-.343z"/></svg>
                </a>
              </div>
              {status === 'error' && <p className="text-red-500 text-xs text-center">Failed to submit. Please try again.</p>}
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Product Card ── */
const ProductCard = ({ product, onInquire, onDetail }: {
  product: Product; onInquire: (p: Product) => void; onDetail: (id: string) => void;
}) => {
  const sizes = Array.isArray(product.sizes) ? product.sizes : parseJSON(product.sizes);
  const activeImage = productImages[product.category]?.[product.format as 'cane' | 'tube'] || '';
  const theme = themeColors[product.category] || { primary: 'text-sb-accent', bg: 'bg-sb-accent/10', border: 'border-sb-accent/20', badge: 'bg-sb-accent text-white' };
  const formatDescription = product.format === 'cane' ? 'Equipped with a built-in applicator brush.' : 'Convenient squeezy tube packaging.';
  const whatsappNum = '918866604466';

  return (
    <motion.div layout whileHover="hover" transition={{ duration: 0.25 }}
      className="group bg-white rounded-[28px] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200/80 transition-all duration-300 flex flex-col justify-between">
      <div className="h-44 sm:h-56 bg-gray-50 flex items-center justify-center relative border-b border-gray-100 p-6 overflow-hidden">
        <div className={`absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-lg z-10 uppercase tracking-wider ${theme.badge}`}>
          {product.category}
        </div>
        <button onClick={() => onDetail(product.id)} className="h-full w-full flex items-center justify-center cursor-pointer">
          <img src={activeImage} alt={`${product.name} ${product.format}`}
            className="h-full object-contain max-h-[160px] drop-shadow-md group-hover:scale-105 transition-transform duration-300 select-none" />
        </button>
      </div>
      <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold uppercase tracking-wider ${theme.primary}`}>{product.product_code}</span>
            <span className="text-xs bg-gray-100 text-sb-grey px-2.5 py-0.5 rounded-full font-semibold">{product.product_type}</span>
          </div>
          <h3 className="text-lg font-bold font-heading text-sb-primary mb-2 hover:text-sb-accent transition-colors">
            <button onClick={() => onDetail(product.id)}>
              {product.name} — {product.format === 'cane' ? 'Cane (Brush)' : 'Tube'}
            </button>
          </h3>
          <p className="text-sb-grey text-sm leading-relaxed font-body mb-4 line-clamp-3">
            {product.description} <span className="text-gray-500 font-medium">{formatDescription}</span>
          </p>
          <div className="flex items-center gap-2 mb-4 bg-gray-50/50 border border-gray-100 p-2 rounded-xl">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-1">Sizes:</span>
            <div className="flex flex-wrap gap-1">
              {sizes.map(sz => (
                <span key={sz} className="bg-white border border-gray-200/60 text-gray-700 px-2 py-1 rounded-md text-xs font-semibold shadow-sm">{sz}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-2 mt-auto">
          <div className="flex gap-2">
            <button onClick={() => onInquire({ ...product, name: `${product.name} (${product.format === 'cane' ? 'Cane' : 'Tube'})` })}
              className="flex-grow bg-sb-primary text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-blue-900 transition-colors shadow-sm cursor-pointer">
              Inquire Now
            </button>
            <a href={`https://wa.me/${whatsappNum}?text=I'm interested in ${product.name} (${product.format === 'cane' ? 'Cane' : 'Tube'}) - ${product.product_code}`}
              target="_blank" rel="noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl transition-colors flex items-center justify-center shadow-sm"
              title="WhatsApp Inquiry">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.859 0c3.161.001 6.136 1.23 8.375 3.469 2.24 2.239 3.467 5.214 3.466 8.377-.003 6.528-5.329 11.854-11.859 11.854-.001 0-.001 0 0 0-2.002-.001-3.968-.538-5.7-1.558L0 24zm6.59-4.846c1.6.95 3.488 1.449 5.258 1.45 5.534 0 10.038-4.502 10.04-10.04.001-2.68-1.041-5.198-2.937-7.096C17.054 1.57 14.533.528 11.86.528c-5.535 0-10.04 4.502-10.041 10.04-.001 1.777.462 3.513 1.341 5.064L2.14 21.78l6.194-1.626zm10.748-7.39c-.294-.147-1.743-.86-2.012-.958-.269-.098-.465-.147-.66.147-.196.294-.759.957-.93 1.15-.171.196-.343.22-.637.072-.295-.147-1.243-.458-2.368-1.462-.875-.78-1.466-1.744-1.637-2.038-.172-.294-.018-.454.13-.601.132-.132.294-.343.441-.515.147-.171.196-.294.294-.49.098-.196.05-.367-.025-.515-.074-.147-.66-1.592-.905-2.181-.239-.574-.482-.496-.66-.505-.171-.008-.367-.01-.564-.01-.196 0-.514.073-.782.367-.269.294-1.028 1.005-1.028 2.449 0 1.445 1.051 2.84 1.198 3.037.147.196 2.067 3.156 5.007 4.43.7.303 1.246.484 1.671.62.704.223 1.346.19 1.854.114.565-.084 1.743-.712 1.989-1.4.245-.687.245-1.275.172-1.397-.074-.122-.27-.196-.565-.343z"/></svg>
            </a>
          </div>
          <button onClick={() => onDetail(product.id)}
            className="w-full flex items-center justify-center gap-1.5 text-sm text-sb-primary border border-sb-primary/20 rounded-xl py-2 hover:bg-sb-primary hover:text-white transition-all font-semibold">
            View Details & Specifications &rarr;
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════ */
const Products: React.FC = () => {
  const [products] = useState<Product[]>(defaultProducts);
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { navigate } = useNavigation();

  const filtered = products
    .filter(p => activeTab === 'All' || p.category === activeTab)
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));

  const tabs = ['All', 'PVC', 'UPVC', 'CPVC'];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-[#001a3a] pt-24 pb-12 sm:pt-28 sm:pb-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,180,216,0.6) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="section-label">Product Catalogue</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-heading text-white mb-4">Our Products</h1>
              <p className="text-gray-300 text-xl font-body max-w-2xl">Engineered for excellence. Find the right solvent cement for your specific pipe type and application.</p>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row gap-4 mb-10 items-start md:items-center justify-between">
            <div className="flex gap-2.5 flex-wrap">
              {tabs.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${activeTab === tab ? 'bg-sb-primary text-white shadow-md' : 'bg-white text-sb-grey border border-gray-200 hover:border-sb-primary'}`}>
                  {tab} {tab !== 'All' && `(${products.filter(p => p.category === tab).length})`}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
                className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sb-primary/30 w-full sm:w-64 bg-white placeholder:text-gray-400" />
            </div>
          </div>
        </ScrollReveal>

        {/* Grid */}
        {filtered.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} onInquire={setSelectedProduct} onDetail={(id) => navigate('productDetail', id)} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold font-heading text-sb-primary mb-2">No products found</h3>
            <p className="text-sb-grey font-body">Try adjusting your search or filter.</p>
          </div>
        )}
      </div>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <InquiryModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
