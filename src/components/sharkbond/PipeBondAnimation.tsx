'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type CementType = 'PVC' | 'UPVC' | 'CPVC';

export const PipeBondAnimation: React.FC = () => {
  const [step, setStep] = useState(0);
  const [cementType, setCementType] = useState<CementType>('PVC');

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 3);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const configs: Record<CementType, {
    pipeStart: string; pipeMiddle: string; pipeEnd: string;
    cementColor: string; glowColor: string; pipeLabel: string;
    accentGlow: string;
  }> = {
    PVC: {
      pipeStart: '#64748b', pipeMiddle: '#475569', pipeEnd: '#1e293b',
      cementColor: '#6366f1', glowColor: '#6366f1',
      pipeLabel: 'PVC CLASS 2 - IS:4985', accentGlow: 'rgba(99, 102, 241, 0.3)',
    },
    UPVC: {
      pipeStart: '#cbd5e1', pipeMiddle: '#94a3b8', pipeEnd: '#475569',
      cementColor: '#00b4d8', glowColor: '#00b4d8',
      pipeLabel: 'UPVC SCH 80 - ASTM D1785', accentGlow: 'rgba(0, 180, 216, 0.3)',
    },
    CPVC: {
      pipeStart: '#fef3c7', pipeMiddle: '#fde68a', pipeEnd: '#d97706',
      cementColor: '#f97316', glowColor: '#f97316',
      pipeLabel: 'CPVC SDR 11 - ASTM D2846', accentGlow: 'rgba(249, 115, 22, 0.3)',
    },
  };

  const config = configs[cementType];

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]">

      {/* Dynamic Background radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[100px] pointer-events-none transition-all duration-500"
        style={{ backgroundColor: config.accentGlow }}
      />

      {/* Header controls & Status */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 mb-3 sm:mb-4 relative z-10 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sb-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sb-accent"></span>
          </span>
          <span className="text-xs text-gray-300 font-semibold uppercase tracking-wider transition-all">
            {step === 0 && 'Applying Cement...'}
            {step === 1 && 'Fusing Connection...'}
            {step === 2 && 'Joint Sealed! (100% Watertight)'}
          </span>
        </div>

        {/* Dynamic Selector Tabs */}
        <div className="flex gap-1 bg-white/[0.04] p-1 rounded-lg sm:rounded-xl border border-white/5">
          {(['PVC', 'UPVC', 'CPVC'] as CementType[]).map((type) => (
            <button
              key={type}
              onClick={() => setCementType(type)}
              className={`px-2.5 sm:px-3 py-1 rounded-md sm:rounded-lg text-xs font-bold tracking-wider transition-all uppercase ${
                cementType === type
                  ? 'bg-sb-accent text-white shadow-md shadow-cyan-500/25'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="w-full max-w-sm h-64 flex items-center justify-center relative select-none">
        <svg viewBox="0 0 440 240" className="w-full h-full">
          <defs>
            <linearGradient id="dynamicPipeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={config.pipeStart} />
              <stop offset="50%" stopColor={config.pipeMiddle} />
              <stop offset="100%" stopColor={config.pipeEnd} />
            </linearGradient>

            <linearGradient id="dynamicCementGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={config.cementColor} />
              <stop offset="100%" stopColor={config.cementColor} stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id="dynamicGlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={config.glowColor} stopOpacity="0" />
              <stop offset="50%" stopColor={config.glowColor} stopOpacity="1" />
              <stop offset="100%" stopColor={config.glowColor} stopOpacity="0" />
            </linearGradient>

            <linearGradient id="canBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="50%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            <linearGradient id="canLabelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>

            <filter id="glowFilter">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Solvent Cement Can */}
          <g transform="translate(15, 30)">
            <path d="M 15,120 L 15,170 A 25,8 0 0,0 65,170 L 65,120 Z" fill="url(#canBodyGrad)" stroke="#0f172a" strokeWidth="1.5" />
            <ellipse cx="40" cy="170" rx="25" ry="8" fill="#475569" stroke="#0f172a" strokeWidth="1.5" />
            <ellipse cx="40" cy="120" rx="25" ry="8" fill="#94a3b8" stroke="#0f172a" strokeWidth="1.5" />
            <path d="M 15.5,130 L 15.5,160 A 24.5,7.8 0 0,0 64.5,160 L 64.5,130 A 24.5,7.8 0 0,1 15.5,130 Z" fill="url(#canLabelGrad)" />
            <text x="40" y="145" fill="#00b4d8" fontSize="6.5" fontWeight="900" textAnchor="middle" letterSpacing="0.5">SHARK</text>
            <text x="40" y="152" fill="#ffffff" fontSize="5.5" fontWeight="900" textAnchor="middle" letterSpacing="0.2">BOND</text>
            <text x="40" y="158" fill={config.glowColor} fontSize="4" fontWeight="bold" textAnchor="middle" opacity="0.8">{cementType}</text>
            <rect x="33" y="110" width="14" height="10" fill="#cbd5e1" stroke="#0f172a" strokeWidth="1.5" />
            <ellipse cx="40" cy="110" rx="7" ry="2.5" fill="#94a3b8" stroke="#0f172a" strokeWidth="1.5" />
          </g>

          {/* Right Connector / Sleeve fitting */}
          <g transform="translate(220, 110)">
            <path d="M 0,-25 L 70,-25 L 70,25 L 0,25 Z" fill="url(#dynamicPipeGrad)" stroke="#0f172a" strokeWidth="2" />
            <rect x="-4" y="-30" width="8" height="60" rx="3" fill="#475569" stroke="#0f172a" strokeWidth="2" />
            <rect x="70" y="-30" width="8" height="60" rx="3" fill="#475569" stroke="#0f172a" strokeWidth="2" />
            <line x1="45" y1="-24" x2="45" y2="24" stroke="#0f172a" strokeWidth="2" strokeDasharray="3,3" />
            <path d="M 78,-20 L 140,-20 L 140,20 L 78,20 Z" fill="url(#dynamicPipeGrad)" stroke="#0f172a" strokeWidth="2" />
          </g>

          {/* Left Pipe */}
          <g transform="translate(0, 110)">
            <motion.g
              animate={{ x: step === 0 ? 0 : 55 }}
              transition={{ type: 'spring', stiffness: 110, damping: 18 }}
            >
              <path d="M -50,-20 L 170,-20 L 170,20 L -50,20 Z" fill="url(#dynamicPipeGrad)" stroke="#0f172a" strokeWidth="2" />
              <text x="10" y="4" fill="#0f172a" fontSize="6" fontWeight="900" opacity="0.2" letterSpacing="0.1">{config.pipeLabel}</text>
              <line x1="170" y1="-19" x2="170" y2="19" stroke="#e2e8f0" strokeWidth="1.5" />
              <rect x="162" y="-18" width="6" height="36" fill={config.glowColor} opacity={step === 0 ? 0.3 : 0} />

              {/* Applied solvent cement layer */}
              <AnimatePresence>
                {step === 0 && (
                  <motion.rect
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.4, 0.8, 0.5] }}
                    exit={{ opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    x="135" y="-19" width="35" height="38"
                    fill="url(#dynamicCementGrad)" rx="1"
                  />
                )}
              </AnimatePresence>
            </motion.g>
          </g>

          {/* Solvent Cement Applicator / Brush */}
          <AnimatePresence>
            {step === 0 && (
              <motion.g
                initial={{ opacity: 0, y: 50, x: 130 }}
                animate={{
                  opacity: 1,
                  y: [80, 140, 80],
                  x: [135, 155, 135],
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                  x: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                  opacity: { duration: 0.3 }
                }}
              >
                <rect x="-10" y="-30" width="20" height="8" fill="#1e293b" rx="2" stroke="#0f172a" strokeWidth="1" />
                <path d="M 0,-22 L 0,0" stroke="#1e293b" strokeWidth="4" />
                <rect x="-3" y="0" width="6" height="24" fill="#94a3b8" stroke="#0f172a" strokeWidth="1" />
                <ellipse cx="0" cy="24" rx="8" ry="10" fill="url(#dynamicCementGrad)" />
                <circle cx="-3" cy="27" r="2.5" fill="#ffffff" opacity="0.6" />
                <motion.circle
                  animate={{ y: [24, 60], opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.5, ease: "easeIn" }}
                  cx="0" cy="24" r="3.5" fill={config.cementColor}
                />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Fusion / Chemical Weld Glow Ring */}
          <AnimatePresence>
            {step === 2 && (
              <g>
                <motion.rect
                  initial={{ opacity: 0, scaleY: 0.8 }}
                  animate={{
                    opacity: [0.8, 1, 0.8],
                    scaleY: [1, 1.15, 1],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  x="218" y="82" width="10" height="56"
                  fill="url(#dynamicGlowGrad)" filter="url(#glowFilter)" rx="4"
                  className="origin-center"
                />
                {[
                  { x: 223, y: 76, dx: 0, dy: -25 },
                  { x: 223, y: 144, dx: 0, dy: 25 },
                  { x: 212, y: 110, dx: -25, dy: 0 },
                  { x: 234, y: 110, dx: 25, dy: 0 },
                ].map((pt, idx) => (
                  <motion.circle
                    key={idx}
                    initial={{ opacity: 1, scale: 0.5 }}
                    animate={{
                      cx: pt.x + pt.dx,
                      cy: pt.y + pt.dy,
                      opacity: 0,
                      scale: 1.5,
                    }}
                    transition={{ repeat: Infinity, duration: 1.2, delay: idx * 0.15 }}
                    cx={pt.x} cy={pt.y} r="4" fill={config.glowColor} filter="url(#glowFilter)"
                  />
                ))}
              </g>
            )}
          </AnimatePresence>
        </svg>

        {/* Floating checkmark on successful weld */}
        <AnimatePresence>
          {step === 2 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              style={{ borderColor: config.glowColor, color: config.glowColor }}
              className="absolute bottom-4 bg-white/5 border text-xs rounded-full px-4 py-1.5 flex items-center gap-1.5 backdrop-blur-md shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-bold tracking-wider uppercase text-xs">Weld Complete & Sealed</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Steps indicators */}
      <div className="w-full flex justify-around border-t border-white/5 pt-4 mt-2">
        {[
          { label: 'Step 1', value: 'Primer & Cement' },
          { label: 'Step 2', value: 'Cold Weld Fusion' },
          { label: 'Step 3', value: '100% Leak-Proof' },
        ].map((item, idx) => (
          <div key={idx} className="text-center">
            <span className="block text-xs text-gray-500 font-semibold uppercase tracking-wider">{item.label}</span>
            <span className={`text-xs font-bold ${idx === step ? 'text-sb-accent' : 'text-gray-400'} transition-colors duration-300`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipeBondAnimation;
