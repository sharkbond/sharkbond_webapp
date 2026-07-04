'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingButtons: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const whatsappNum = '918866604466';

  return (
    <div className="fixed bottom-6 right-5 flex flex-col items-center space-y-3 z-50">
      <AnimatePresence>
        {expanded && (
          <>
            <motion.a
              key="fb"
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{ delay: 0.13 }}
              href="https://www.facebook.com/share/1FeTB2MUx9/"
              target="_blank" rel="noreferrer"
              className="w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
              aria-label="Follow us on Facebook"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </motion.a>
            <motion.a
              key="ig"
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{ delay: 0.10 }}
              href="https://www.instagram.com/sharkbond_?igsh=MXhtNmJycmlxbGNtdg=="
              target="_blank" rel="noreferrer"
              className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity text-white"
              style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}
              aria-label="Follow us on Instagram"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </motion.a>
            <motion.a
              key="li"
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{ delay: 0.07 }}
              href="https://www.linkedin.com/company/chemseal-industries/about/?viewAsMember=true"
              target="_blank" rel="noreferrer"
              className="w-12 h-12 bg-[#0077b5] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#006297] transition-colors"
              aria-label="Connect with us on LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </motion.a>
            <motion.a
              key="yt"
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{ delay: 0.04 }}
              href="https://www.youtube.com/@SharkBondSolventCement"
              target="_blank" rel="noreferrer"
              className="w-12 h-12 bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-700 transition-colors"
              aria-label="Subscribe on YouTube"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
            </motion.a>
            <motion.a
              key="wa"
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{ delay: 0.01 }}
              href={`https://wa.me/${whatsappNum}?text=Hello%2C%20I%20am%20interested%20in%20Shark%20Bond%20products`}
              target="_blank" rel="noreferrer"
              className="w-12 h-12 bg-green-500 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-green-600 transition-colors"
              aria-label="Chat with us on WhatsApp"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.859 0c3.161.001 6.136 1.23 8.375 3.469 2.24 2.239 3.467 5.214 3.466 8.377-.003 6.528-5.329 11.854-11.859 11.854-.001 0-.001 0 0 0-2.002-.001-3.968-.538-5.7-1.558L0 24zm6.59-4.846c1.6.95 3.488 1.449 5.258 1.45 5.534 0 10.038-4.502 10.04-10.04.001-2.68-1.041-5.198-2.937-7.096C17.054 1.57 14.533.528 11.86.528c-5.535 0-10.04 4.502-10.041 10.04-.001 1.777.462 3.513 1.341 5.064L2.14 21.78l6.194-1.626zm10.748-7.39c-.294-.147-1.743-.86-2.012-.958-.269-.098-.465-.147-.66.147-.196.294-.759.957-.93 1.15-.171.196-.343.22-.637.072-.295-.147-1.243-.458-2.368-1.462-.875-.78-1.466-1.744-1.637-2.038-.172-.294-.018-.454.13-.601.132-.132.294-.343.441-.515.147-.171.196-.294.294-.49.098-.196.05-.367-.025-.515-.074-.147-.66-1.592-.905-2.181-.239-.574-.482-.496-.66-.505-.171-.008-.367-.01-.564-.01-.196 0-.514.073-.782.367-.269.294-1.028 1.005-1.028 2.449 0 1.445 1.051 2.84 1.198 3.037.147.196 2.067 3.156 5.007 4.43.7.303 1.246.484 1.671.62.704.223 1.346.19 1.854.114.565-.084 1.743-.712 1.989-1.4.245-.687.245-1.275.172-1.397-.074-.122-.27-.196-.565-.343z"/></svg>
            </motion.a>
          </>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setExpanded(!expanded)}
        animate={{ rotate: expanded ? 45 : 0 }}
        transition={{ duration: 0.2 }}
        className="w-14 h-14 bg-sb-primary text-white rounded-full shadow-xl flex items-center justify-center hover:bg-blue-900 transition-colors"
        aria-label={expanded ? 'Close social media links' : 'Open social media links'}
        aria-expanded={expanded}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </motion.button>
    </div>
  );
};

export default FloatingButtons;
