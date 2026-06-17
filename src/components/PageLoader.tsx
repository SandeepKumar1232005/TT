"use client";

import React, { useState, useEffect } from 'react';

export default function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fade-out after a brief delay to ensure content is ready
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1200);

    // Remove from DOM after fade animation completes
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 1800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-luxury-black transition-opacity duration-600 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-gold/10 rounded-full blur-[100px] animate-pulse" />

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        <div className="text-3xl sm:text-4xl font-bold font-space tracking-wider text-white">
          VEDAN <span className="text-gold tracking-tight font-light font-sans ml-1 text-2xl sm:text-3xl">TRAVELS</span>
        </div>

        {/* Gold spinner */}
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-2 border-gold/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold animate-spin" />
        </div>

        <p className="text-[10px] font-mono text-gold-light/60 tracking-[0.3em] uppercase">
          Loading Experience
        </p>
      </div>
    </div>
  );
}
