'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Award, Users, Target, CheckCircle, ArrowRight, Truck, RotateCcw } from 'lucide-react';
import { useNavigation } from '@/store/navigation';
import ScrollReveal from '@/components/sharkbond/ScrollReveal';

const Counter = ({ end, suffix = '' }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (inView) {
      let start = 0;
      if (start === end) return;
      const durationMs = 1500;
      const steps = 50;
      const stepTime = durationMs / steps;
      const increment = end / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(timer);
          start = end;
        }
        setCount(Math.floor(start));
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [inView, end]);

  return <span ref={ref} className="tabular-nums">{count.toLocaleString()}{suffix}</span>;
};


const About: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#001a3a] min-h-screen flex items-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full aspect-video sm:inset-0 sm:h-full sm:w-full z-0 overflow-hidden">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover pointer-events-none">
            <source src="/assets/about-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#001a3a]/40 to-[#001a3a] sm:hidden" />
        </div>
        <div className="hidden sm:block absolute inset-0 bg-[#001a3a]/80 backdrop-blur-[1.5px] z-0" />
        <div className="absolute inset-0 opacity-10 z-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0, 180, 216, 0.6) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 grid lg:grid-cols-2 gap-12 items-center mt-6 sm:mt-0">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <p className="section-label">Our Story</p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight font-heading mb-6 leading-tight text-white">
              10+ Years of<br /><span className="text-sb-accent">Manufacturing</span><br />Excellence
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed font-body mb-8">
              Founded in 2015, Chemseal Industries has grown from a regional manufacturer to one of India&apos;s most trusted names in solvent cement technology. Our Shark Bond brand is the preferred choice of plumbers, contractors, and engineers across the country.
            </p>
            <div className="grid grid-cols-3 gap-4 sm:gap-8">
              {[
                { val: 10, suffix: '+', label: 'Years Experience' },
                { val: 5, suffix: 'K+', label: 'Active Dealers' },
                { val: 50, suffix: 'K+', label: 'Monthly Units' },
              ].map(({ val, suffix, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-sb-accent mb-2">
                    <Counter end={val} suffix={suffix} />
                  </div>
                  <div className="text-gray-400 text-xs font-medium uppercase tracking-wide font-body mt-1">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:grid grid-cols-2 gap-4">
            {[
              { icon: ShieldCheck, title: 'Quality First', desc: 'Every batch undergoes rigorous QC testing before shipment.' },
              { icon: Award, title: 'IS Certified', desc: 'Certified by Bureau of Indian Standards for all products.' },
              { icon: Users, title: 'Dealer Network', desc: '5,000+ dealers across all 28 Indian states.' },
              { icon: Target, title: 'R&D Driven', desc: 'Continuous product innovation from our in-house lab.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 hover:bg-white/10 transition-colors">
                <Icon size={24} className="text-sb-accent mb-3" />
                <h4 className="font-bold text-white text-sm font-heading mb-1">{title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed font-body">{desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 sm:py-20 bg-sb-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal x={-40} y={0}>
              <div className="bg-sb-primary rounded-[28px] p-6 sm:p-10 text-white shadow-lg h-full">
                <div className="w-12 h-12 bg-sb-accent rounded-xl flex items-center justify-center mb-6">
                  <Target size={24} className="text-white" />
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight font-heading text-white mb-4">
                  Our Mission
                </h2>
                <p className="text-blue-200 leading-relaxed text-lg font-body">
                  To manufacture and supply premium quality solvent cements that provide reliable, leak-proof joints for every plumbing application — ensuring safety, durability, and customer satisfaction at every step.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal x={40} y={0} delay={0.15}>
              <div className="bg-sb-accent rounded-[28px] p-6 sm:p-10 text-white shadow-lg h-full">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                  <Award size={24} className="text-white" />
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight font-heading text-white mb-4">Our Vision</h2>
                <p className="text-cyan-100 leading-relaxed text-lg font-body">
                  To be recognised as Asia&apos;s most trusted solvent cement manufacturer by setting benchmarks in product quality, innovation, and sustainable manufacturing practices that protect people and the planet.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Shipping & Returns */}
      <section className="py-16 sm:py-24 bg-[#001a3a] text-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 opacity-5 z-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0, 180, 216, 0.6) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p className="section-label text-sb-accent font-bold uppercase tracking-widest text-xs mb-3">Our Policies</p>
            <h2 className="section-title text-white mb-12">Customer First Approach</h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Delivery */}
            <ScrollReveal x={-30} y={0} delay={0.1}>
              <div 
                onClick={() => navigate('freeDelivery')}
                className="bg-white/5 border border-white/10 rounded-[28px] p-8 text-left hover:bg-white/10 transition-all duration-300 group h-full flex flex-col items-start shadow-md hover:shadow-xl hover:border-sb-accent/30 cursor-pointer"
              >
                <div className="w-14 h-14 bg-sb-accent/10 group-hover:bg-sb-accent/20 text-sb-accent rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
                  <Truck size={30} className="group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 font-heading">Free Delivery Across India</h3>
                <p className="text-gray-300 text-sm leading-relaxed font-body">
                  Our company provides free delivery to all states in India. No matter where you are located, we ensure your orders reach your doorstep safely at no additional cost.
                </p>
              </div>
            </ScrollReveal>
            
            {/* Free Return */}
            <ScrollReveal x={30} y={0} delay={0.2}>
              <div 
                onClick={() => navigate('returnsPolicy')}
                className="bg-white/5 border border-white/10 rounded-[28px] p-8 text-left hover:bg-white/10 transition-all duration-300 group h-full flex flex-col items-start shadow-md hover:shadow-xl hover:border-sb-accent/30 cursor-pointer"
              >
                <div className="w-14 h-14 bg-sb-accent/10 group-hover:bg-sb-accent/20 text-sb-accent rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
                  <RotateCcw size={30} className="group-hover:rotate-45 transition-transform duration-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 font-heading">Easy Free Return Policy</h3>
                <p className="text-gray-300 text-sm leading-relaxed font-body">
                  We stand by the quality of our products. If you are not satisfied, take advantage of our easy free return policy with hassle-free pickup and a quick refund processing system.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-sb-light">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-sb-primary mb-4">Ready to work with us?</h2>
            <p className="text-sb-grey mb-8 text-lg font-body">Explore our product range or apply to become a dealer in your region.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => navigate('products')} className="bg-sb-primary text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-900 transition-colors flex items-center gap-2 shadow-md">
                View Products <ArrowRight size={18} />
              </button>
              <button onClick={() => navigate('dealership')} className="bg-sb-accent text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#0096b4] transition-colors flex items-center gap-2 shadow-md">
                Become a Dealer <ArrowRight size={18} />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default About;
