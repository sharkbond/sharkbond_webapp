'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Droplet, Zap, Clock,
  CheckCircle, ArrowRight, Download,
  Star, Layers, Gauge, Thermometer
} from 'lucide-react';
import { useNavigation } from '@/store/navigation';
import ScrollReveal from '@/components/sharkbond/ScrollReveal';
import PipeBondAnimation from '@/components/sharkbond/PipeBondAnimation';

/* ── FAQ Accordion ── */
const FAQItem = ({ faq }: { faq: { question: string; answer: string } }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <span className="font-heading font-semibold text-gray-800 text-sm md:text-base pr-4">{faq.question}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0 text-sb-accent font-semibold text-xl leading-none">+</motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        <div className="px-6 pb-5 text-sb-grey text-sm leading-relaxed bg-white border-t border-gray-100 font-body">
          {faq.answer}
        </div>
      </motion.div>
    </div>
  );
};

const Reveal = ({ children, delay = 0, className = '', y = 30, x = 0 }: {
  children: React.ReactNode; delay?: number; className?: string; y?: number; x?: number;
}) => (
  <ScrollReveal delay={delay} className={className} y={y} x={x}>
    {children}
  </ScrollReveal>
);

const defaultTestimonials = [
  {
    id: 1, rating: 5,
    message: "Shark Bond CPVC cement is our go-to choice for high-rise residential projects. The thermal resistance and fast curing save us hours on every install.",
    customer_name: "Rajesh Patel", designation: "Chief Plumbing Contractor", company_name: "Patel Infrastructure"
  },
  {
    id: 2, rating: 5,
    message: "We have been distributing Shark Bond across Gujarat for over 10 years. The consistency of the formula and zero leakage complaints build massive trust.",
    customer_name: "Amit Shah", designation: "Authorized Distributor", company_name: "Shah Hardware & Sanitary"
  },
  {
    id: 3, rating: 5,
    message: "The heavy-bodied UPVC solvent cement is excellent for agricultural drip line connections. Highly chemical resistant and cures perfectly even in damp conditions.",
    customer_name: "Vikram Singh", designation: "Irrigation Specialist", company_name: "Greenfield Agri Tech"
  }
];

const defaultFaqs = [
  { id: 1, category: 'Usage', question: 'How long does it take for Shark Bond solvent cement to cure?', answer: 'Initial set takes about 5 minutes, but full curing time depends on pipe size and temperature. Generally, wait 24 hours before pressure testing.' },
  { id: 2, category: 'Usage', question: 'Do I need a primer before applying Shark Bond solvent cement?', answer: 'For PVC and UPVC systems, using a primer is highly recommended as it prepares the surface for a stronger chemical weld. For CPVC systems, a one-step application is possible for smaller diameters.' },
  { id: 3, category: 'Usage', question: 'Can I use PVC solvent cement on CPVC pipes?', answer: 'No, PVC solvent cement should not be used on CPVC pipes. CPVC pipes require CPVC solvent cement, which is formulated to withstand higher temperatures.' },
  { id: 4, category: 'Technical', question: 'Is Shark Bond CPVC cement safe for drinking water?', answer: 'Yes, our CPVC solvent cement is formulated with safe, non-toxic materials suitable for potable hot and cold water systems.' },
  { id: 5, category: 'Technical', question: 'What temperature range can Shark Bond CPVC withstand?', answer: 'Shark Bond CPVC solvent cement is engineered to withstand temperatures up to 93°C (200°F).' },
  { id: 6, category: 'Technical', question: 'What standards do Shark Bond products meet?', answer: 'Our solvent cements are manufactured in ISO certified facilities and conform to IS:848 and ASTM standards.' },
  { id: 7, category: 'Packaging', question: 'What sizes are available for wholesale orders?', answer: 'We offer packaging ranging from 10 ML tubes to 1 LTR tin cans. Bulk drums can be arranged for industrial dealers.' },
  { id: 8, category: 'Packaging', question: 'What is the shelf life of Shark Bond solvent cement?', answer: 'When stored in a cool, dry place away from direct sunlight with the cap tightly sealed, the shelf life is approximately 12 to 24 months.' },
  { id: 9, category: 'Packaging', question: 'How should I store the solvent cement cans?', answer: 'Store in a well-ventilated area between 5°C and 35°C. Ensure caps are closed tightly immediately after use to prevent solvent evaporation.' },
];

const Home: React.FC = () => {
  const { navigate } = useNavigation();
  const [testimonials] = useState(defaultTestimonials);
  const [faqs] = useState(defaultFaqs);
  const [faqTab, setFaqTab] = useState('Usage');
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    { icon: ShieldCheck, title: 'High Bonding Strength', desc: 'Engineered for maximum adhesion across all pipe grades and sizes.', image: '/assets/homepage_images/pvc_image_2.jpeg' },
    { icon: Droplet, title: 'Leak Proof Joint', desc: '100% watertight seals that outlast industry standards.', image: '/assets/homepage_images/upvc_image.jpeg' },
    { icon: Zap, title: 'Fast Setting Formula', desc: 'Sets within minutes so installation is faster and more efficient.', image: '/assets/homepage_images/cpvc_image.jpeg' },
    { icon: Clock, title: 'Long Shelf Life', desc: 'Stable formula with extended shelf life for warehouse storage.', image: '/assets/homepage_images/all_image_cpvc_upvc_pvc.jpeg' },
  ];

  const industries = [
    { name: 'Plumbing', icon: '🔧', desc: 'Residential & commercial plumbing systems' },
    { name: 'Agriculture', icon: '🌾', desc: 'Drip & sprinkler irrigation networks' },
    { name: 'Construction', icon: '🏗️', desc: 'High-rise and civil infrastructure' },
    { name: 'Water Supply', icon: '💧', desc: 'Municipal water distribution networks' },
    { name: 'Industrial', icon: '🏭', desc: 'Chemical & process piping systems' },
    { name: 'Fire Fighting', icon: '🚒', desc: 'Fire suppression pipeline systems' },
  ];

  const applications = [
    {
      type: 'PVC', title: 'PVC Solvent Cement', pipe: 'PVC Pipes & Fittings',
      image: '/assets/products/pvc-cane.png',
      color: 'from-blue-500 to-blue-600',
      badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      icon: Layers, spec1: 'Medium Viscosity', spec2: 'Fast Curing', spec3: 'Up to 4" Pipes', temp: 'Normal Temp',
      features: ['High shear strength & long term bonding', 'Specially formulated for PVC plumbing systems', 'Meets IS:848 quality standards']
    },
    {
      type: 'UPVC', title: 'UPVC Solvent Cement', pipe: 'UPVC Pressure Pipes',
      image: '/assets/products/upvc-cane.png',
      color: 'from-indigo-500 to-indigo-600',
      badgeClass: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      icon: Gauge, spec1: 'Heavy Viscosity', spec2: 'Medium Curing', spec3: 'All Pipe Classes', temp: 'High Pressure',
      features: ['Resists pressure up to 16 bars', 'Chemical and corrosion-resistant shield', 'Ideal for industrial water supply networks']
    },
    {
      type: 'CPVC', title: 'CPVC Solvent Cement', pipe: 'CPVC Hot & Cold Water Pipes',
      image: '/assets/products/cpvc-cane.png',
      color: 'from-orange-500 to-red-500',
      badgeClass: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      icon: Thermometer, spec1: 'Heavy/Medium Bodied', spec2: 'One-Step Application', spec3: 'Up to 2" Pipes', temp: 'Up to 93°C (200°F)',
      features: ['Exceptional resistance to hot & cold water', 'NSF/ANSI drinking water safe certification', 'Quick joint assembly without primers']
    },
  ];

  const filteredFaqs = faqs.filter(f => f.category === faqTab);

  return (
    <div className="overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center bg-[#001a3a] overflow-hidden">
            {/* Background Image - Mobile (Hidden on md and up) */}
            {/* Background Image - Mobile (Hidden on md and up) */}
            
            {/* Background Image - Desktop (Visible on md and up) */}
            <div className="absolute inset-0 bg-cover bg-center hidden md:block pointer-events-none" style={{ backgroundImage: 'url(/assets/homepage_images/HOMEPAGE_BG.jpeg)' }} />

        <div className="absolute inset-0 bg-gradient-to-b from-[#001a3a]/95 via-[#001a3a]/85 to-[#001a3a]/30 lg:bg-gradient-to-r lg:from-[#001a3a]/95 lg:via-[#001a3a]/85 lg:to-[#001a3a]/30 pointer-events-none" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0, 180, 216, 0.4) 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="absolute top-20 right-10 w-96 h-96 bg-sb-accent/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-72 h-72 bg-sb-primary/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center bg-sb-accent/10 border border-sb-accent/30 text-sb-accent text-xs font-semibold px-4 py-2 rounded-full mb-6 uppercase tracking-[0.15em]">
              🇮🇳 Made in India — ISO Certified
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
              India&apos;s <span className="text-sb-accent">Trusted</span> Solvent Cement
            </h1>
            <p className="font-body text-base sm:text-lg text-gray-300 mb-10 leading-relaxed max-w-xl">
              Premium quality PVC, UPVC & CPVC solvent cements engineered for industrial, agricultural, and residential piping applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button onClick={() => navigate('products')} className="w-full sm:w-auto min-h-12 bg-sb-accent hover:bg-[#0096b4] text-white font-semibold px-8 py-4 rounded-xl text-base sm:text-lg transition-all shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-3 group">
                Explore Products
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <path d="M10.0035 3.4083L1.41176 12L0 10.5882L8.59171 1.99654H1.01905V0H12V10.981H10.0035V3.4083Z" fill="currentColor" />
                </svg>
              </button>
              <button onClick={() => navigate('contact')} className="w-full sm:w-auto min-h-12 border-2 border-white/30 text-white hover:bg-white/15 hover:border-white/50 font-medium px-8 py-4 rounded-xl text-base transition-all flex items-center justify-center gap-3 group">
                Get a Quote
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <path d="M10.0035 3.4083L1.41176 12L0 10.5882L8.59171 1.99654H1.01905V0H12V10.981H10.0035V3.4083Z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Mobile Product Image (replacing background) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="md:hidden w-full flex justify-center -mt-4 mb-4"
          >
            <img 
              src="/assets/homepage_images/all_image_cpvc_upvc_pvc.jpeg" 
              alt="Shark Bond Products" 
              className="w-full max-w-sm h-auto rounded-3xl shadow-2xl border-4 border-white/5 object-cover" 
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full mt-12 lg:mt-0"
          >
            <div className="relative">
              <PipeBondAnimation />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-white/40 text-xs z-10">
          <span>Scroll Down</span>
          <div className="w-px h-8 bg-white/20" />
        </motion.div>

        {/* Certification Marquee divider banner */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden bg-white/[0.02] backdrop-blur-sm py-4 border-t border-white/5 z-20" aria-label="Certification and feature highlights banner">
          <div className="animate-marquee flex space-x-8 sm:space-x-16 items-center whitespace-nowrap text-xs font-bold tracking-[0.2em] text-white/80 uppercase">
            {[
              '🇮🇳 Made in India', '🏆 ISO 9001:2015 Certified', '⚡ High Shear Strength', '💪 Leak Proof Seals', '🛡️ IS:848 Standards', '🌾 Trusted in Agriculture',
              '🇮🇳 Made in India', '🏆 ISO 9001:2015 Certified', '⚡ High Shear Strength', '💪 Leak Proof Seals', '🛡️ IS:848 Standards', '🌾 Trusted in Agriculture'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-sb-accent animate-pulse" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-16 sm:py-24 bg-sb-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <p className="section-label">Why Shark Bond</p>
            <h2 className="section-title mb-4">Built for Performance</h2>
            <p className="body-text-lg max-w-2xl mx-auto">Every Shark Bond product is engineered to deliver superior bonding, durability, and reliability in the most demanding conditions.</p>
          </Reveal>
          {/* Desktop View */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const currentImage = features[(i + carouselIndex) % features.length].image;
              return (
                <Reveal key={i} delay={i * 0.1} className="h-full">
                  <div className="relative overflow-hidden bg-white rounded-[28px] shadow-sm border border-gray-100 hover:shadow-xl transition-all h-full min-h-[320px] flex flex-col">
                    <AnimatePresence>
                      <motion.div 
                        key={currentImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 z-0 bg-no-repeat bg-center bg-cover"
                        style={{ backgroundImage: `url(${currentImage})` }}
                      />
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Mobile View - Premium Interactive Carousel */}
          <div className="block md:hidden px-2">
            <Reveal>
              {(() => {
                const mobileFeatures = features.slice(0, 3);
                const currentMobileIndex = carouselIndex % mobileFeatures.length;
                const currentMobileImage = mobileFeatures[currentMobileIndex].image;
                return (
                  <div className="relative overflow-hidden bg-white rounded-[28px] shadow-lg border border-gray-100 w-full max-w-sm mx-auto aspect-[9/16] flex flex-col justify-end">
                    {/* Background Image Container spanning full card */}
                    <div className="absolute inset-0 z-0 rounded-[28px] overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div 
                          key={currentMobileIndex}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                          className="w-full h-full bg-no-repeat bg-center bg-cover"
                          style={{ backgroundImage: `url(${currentMobileImage})` }}
                        />
                      </AnimatePresence>
                    </div>
                    
                    {/* Floating Dots Indicator on top of the image */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex justify-center gap-2 bg-black/35 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                      {mobileFeatures.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCarouselIndex(idx)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            currentMobileIndex === idx 
                              ? 'w-6 bg-white' 
                              : 'w-2 bg-white/50 hover:bg-white/80'
                          }`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                );
              })()}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── PRODUCT APPLICATIONS ─── */}
      <section className="py-24 bg-[#001a3a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal className="text-center mb-16">
            <p className="section-label text-sb-accent">Applications</p>
            <h2 className="section-title text-white mb-4">Right Product for Every Pipe</h2>
            <p className="font-body text-gray-400 max-w-2xl mx-auto text-base">Shark Bond formulations are precisely engineered to chemically bond each specific pipe material for a perfect, leak-proof joint.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {applications.map((app, i) => (
              <Reveal key={app.type} delay={i * 0.15} className="h-full">
                <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }}
                  className="relative group overflow-hidden bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:from-white/[0.08] hover:to-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-3xl p-8 transition-all duration-500 flex flex-col justify-between h-full">
                  <div className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${app.color} opacity-0 group-hover:opacity-10 blur-md transition-opacity duration-500`} />
                  
                  {/* Subtle Centered Background Watermark Product Cane Image */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
                    <img src={app.image} alt="" className="w-60 h-60 object-contain opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-500 mix-blend-lighten" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border ${app.badgeClass}`}>
                        {app.type}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/80 group-hover:text-white group-hover:bg-white/[0.08] transition-all duration-300 shadow-inner">
                        <app.icon size={22} className="text-white group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight group-hover:text-sb-accent transition-colors duration-300 font-heading">
                      {app.title}
                    </h3>
                    <div className="flex items-center gap-2.5 bg-white/[0.03] border border-white/5 rounded-xl p-3.5 mb-6">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${app.color} animate-pulse`} />
                      <span className="font-semibold text-xs text-gray-300 uppercase tracking-wide">Used For: {app.pipe}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-6 text-xs">
                      {[
                        { label: 'Viscosity', value: app.spec1 },
                        { label: 'Cure Speed', value: app.spec2 },
                        { label: 'Capacity', value: app.spec3 },
                        { label: 'Thermal Rating', value: app.temp },
                      ].map((spec) => (
                        <div key={spec.label} className="bg-white/[0.02] border border-white/5 rounded-lg px-3 py-2">
                          <span className="block text-xs text-gray-500 uppercase font-semibold">{spec.label}</span>
                          <span className="font-semibold text-gray-200 text-xs">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                    <ul className="space-y-3 mb-8 text-sm text-gray-400 font-body">
                      {app.features.map((feat, fi) => (
                        <li key={fi} className="flex items-start gap-2.5 leading-relaxed">
                          <CheckCircle size={16} className="mt-0.5 flex-shrink-0 text-white/40 group-hover:text-emerald-400 transition-colors duration-300" />
                          <span className="group-hover:text-gray-300 transition-colors duration-300">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button onClick={() => navigate('products')} className="relative z-10 w-full flex items-center justify-center gap-2 py-3.5 px-5 bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-white font-semibold text-sm rounded-xl transition-all duration-300">
                    Explore Products
                    <ArrowRight size={16} className="text-white group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INDUSTRIES ─── */}
      <section className="py-24 bg-sb-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <p className="section-label">Serving Every Sector</p>
            <h2 className="section-title mb-4">Industries We Serve</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((ind, i) => (
              <Reveal key={ind.name} delay={i * 0.08} className="h-full">
                <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.2 }}
                  className="bg-white rounded-[28px] p-4 md:p-6 text-center shadow-sm border border-gray-100 hover:border-sb-accent/30 hover:shadow-lg transition-all cursor-pointer h-full">
                  <div className="text-4xl mb-3">{ind.icon}</div>
                  <div className="font-semibold text-sb-primary text-sm mb-1 font-heading">{ind.name}</div>
                  <div className="text-sb-grey text-xs leading-snug font-body">{ind.desc}</div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <p className="section-label">Testimonials</p>
            <h2 className="section-title mb-4">Trusted by Professionals</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <Reveal key={t.id} delay={i * 0.1} className="h-full">
                <div className="bg-sb-light rounded-[28px] p-6 sm:p-8 border border-gray-100 hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, si) => (
                      <Star key={si} size={16} className={si < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
                    ))}
                  </div>
                  <p className="text-sb-grey text-sm leading-relaxed mb-6 italic font-body flex-1">&ldquo;{t.message}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sb-primary/10 flex items-center justify-center font-heading font-bold text-sb-primary text-lg">
                      {t.customer_name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm font-heading">{t.customer_name}</div>
                      <div className="text-sb-grey text-xs font-body">{t.designation}{t.company_name ? `, ${t.company_name}` : ''}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-24 bg-sb-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <p className="section-label">Knowledge Base</p>
            <h2 className="section-title mb-4">Frequently Asked Questions</h2>
          </Reveal>
          <div className="flex justify-center gap-3 mb-10">
            {['Usage', 'Technical', 'Packaging'].map(tab => (
              <button key={tab} onClick={() => setFaqTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${faqTab === tab ? 'bg-sb-primary text-white shadow-md' : 'bg-white text-sb-grey border border-gray-200 hover:border-sb-primary'}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="max-h-96 overflow-y-auto space-y-3 scrollbar-thin">
            {filteredFaqs.length > 0 ? filteredFaqs.map((faq) => (
              <Reveal key={faq.id} delay={0.05}>
                <FAQItem faq={faq} />
              </Reveal>
            )) : (
              <p className="text-center text-sb-grey py-8 font-body">No FAQs in this category yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-sb-primary via-blue-800 to-[#001a3a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,180,216,0.8) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <Reveal className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="section-title text-white mb-4">Ready to Place an Order?</h2>
          <p className="font-body text-gray-300 text-lg sm:text-xl mb-10">Contact our team for bulk pricing, dealer inquiries, and technical support.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate('contact')} className="bg-sb-accent hover:bg-[#0096b4] text-white font-semibold px-8 py-4 rounded-xl text-base sm:text-lg transition-all shadow-lg shadow-cyan-500/30 flex items-center gap-2">
              Contact Us <ArrowRight size={20} />
            </button>
            <button onClick={() => navigate('dealership')} className="border-2 border-white/40 text-white hover:bg-white hover:text-sb-primary font-semibold px-8 py-4 rounded-xl text-base sm:text-lg transition-all">
              Become a Dealer
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Home;
