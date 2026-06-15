import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Star, Users, PhoneCall, ChevronDown } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface HeroProps {
  onBookClick: () => void;
  onFleetClick: () => void;
}

export default function Hero({ onBookClick, onFleetClick }: HeroProps) {
  const { language, t } = useLanguage();
  // Count up animation values
  const [trips, setTrips] = useState(0);
  const [partners, setPartners] = useState(0);

  useEffect(() => {
    // Elegant counts simulation on mount
    const tripsInterval = setInterval(() => {
      setTrips((prev) => {
        if (prev >= 1000) {
          clearInterval(tripsInterval);
          return 1000;
        }
        return prev + 25;
      });
    }, 30);

    const partnersInterval = setInterval(() => {
      setPartners((prev) => {
        if (prev >= 50) {
          clearInterval(partnersInterval);
          return 50;
        }
        return prev + 2;
      });
    }, 40);

    return () => {
      clearInterval(tripsInterval);
      clearInterval(partnersInterval);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-24 pb-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Premium Cinematic Background Grid and Slow Moving Sunset Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-luxury-gray/40 via-luxury-black to-luxury-black pointer-events-none" />
        
        {/* Real landscape road overlay representing Tamil Nadu mountains */}
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 pointer-events-none filter brightness-50"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1920")'
          }}
        />

        {/* Abstract metallic moving gold-line overlays */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(212,175,55,0.1)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(212,175,55,0.1)_1px,_transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Soft floating golden orbs mimicking luxurious cabin atmospheres */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-10 w-[450px] h-[450px] rounded-full bg-yellow-900/10 blur-[130px]" />
      </div>

      {/* Main Content Pane */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Gold Bordered Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold-light text-xs sm:text-sm font-medium tracking-widest uppercase mb-6 shadow-inner"
        >
          <ShieldCheck className="w-4 h-4 text-gold animate-mid-pulse" />
          <span>{t('hero.badge')}</span>
        </motion.div>

        {/* Cinematic Main Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold font-space tracking-tight text-white mb-6 leading-[1.1]"
        >
          {language === 'ta' ? (
            <span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-dark font-extrabold">
                VEDAN TRAVELS
              </span>{' '}
              உடன் பாதுகாப்பாகவும் வசதியாகவும் பயணம் செய்யுங்கள்
            </span>
          ) : (
            <span>
              Travel Safely and Comfortably with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-dark font-extrabold">
                VEDAN TRAVELS
              </span>
            </span>
          )}
        </motion.h1>

        {/* Styled Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-2xl text-gray-300 text-base sm:text-lg md:text-xl font-light tracking-wide leading-relaxed mb-10"
        >
          {t('hero.description')}
        </motion.p>

        {/* CTA Button Actions with hover micro-animations */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 mb-16"
        >
          <button
            onClick={onBookClick}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-luxury-black hover:text-black font-semibold rounded-full tracking-wider text-sm shadow-xl shadow-gold/20 hover:shadow-gold/35 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
          >
            {t('hero.btn.book')}
          </button>
          
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 border border-white/20 hover:border-gold/60 bg-white/5 hover:bg-gold/5 text-white hover:text-gold-light font-semibold rounded-full tracking-wider text-sm transition-all duration-300 cursor-pointer"
          >
            {t('hero.btn.contact')}
          </button>
        </motion.div>

        {/* Live Counters / Statistics Segment */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="w-full border-t border-b border-white/10 py-8 grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4"
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-space font-bold text-white tracking-tight flex items-baseline">
              <span>{trips}</span>
              <span className="text-gold text-2xl font-light ml-0.5">+</span>
            </span>
            <span className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest mt-1">
              {t('hero.stat.trips')}
            </span>
          </div>

          <div className="flex flex-col items-center border-l border-white/10 sm:border-l-0 lg:border-l">
            <span className="text-3xl sm:text-4xl font-space font-bold text-white tracking-tight flex items-baseline">
              <span>{partners}</span>
              <span className="text-gold text-2xl font-light ml-0.5">+</span>
            </span>
            <span className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest mt-1">
              {t('hero.stat.drivers')}
            </span>
          </div>

          <div className="flex flex-col items-center border-l border-white/10">
            <span className="text-3xl sm:text-4xl font-space font-bold text-white tracking-tight flex items-baseline">
              <span>24/7</span>
            </span>
            <span className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest mt-1">
              {t('hero.stat.support')}
            </span>
          </div>

          <div className="flex flex-col items-center border-l border-white/10">
            <span className="text-3xl sm:text-4xl font-space font-bold text-gold tracking-tight flex items-center justify-center">
              <span>4.9</span>
              <Star className="w-5 h-5 fill-gold stroke-none ml-1.5 animate-pulse" />
            </span>
            <span className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest mt-1">
              {t('hero.stat.rating')}
            </span>
          </div>
        </motion.div>

        {/* Winding road pointer indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden md:block">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100"
            onClick={() => {
              const el = document.getElementById('trust');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-gold-light mb-1">
              {t('hero.scrollDown')}
            </span>
            <ChevronDown className="w-4 h-4 text-gold" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
