'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowLeft } from 'lucide-react';
import { useNavigation } from '@/store/navigation';
import ScrollReveal from '@/components/sharkbond/ScrollReveal';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <ScrollReveal>
    <div className="mb-10">
      <h2 className="text-xl font-bold text-sb-primary font-heading mb-3 flex items-center gap-2">
        <span className="w-1.5 h-6 bg-sb-accent rounded-full inline-block flex-shrink-0" />
        {title}
      </h2>
      <div className="text-sb-grey text-sm leading-relaxed font-body space-y-3 pl-4 border-l border-gray-100">
        {children}
      </div>
    </div>
  </ScrollReveal>
);

const Terms: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-[#001a3a] pt-24 pb-12 sm:pt-28 sm:pb-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,180,216,0.6) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => navigate('home')}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-sb-accent/20 border border-sb-accent/30 rounded-2xl flex items-center justify-center">
              <FileText size={24} className="text-sb-accent" />
            </div>
            <div>
              <p className="section-label">Legal</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading text-white">Terms &amp; Conditions</h1>
            </div>
          </div>
          <p className="text-gray-400 text-sm font-body mt-4">
            Last updated: June 2025 &nbsp;|&nbsp; Effective: June 2025
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-20 bg-sb-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <ScrollReveal>
            <div className="bg-sb-accent/5 border border-sb-accent/20 rounded-2xl px-6 py-4 mb-10 text-sm text-sb-grey font-body leading-relaxed">
              <strong className="text-sb-primary">Please Read Carefully:</strong> By accessing and using the Shark Bond website (sharkbond.com), you agree to be bound by these Terms &amp; Conditions. If you do not agree, please discontinue use of this website.
            </div>
          </ScrollReveal>

          <Section title="1. About Us">
            <p>This website is operated by <strong>Chemseal Industries</strong>, a manufacturer and distributor of solvent cement products under the brand name <strong>Shark Bond</strong>, based in Ahmedabad, Gujarat, India. References to &quot;we,&quot; &quot;our,&quot; or &quot;us&quot; throughout these terms refer to Chemseal Industries.</p>
          </Section>

          <Section title="2. Use of Website">
            <p>This website is intended for informational and business inquiry purposes only. You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others. You must not:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Use the site to transmit any unauthorized advertising or spam</li>
              <li>Attempt to gain unauthorized access to any part of the site or its servers</li>
              <li>Scrape, copy, or reproduce content from this website without prior written permission</li>
              <li>Use the site in any way that could damage, disable, or overburden our servers</li>
            </ul>
          </Section>

          <Section title="3. Product Information">
            <p>All product descriptions, specifications, and images on this website are provided for general informational purposes. While we strive for accuracy, product details may vary and are subject to change without notice. We recommend contacting us directly for the most up-to-date technical specifications and availability.</p>
            <p>Images shown are for representation purposes only. Actual product appearance may vary slightly based on batch or packaging updates.</p>
          </Section>

          <Section title="4. Inquiries and Orders">
            <p>Submitting a contact or dealer inquiry form on our website does not constitute a confirmed order or binding contract. All inquiries are reviewed by our team, and any sale or partnership is subject to a formal agreement, availability, and our acceptance.</p>
            <p>Pricing, minimum order quantities, and delivery terms will be communicated separately and are subject to change.</p>
          </Section>

          <Section title="5. Dealership Applications">
            <p>Submitting a dealership application does not guarantee approval. We reserve the right to approve or reject any dealership application at our sole discretion based on territory availability, applicant qualifications, and business alignment. Approved dealerships are governed by a separate Dealer Agreement.</p>
          </Section>

          <Section title="6. Intellectual Property">
            <p>All content on this website — including but not limited to the Shark Bond name, logo, product images, text, graphics, and design — is the intellectual property of Chemseal Industries and is protected under applicable copyright and trademark laws.</p>
            <p>You may not reproduce, distribute, modify, or create derivative works from any content on this website without our express written consent.</p>
          </Section>

          <Section title="7. Limitation of Liability">
            <p>To the fullest extent permitted by law, Chemseal Industries shall not be liable for:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Any direct, indirect, incidental, or consequential damages arising from your use of this website</li>
              <li>Errors, omissions, or inaccuracies in website content</li>
              <li>Temporary unavailability or interruption of the website</li>
              <li>Any loss or damage resulting from reliance on information published on this website</li>
            </ul>
          </Section>

          <Section title="8. Third-Party Links">
            <p>Our website may contain links to external websites, including distributor pages, certification bodies, or social media platforms. We have no control over the content or privacy practices of third-party websites and accept no responsibility for them. Visiting linked sites is at your own risk.</p>
          </Section>

          <Section title="9. Governing Law">
            <p>These Terms &amp; Conditions are governed by and construed in accordance with the laws of India. Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the courts in Ahmedabad, Gujarat.</p>
          </Section>

          <Section title="10. Changes to Terms">
            <p>We reserve the right to update or modify these Terms &amp; Conditions at any time without prior notice. The &quot;Last updated&quot; date at the top of this page will reflect any changes. Your continued use of the website after any modifications constitutes your acceptance of the revised terms.</p>
          </Section>

          <Section title="11. Contact Us">
            <p>For any questions, concerns, or legal inquiries regarding these terms, please contact us:</p>
            <div className="mt-3 space-y-1">
              <p><strong>Chemseal Industries</strong></p>
              <p>03, Shreedhar Industrial Park, Near Nikol Ring Road, Nikol, Ahmedabad – 382350</p>
              <p>📞 <a href="tel:+918866604466" className="text-sb-accent hover:underline">+91 8866604466</a></p>
              <p>✉️ <a href="mailto:Info.chemsealindustries@gmail.com" className="text-sb-accent hover:underline">Info.chemsealindustries@gmail.com</a></p>
            </div>
          </Section>

          <ScrollReveal>
            <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-200">
              <button onClick={() => navigate('home')}
                className="inline-flex items-center gap-2 bg-sb-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-900 transition-colors text-sm">
                <ArrowLeft size={16} /> Back to Home
              </button>
              <button onClick={() => navigate('privacy')}
                className="inline-flex items-center gap-2 border border-sb-primary/30 text-sb-primary font-semibold px-6 py-3 rounded-xl hover:bg-sb-primary hover:text-white transition-colors text-sm">
                View Privacy Policy
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Terms;
