'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';
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

const Privacy: React.FC = () => {
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
              <Shield size={24} className="text-sb-accent" />
            </div>
            <div>
              <p className="section-label">Legal</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading text-white">Privacy Policy</h1>
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
              <strong className="text-sb-primary">Important:</strong> This Privacy Policy describes how Chemseal Industries (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) collects, uses, and protects your personal information when you visit our website or contact us through our inquiry forms.
            </div>
          </ScrollReveal>

          <Section title="1. Information We Collect">
            <p>We collect information you voluntarily provide to us when you:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Submit a contact or product inquiry form</li>
              <li>Apply to become an authorized dealer</li>
              <li>Contact us through WhatsApp, email, or phone</li>
            </ul>
            <p className="mt-2">This information may include your name, mobile number, email address, company/business name, city, state, and the nature of your inquiry.</p>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use your personal information solely to:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Respond to your product or business inquiries</li>
              <li>Process dealership applications and follow up</li>
              <li>Provide technical support and product recommendations</li>
              <li>Send order updates or quotations when requested</li>
              <li>Improve our website experience and services</li>
            </ul>
            <p className="mt-2">We do <strong>not</strong> use your information for unsolicited promotional marketing without your consent.</p>
          </Section>

          <Section title="3. Data Sharing and Disclosure">
            <p>We do not sell, trade, or rent your personal information to any third parties. Your information may be shared only in the following circumstances:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>With our internal sales and support team to handle your inquiry</li>
              <li>With authorized service partners strictly for fulfilling your request</li>
              <li>When required by law or a competent authority</li>
            </ul>
          </Section>

          <Section title="4. Data Security">
            <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Our website uses HTTPS encryption for all data in transit.</p>
          </Section>

          <Section title="5. Cookies and Tracking">
            <p>Our website may use essential cookies to ensure basic functionality. We do not use third-party advertising cookies or behavioral tracking technologies. You can disable cookies in your browser settings, although some features of the site may not function correctly as a result.</p>
          </Section>

          <Section title="6. Data Retention">
            <p>We retain your personal information only for as long as necessary to fulfill the purpose for which it was collected, or as required by applicable law. Inquiry records are typically retained for up to 2 years for business correspondence purposes.</p>
          </Section>

          <Section title="7. Your Rights">
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Request access to the personal data we hold about you</li>
              <li>Request correction of inaccurate or incomplete data</li>
              <li>Request deletion of your personal data</li>
              <li>Withdraw your consent to use your data at any time</li>
            </ul>
            <p className="mt-2">To exercise any of these rights, please contact us at <a href="mailto:Info.chemsealindustries@gmail.com" className="text-sb-accent hover:underline">Info.chemsealindustries@gmail.com</a>.</p>
          </Section>

          <Section title="8. Third-Party Links">
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review their privacy policies before providing any personal information.</p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. Changes will be reflected by updating the &quot;Last updated&quot; date at the top of this page. Continued use of our website after any changes constitutes your acceptance of the updated policy.</p>
          </Section>

          <Section title="10. Contact Us">
            <p>If you have any questions or concerns about this Privacy Policy, please reach out to us:</p>
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
              <button onClick={() => navigate('terms')}
                className="inline-flex items-center gap-2 border border-sb-primary/30 text-sb-primary font-semibold px-6 py-3 rounded-xl hover:bg-sb-primary hover:text-white transition-colors text-sm">
                View Terms &amp; Conditions
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
