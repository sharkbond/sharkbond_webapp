'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '@/store/navigation';

const NotFound: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 relative overflow-hidden">
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, -10, 10, -10, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }}
        className="text-8xl mb-6 select-none cursor-default filter drop-shadow-lg"
      >
        🦈
      </motion.div>

      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', delay: 0.1 }}
        className="text-7xl md:text-8xl font-extrabold text-sb-primary mb-4 tracking-tight font-heading"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl md:text-2xl text-sb-grey mb-8 font-medium font-body"
      >
        Oops! The page you are looking for has floated away.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <button onClick={() => navigate('home')} className="bg-sb-accent text-white px-8 py-4 rounded-xl text-base sm:text-lg font-semibold shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all inline-flex items-center gap-2">
          Take Me Home
        </button>
      </motion.div>
    </div>
  );
};

export default NotFound;
