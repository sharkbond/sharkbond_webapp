'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronRight } from 'lucide-react';
import { useNavigation, type PageName } from '@/store/navigation';

const menuContainerVariants = {
  hidden: { opacity: 0, height: 0 },
  show: {
    opacity: 1,
    height: 'auto',
    transition: {
      height: { duration: 0.3, ease: 'easeOut' },
      staggerChildren: 0.04,
      delayChildren: 0.05,
    }
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      height: { duration: 0.25, ease: 'easeIn' },
      staggerChildren: 0.02,
      staggerDirection: -1,
    }
  }
};

const menuItemVariants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 350, damping: 26 } },
  exit: { opacity: 0, x: -10, transition: { duration: 0.15 } }
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { navigate, currentPage } = useNavigation();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change and prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const navLinks: { label: string; page: PageName | null; external?: boolean; href?: string; download?: boolean }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Products', page: 'products' },
    { label: 'Dealership', page: 'dealership' },
    { label: 'Download', page: null, external: true, href: '/api/download', download: true },
    { label: 'Contact', page: 'contact' },
  ];

  // Determine which nav section is active (productDetail → highlight Products)
  const activeNavPage = currentPage === 'productDetail' ? 'products' : currentPage;

  const handleNav = useCallback((page: PageName | null) => {
    if (page) navigate(page);
    setIsOpen(false);
  }, [navigate]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sb-accent via-cyan-300 to-sb-accent origin-left z-[60]"
        role="progressbar"
        aria-label="Page scroll progress"
      />

      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
          'animate-[slideIn_0.4s_ease-out]',
          scrolled ? 'bg-white/95 backdrop-blur-lg shadow-xl' : 'bg-transparent'
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <button
              onClick={() => handleNav('home')}
              className="flex items-center space-x-3 group"
              aria-label="Shark Bond Home"
            >
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden p-0.5 shadow-sm group-hover:scale-105 transition-transform duration-300">
                <img src="/assets/sb-logo.png" alt="Shark Bond Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className={`font-black text-xl tracking-tight transition-colors duration-300 ${scrolled ? 'text-primary' : 'text-white'}`}>
                  SHARK BOND
                </div>
                <div className={`text-xs font-medium tracking-[0.15em] transition-colors duration-300 text-[#E20935]`}>
                  CHEMSEAL INDUSTRIES
                </div>
              </div>
            </button>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    download={link.download ? 'SHARK BOND BROCHURE.pdf' : undefined}
                    target={link.external && !link.download ? '_blank' : undefined}
                    rel={link.external && !link.download ? 'noreferrer' : undefined}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 relative group ${scrolled ? 'text-sb-grey hover:text-sb-primary' : 'text-white/90 hover:text-white'
                      }`}
                    aria-label={link.download ? `Download brochure` : `Open external link`}
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => handleNav(link.page)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 relative group ${activeNavPage === link.page
                      ? 'text-sb-accent'
                      : scrolled ? 'text-sb-grey hover:text-sb-primary' : 'text-white/90 hover:text-white'
                      }`}
                    aria-current={activeNavPage === link.page ? 'page' : undefined}
                  >
                    {link.label}
                    {activeNavPage === link.page && (
                      <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-sb-accent rounded-full" />
                    )}
                  </button>
                )
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-sb-primary' : 'text-white'}`}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
              />
              {/* Menu Panel */}
              <motion.div
                variants={menuContainerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-2xl overflow-hidden relative z-50 rounded-b-2xl border-b border-slate-100"
              >
                <div className="px-5 py-5 space-y-1.5">
                  {navLinks.map((link) => (
                    <motion.div key={link.label} variants={menuItemVariants}>
                      {link.external ? (
                        <a
                          href={link.href}
                          download={link.download ? 'SHARK BOND BROCHURE.pdf' : undefined}
                          target={link.external && !link.download ? '_blank' : undefined}
                          rel={link.external && !link.download ? 'noreferrer' : undefined}
                          className="flex items-center justify-between w-full px-4 py-3 rounded-xl font-semibold text-sm text-sb-grey hover:bg-slate-50/80 hover:text-sb-primary transition-all duration-200 border-l-4 border-transparent hover:border-slate-200"
                          onClick={() => setIsOpen(false)}
                        >
                          <span>{link.label}</span>
                          <ChevronRight size={16} className="text-gray-400 group-hover:text-sb-primary transition-colors" />
                        </a>
                      ) : (
                        <button
                          onClick={() => handleNav(link.page)}
                          className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                            activeNavPage === link.page
                              ? 'bg-sb-primary/8 border-l-4 border-sb-accent text-sb-primary font-bold shadow-sm'
                              : 'font-semibold text-sb-grey hover:bg-slate-50/80 border-l-4 border-transparent hover:border-slate-200 hover:text-sb-primary'
                          }`}
                          aria-current={activeNavPage === link.page ? 'page' : undefined}
                        >
                          <span>{link.label}</span>
                          <ChevronRight
                            size={16}
                            className={`transition-all duration-200 ${
                              activeNavPage === link.page
                                ? 'text-sb-accent translate-x-0.5'
                                : 'text-gray-400'
                            }`}
                          />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
