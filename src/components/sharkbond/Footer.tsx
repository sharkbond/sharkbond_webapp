'use client';

import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useNavigation } from '@/store/navigation';

const Footer: React.FC = () => {
  const { navigate } = useNavigation();
  const currentYear = new Date().getFullYear();

  const navTo = (page: 'home' | 'about' | 'products' | 'dealership' | 'contact' | 'privacy' | 'terms') => {
    navigate(page);
  };

  return (
    <footer className="bg-[#001a3a] text-white mt-auto" role="contentinfo">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-5">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden p-0.5 shadow-sm">
                <img src="/assets/sb-logo.png" alt="Shark Bond Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-extrabold text-xl text-white font-heading">SHARK BOND</div>
                <div className="text-xs text-[#E20935] font-semibold tracking-[0.15em]">CHEMSEAL INDUSTRIES</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-body mb-6">
              India&apos;s trusted manufacturer of premium PVC, UPVC, and CPVC Solvent Cement. Building lasting bonds since 2015.
            </p>
            <div className="flex items-center space-x-3">
              <a href="https://www.facebook.com/share/1FeTB2MUx9/" target="_blank" rel="noreferrer"
                className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="Follow us on Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://www.instagram.com/sharkbond_?igsh=MXhtNmJycmlxbGNtdg==" target="_blank" rel="noreferrer"
                className="w-9 h-9 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label="Follow us on Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.linkedin.com/company/chemseal-industries/about/?viewAsMember=true" target="_blank" rel="noreferrer"
                className="w-9 h-9 bg-blue-700 rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors"
                aria-label="Connect with us on LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              <a href="https://www.youtube.com/@SharkBondSolventCement" target="_blank" rel="noreferrer"
                className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors"
                aria-label="Subscribe on YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
              <a href="https://wa.me/918866604466" target="_blank" rel="noreferrer"
                className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors"
                aria-label="Chat with us on WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.859 0c3.161.001 6.136 1.23 8.375 3.469 2.24 2.239 3.467 5.214 3.466 8.377-.003 6.528-5.329 11.854-11.859 11.854-.001 0-.001 0 0 0-2.002-.001-3.968-.538-5.7-1.558L0 24zm6.59-4.846c1.6.95 3.488 1.449 5.258 1.45 5.534 0 10.038-4.502 10.04-10.04.001-2.68-1.041-5.198-2.937-7.096C17.054 1.57 14.533.528 11.86.528c-5.535 0-10.04 4.502-10.041 10.04-.001 1.777.462 3.513 1.341 5.064L2.14 21.78l6.194-1.626zm10.748-7.39c-.294-.147-1.743-.86-2.012-.958-.269-.098-.465-.147-.66.147-.196.294-.759.957-.93 1.15-.171.196-.343.22-.637.072-.295-.147-1.243-.458-2.368-1.462-.875-.78-1.466-1.744-1.637-2.038-.172-.294-.018-.454.13-.601.132-.132.294-.343.441-.515.147-.171.196-.294.294-.49.098-.196.05-.367-.025-.515-.074-.147-.66-1.592-.905-2.181-.239-.574-.482-.496-.66-.505-.171-.008-.367-.01-.564-.01-.196 0-.514.073-.782.367-.269.294-1.028 1.005-1.028 2.449 0 1.445 1.051 2.84 1.198 3.037.147.196 2.067 3.156 5.007 4.43.7.303 1.246.484 1.671.62.704.223 1.346.19 1.854.114.565-.084 1.743-.712 1.989-1.4.245-.687.245-1.275.172-1.397-.074-.122-.27-.196-.565-.343z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-sb-accent mb-5">Quick Links</h4>
            <ul className="space-y-3" role="list">
              {[
                { label: 'Home', page: 'home' as const },
                { label: 'About Us', page: 'about' as const },
                { label: 'Our Products', page: 'products' as const },
                { label: 'Become a Dealer', page: 'dealership' as const },
                { label: 'Contact Us', page: 'contact' as const },
              ].map(({ label, page }) => (
                <li key={page}>
                  <button onClick={() => navTo(page)} className="text-gray-400 hover:text-white text-sm font-body transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-sb-accent rounded-full mr-2 flex-shrink-0 group-hover:scale-125 transition-transform"></span>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-sb-accent mb-5">Our Products</h4>
            <ul className="space-y-3" role="list">
              {[
                'PVC Solvent Cement',
                'UPVC Solvent Cement',
                'CPVC Solvent Cement',
              ].map((p) => (
                <li key={p}>
                  <button onClick={() => navTo('products')} className="text-gray-400 hover:text-white text-sm font-body transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-sb-accent rounded-full mr-2 flex-shrink-0 group-hover:scale-125 transition-transform"></span>
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-sb-accent mb-5">Contact Info</h4>
            <ul className="space-y-4" role="list">
              <li className="flex items-start space-x-3 text-sm text-gray-400 font-body">
                <MapPin size={16} className="text-sb-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>03, Shreedhar Industrial Park, Opp Simla Hyundai Service, Near Nikol Ring Road, Nikol, Ahmedabad 382350</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400 font-body">
                <Phone size={16} className="text-sb-accent flex-shrink-0" aria-hidden="true" />
                <a href="tel:+918866604466" className="hover:text-white transition-colors">
                  +91 8866604466
                </a>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400 font-body">
                <Mail size={16} className="text-sb-accent flex-shrink-0" aria-hidden="true" />
                <a href="mailto:Info.chemsealindustries@gmail.com" className="hover:text-white transition-colors break-all">
                  Info.chemsealindustries@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3 text-sm text-gray-400 font-body">
                <Clock size={16} className="text-sb-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>Mon &ndash; Sat: 9:00 AM &ndash; 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-400 text-sm font-body">
            &copy; {currentYear} Chemseal Industries. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-6">
            <button onClick={() => navTo('privacy')} className="text-gray-400 hover:text-white text-sm font-body transition-colors">
              Privacy Policy
            </button>
            <span className="text-gray-600 text-xs">|</span>
            <button onClick={() => navTo('terms')} className="text-gray-400 hover:text-white text-sm font-body transition-colors">
              Terms &amp; Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
