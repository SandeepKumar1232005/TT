"use client";

import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Phone, ExternalLink } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { BUSINESS } from '../lib/constants';

export default function FloatingWhatsApp() {
  const { language } = useLanguage();

  const handleWhatsappClick = () => {
    const textMessage = language === 'ta'
      ? "வணக்கம் வேதன் டிராவல்ஸ், கோயம்புத்தூரிலிருந்து ஒரு பிரயாணம் செய்ய வழிகாட்டுதல் மற்றும் கட்டண விவரங்களை அறிய விரும்புகிறேன்."
      : "Hello Vedan Travels, I would like to inquire about booking a trip starting from Coimbatore.";
    
    const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(textMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCallClick = () => {
    window.location.href = `tel:${BUSINESS.phone}`;
  };

  return (
    <div id="floating-actions-container" className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none gap-3">
      
      {/* Decorative premium tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="mb-1 bg-luxury-black/95 text-white border border-gold/40 px-3.5 py-1.5 rounded-xl shadow-2xl backdrop-blur-md flex items-center space-x-2 pointer-events-auto cursor-pointer select-none"
        onClick={handleWhatsappClick}
      >
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </div>
        <span className="text-[10px] sm:text-xs font-mono tracking-wider font-medium text-gold-light">
          {language === 'ta' ? 'அதிவேக பதில் கிடைக்கும்' : 'Online Booking Help'}
        </span>
      </motion.div>

      {/* Call Now Button */}
      <motion.button
        id="floating-call-btn"
        onClick={handleCallClick}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, rotate: 30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        className="pointer-events-auto relative group flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-luxury-black via-[#0F0F12] to-luxury-black border border-white/20 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:border-gold/40 cursor-pointer overflow-hidden"
      >
        {/* Subtle running glow reflection */}
        <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-out" />

        {/* Phone icon */}
        <div className="relative flex items-center justify-center">
          <Phone className="w-4 h-4 sm:w-4 sm:h-4 text-gold group-hover:text-gold-light transition-colors duration-300" />
        </div>

        {/* Label */}
        <span className="font-space font-semibold tracking-widest text-white drop-shadow-sm">
          {language === 'ta' ? 'அழைக்கவும்' : 'Call Now'}
        </span>
      </motion.button>

      {/* Main floating WhatsApp button with gold glow effect */}
      <motion.button
        id="floating-whatsapp-btn"
        onClick={handleWhatsappClick}
        whileHover={{ scale: 1.08, y: -4 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="pointer-events-auto relative group flex items-center gap-2.5 px-4 sm:px-5 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-luxury-black via-[#0F0F12] to-luxury-black border border-gold text-gold font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(226,177,60,0.45)] hover:shadow-[0_0_35px_rgba(226,177,60,0.85)] cursor-pointer overflow-hidden"
      >
        {/* Subtle running glow reflection */}
        <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-out" />

        {/* Pulse Ring Accent */}
        <div className="absolute inset-0 rounded-full border border-gold/30 animate-ping opacity-60 scale-105 pointer-events-none" />

        {/* Green/Gold dynamic indicator node icon */}
        <div className="relative flex items-center justify-center">
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 fill-emerald-400/10 group-hover:text-gold transition-colors duration-300" />
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gold border border-luxury-black animate-pulse" />
        </div>

        {/* Action Label */}
        <span className="font-space font-semibold tracking-widest text-[#E2B13C] drop-shadow-sm flex items-center gap-1.5">
          <span>{language === 'ta' ? 'வாட்ஸ்அப்' : 'WhatsApp'}</span>
          <ExternalLink className="w-3 h-3 text-gold/60 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-4px] group-hover:translate-x-0" />
        </span>
      </motion.button>

    </div>
  );
}
