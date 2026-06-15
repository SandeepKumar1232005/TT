"use client";

import React from 'react';
import { Sparkles, MessageSquare, MapPin } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface CTAProps {
  onBookClick: () => void;
}

export default function CTA({ onBookClick }: CTAProps) {
  const { language } = useLanguage();

  return (
    <section className="py-28 bg-luxury-black relative z-10 overflow-hidden border-b border-white/5">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-gold/10 via-yellow-900/10 to-transparent blur-[120px] rounded-full animate-pulse" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Spark decoration icon */}
        <div className="inline-flex p-3 rounded-full bg-gold/10 border border-gold/30 gold-glow mb-6 animate-float">
          <Sparkles className="w-6 h-6 text-gold" />
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-space font-extrabold text-white tracking-tight mb-6 leading-tight">
          {language === 'ta' ? 'புதிய பயணத்திற்குத் தயாராகிவிட்டீர்களா?' : 'Ready For Your Next Journey?'}
        </h2>

        <p className="max-w-2xl text-gray-300 text-sm sm:text-base font-light leading-relaxed mx-auto mb-10">
          {language === 'ta' 
            ? 'கோயம்புத்தூர், சென்னை, மற்றும் தென்னிந்தியாவின் எந்தவொரு சுற்றுலா தலங்களுக்கும் பலநாட்கள் சொகுசுப் பயணங்களை மேற்கொள்ளுங்கள். உங்களது ஓட்டுநர் எப்போதும் தயாராக உள்ளார்.'
            : 'Book rides from Chennai, Coimbatore, or request multi-day state-permitted tourist outstation trips with safe private driver-partners.'}
        </p>

        {/* Action button triggers */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={onBookClick}
            className="w-full sm:w-auto px-10 py-4 font-space font-bold text-sm tracking-widest uppercase bg-gradient-to-r from-gold-dark via-gold to-gold-light text-luxury-black hover:scale-[1.01] transition-transform shadow-lg shadow-gold/15 cursor-pointer rounded-full active:scale-95 duration-100"
          >
            {language === 'ta' ? 'இப்போதே முன்பதிவு செய்' : 'BOOK NOW'}
          </button>
          
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-10 py-4 border border-white/20 hover:border-gold/50 bg-white/5 hover:bg-gold/10 text-white hover:text-gold-light font-bold text-sm tracking-widest uppercase rounded-full transition-all flex items-center justify-center space-x-2 active:scale-95 duration-100 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-gold-light" />
            <span>{language === 'ta' ? 'தொடர்பு கொள்ள' : 'CONTACT US'}</span>
          </button>
        </div>

        {/* Small Trust indicators below buttons */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-8 text-xs text-gray-500 mt-14 font-mono">
          <span className="flex items-center"><MapPin className="w-3.5 h-3.5 text-gold/45 mr-1.5" /> {language === 'ta' ? 'அனைத்து நகரங்களும் அடங்கின' : 'All South Indian Cities Covered'}</span>
          <span className="flex items-center">✦ {language === 'ta' ? 'விமான நிலைய காத்திருப்பு கட்டணங்கள் இல்லை' : 'Free Wait Time on Delays'}</span>
          <span className="flex items-center">✦ {language === 'ta' ? 'ஜிபிஎஸ் வசதி கொண்ட பாதுகாப்பு வாகனங்கள்' : 'GPS Secured and Licensed Fleet'}</span>
        </div>

      </div>
    </section>
  );
}
