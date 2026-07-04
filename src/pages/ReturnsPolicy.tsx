'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, AlertTriangle, CheckSquare, ClipboardList, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useNavigation } from '@/store/navigation';
import ScrollReveal from '@/components/sharkbond/ScrollReveal';

const ReturnsPolicy: React.FC = () => {
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

          <p className="section-label">Refunds & Replacements</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-heading text-white mb-4">
            Easy Free Returns
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl font-body leading-relaxed">
            Your satisfaction is our priority. If there is any issue with your solvent cement shipment, our zero-cost returns policy protects you fully.
          </p>
        </div>
      </section>

      {/* Main Details */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="space-y-8">
          {/* Key Returns Stats Card */}
          <ScrollReveal delay={0.1}>
            <div className="bg-white rounded-[28px] p-8 shadow-lg border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-sb-primary font-bold text-3xl mb-1">24 Months </div>
                <div className="text-sb-grey text-xs font-semibold uppercase tracking-wider">Return Window</div>
              </div>
              <div className="border-y md:border-y-0 md:border-x border-gray-100 py-4 md:py-0">
                <div className="text-sb-primary font-bold text-3xl mb-1">100% Free</div>
                <div className="text-sb-grey text-xs font-semibold uppercase tracking-wider">Pickup & Transit</div>
              </div>
              <div>
                <div className="text-sb-primary font-bold text-3xl mb-1">48 Hours</div>
                <div className="text-sb-grey text-xs font-semibold uppercase tracking-wider">Refund Processed</div>
              </div>
            </div>
          </ScrollReveal>

          {/* Details Content Cards */}
          <ScrollReveal delay={0.2}>
            <div className="bg-white rounded-[28px] p-8 sm:p-10 shadow-lg border border-gray-100 space-y-10">

              {/* Coverage Details */}
              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-sb-primary">
                  <CheckSquare size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 font-heading">Eligible Return Scenarios</h3>
                  <p className="text-sb-grey text-sm font-body leading-relaxed">
                    We accept free returns and provide full refunds or immediate replacements under the following circumstances:
                  </p>
                  <ul className="mt-4 space-y-2 text-sb-grey text-sm font-body list-disc pl-5">
                    <li>Products received in damaged condition or leaking cans.</li>
                    <li>Receipt of incorrect product variant (e.g., received PVC instead of CPVC).</li>
                    <li>Shipped batch expiration/shelf life concerns.</li>
                    <li>Discrepancies in the quantity ordered versus received.</li>
                  </ul>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Step-by-Step Return Process */}
              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-sb-primary">
                  <ClipboardList size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 font-heading">Simple 3-Step Return Process</h3>
                  <div className="mt-4 space-y-4">
                    <div className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-sb-accent/15 text-sb-accent text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
                      <p className="text-sb-grey text-sm font-body">
                        <strong>Request Return:</strong> Email or call our customer service support desk within 24 Months of receiving your package. Share your order ID and a photo of the issue.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-sb-accent/15 text-sb-accent text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
                      <p className="text-sb-grey text-sm font-body">
                        <strong>Free Reverse Pickup:</strong> Our shipping partner will collect the items from your address at no cost, at your convenient scheduled time.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-sb-accent/15 text-sb-accent text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
                      <p className="text-sb-grey text-sm font-body">
                        <strong>Inspection & Refund:</strong> Once the item is inspected, your replacement or 100% refund is initiated within 48 business hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Safety Compliance */}
              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-sb-primary">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 font-heading">Safety Advisory</h3>
                  <p className="text-sb-grey text-sm font-body leading-relaxed">
                    Due to the highly volatile nature of solvent cements, do not attempt to ship returns through general courier services yourself. Please only use our designated reverse logistics pickup partners who are certified for safe hazardous material transportation.
                  </p>
                </div>
              </div>

            </div>
          </ScrollReveal>

          {/* Quick FAQ/Policy notes */}
          <ScrollReveal delay={0.3}>
            <div className="bg-[#001a3a] text-white rounded-[28px] p-8 shadow-lg border border-white/5 text-center">
              <h3 className="text-lg font-bold font-heading mb-2 text-white">Need Direct Support?</h3>
              <p className="text-cyan-100 text-sm font-body mb-6">Our support staff is ready to help you handle your return claims immediately.</p>
              <button
                onClick={() => navigate('contact')}
                className="bg-sb-accent hover:bg-[#0096b4] text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-md shadow-cyan-500/20"
              >
                Start Return Request
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPolicy;
