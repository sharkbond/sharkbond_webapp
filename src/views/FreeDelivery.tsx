'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Truck, MapPin, ShieldCheck, Clock, ArrowLeft, CheckCircle, Package, Lock } from 'lucide-react';
import { useNavigation } from '@/store/navigation';
import ScrollReveal from '@/components/sharkbond/ScrollReveal';

const FreeDelivery: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <div className="min-h-screen bg-sb-light pb-20">
      {/* Header Banner */}
      <section className="bg-[#001a3a] pt-24 pb-12 sm:pt-28 sm:pb-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,180,216,0.6) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate('about')}
            className="inline-flex items-center gap-2 text-sb-accent hover:text-white transition-colors text-sm font-semibold mb-6 group cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to About Us
          </button>
          
          <p className="section-label">Shipping & Logistics</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-heading text-white mb-4">
            Free Delivery Policy
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl font-body leading-relaxed">
            Chemseal Industries is committed to delivering Shark Bond products to every corner of India safely, swiftly, and completely free of charge.
          </p>
        </div>
      </section>

      {/* Main Details */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="space-y-8">
          {/* Key Shipping Stats Card */}
          <ScrollReveal delay={0.1}>
            <div className="bg-white rounded-[28px] p-8 shadow-lg border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-sb-primary font-bold text-3xl mb-1">0/-</div>
                <div className="text-sb-grey text-xs font-semibold uppercase tracking-wider">Delivery Cost</div>
              </div>
              <div className="border-y md:border-y-0 md:border-x border-gray-100 py-4 md:py-0">
                <div className="text-sb-primary font-bold text-3xl mb-1">28 States</div>
                <div className="text-sb-grey text-xs font-semibold uppercase tracking-wider">Pan-India Coverage</div>
              </div>
              <div>
                <div className="text-sb-primary font-bold text-3xl mb-1">3 - 7 Days</div>
                <div className="text-sb-grey text-xs font-semibold uppercase tracking-wider">Average Transit Time</div>
              </div>
            </div>
          </ScrollReveal>

          {/* Details Content Cards */}
          <ScrollReveal delay={0.2}>
            <div className="bg-white rounded-[28px] p-8 sm:p-10 shadow-lg border border-gray-100 space-y-10">
              
              {/* Coverage Details */}
              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-sb-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 font-heading">Complete Pan-India Coverage</h3>
                  <p className="text-sb-grey text-sm font-body leading-relaxed">
                    We deliver across all 28 states and 8 union territories in India. From bustling metros like Mumbai, Delhi, and Bengaluru to the most remote rural villages, our reliable supply chain ensures you receive Shark Bond products wherever your project is located.
                  </p>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Transit Times */}
              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-sb-primary">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 font-heading">Swift Dispatch & Transit</h3>
                  <p className="text-sb-grey text-sm font-body leading-relaxed">
                    Orders are processed and dispatched from our state-of-the-art facilities in Ahmedabad, Gujarat, within 24 to 48 hours of verification. Typical delivery durations:
                  </p>
                  <ul className="mt-4 space-y-2 text-sb-grey text-sm font-body list-none pl-0">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-emerald-500" />
                      <span><strong>West & North India:</strong> 3 - 4 working days</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-emerald-500" />
                      <span><strong>South & Central India:</strong> 4 - 5 working days</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-emerald-500" />
                      <span><strong>East & North-East India:</strong> 5 - 7 working days</span>
                    </li>
                  </ul>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Safe Handling */}
              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-sb-primary">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 font-heading">Secure Leak-Proof Packaging</h3>
                  <p className="text-sb-grey text-sm font-body leading-relaxed">
                    Solvent cements contain volatile organic compounds and are highly flammable. Our logistics partners are specially certified to handle chemical shipments. Every tin can and tube is double-packaged in impact-resistant materials to ensure absolutely zero leakage during transport.
                  </p>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Order Tracking */}
              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-sb-primary">
                  <Package size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 font-heading">Real-Time Order Tracking</h3>
                  <p className="text-sb-grey text-sm font-body leading-relaxed">
                    Once your shipment is dispatched, you will receive a tracking link via WhatsApp/SMS and email. You can easily track the real-time location and estimated delivery date of your Shark Bond products through our integrated courier portals.
                  </p>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* OTP Secure Delivery */}
              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-sb-primary">
                  <Lock size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 font-heading">OTP-Based Secure Delivery</h3>
                  <p className="text-sb-grey text-sm font-body leading-relaxed">
                    To ensure safety and prevent unauthorized collection, all high-value or commercial Shark Bond deliveries are secured with an OTP (One-Time Password) process. A unique 4-digit code will be sent to your registered mobile number upon dispatch, which must be shared with the delivery agent to release the package.
                  </p>
                </div>
              </div>

            </div>
          </ScrollReveal>

          {/* Quick FAQ/Policy notes */}
          <ScrollReveal delay={0.3}>
            <div className="bg-[#001a3a] text-white rounded-[28px] p-8 shadow-lg border border-white/5 text-center">
              <h3 className="text-lg font-bold font-heading mb-2 text-white">Need Bulk Orders?</h3>
              <p className="text-cyan-100 text-sm font-body mb-6">If you are placing wholesale distributor orders, special route transportation can be organized by our team.</p>
              <button 
                onClick={() => navigate('contact')}
                className="bg-sb-accent hover:bg-[#0096b4] text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-md shadow-cyan-500/20"
              >
                Contact Dispatch Team
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default FreeDelivery;
