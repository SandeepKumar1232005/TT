import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle, Quote, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../LanguageContext';

export default function Testimonials() {
  const { t, translatedTestimonials, language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide trigger
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % translatedTestimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [translatedTestimonials.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + translatedTestimonials.length) % translatedTestimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % translatedTestimonials.length);
  };

  const activeReview = translatedTestimonials[activeIndex] || translatedTestimonials[0];

  return (
    <section id="reviews" className="py-24 bg-luxury-dark/50 relative z-10 border-t border-b border-white/5 overflow-hidden">
      <div className="absolute top-12 left-10 text-gold opacity-[0.03] rotate-12 pointer-events-none">
        <Quote className="w-96 h-96" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">{t('testimonials.category')}</p>
          <h2 className="text-3xl sm:text-4xl font-space font-bold text-white tracking-tight leading-tight">
            {t('testimonials.heading')}
          </h2>
          <div className="h-[2px] w-16 bg-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* Master Slider with animations */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeReview && (
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.5 }}
                className="p-8 sm:p-12 rounded-2xl glass-silver border border-white/10 shadow-2xl relative"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  
                  {/* Avatar Left */}
                  <div className="md:col-span-4 flex flex-col items-center text-center">
                    <div className="relative h-24 w-24 mb-4 rounded-full p-1 border border-gold/45 bg-luxury-black flex items-center justify-center">
                      <div className="h-full w-full rounded-full bg-luxury-black border border-white/5 flex items-center justify-center text-gray-400">
                        <User className="w-10 h-10 text-gold/50" />
                      </div>
                      <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-gold border border-luxury-black flex items-center justify-center">
                        <Star className="w-3 h-3 fill-luxury-black text-luxury-black" />
                      </div>
                    </div>

                    <h3 className="text-lg font-space font-semibold text-white truncate max-w-full">
                      {activeReview.name}
                    </h3>
                    
                    <p className="text-[#a1a1aa] text-xs font-light tracking-wide mt-1">
                      {activeReview.role}
                    </p>

                    <span className="mt-3 inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-mono font-medium bg-gold/10 text-gold-light border border-gold/15 uppercase">
                      {activeReview.tripType}
                    </span>
                  </div>

                  {/* Review Right */}
                  <div className="md:col-span-8 space-y-4">
                    {/* Rating Stars */}
                    <div className="flex space-x-1 justify-center md:justify-start">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4 fill-gold text-gold"
                        />
                      ))}
                    </div>

                    {/* Description Review */}
                    <blockquote className="text-gray-200 text-sm sm:text-base font-light leading-relaxed italic text-center md:text-left">
                      "{activeReview.review}"
                    </blockquote>

                    {/* Route verification tag */}
                    <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                      <span className="text-[11px] font-mono text-gray-500 uppercase tracking-widest flex items-center">
                        <CheckCircle className="w-3.5 h-3.5 text-green-500 mr-1.5 animate-pulse" /> {language === 'ta' ? 'சரிபார்க்கப்பட்ட பயண வாடிக்கையாளர்' : 'Verified Booking Journey'}
                      </span>
                      <span className="text-xs text-gold-light font-medium truncate max-w-full font-space">
                        {activeReview.verifiedRoute}
                      </span>
                    </div>

                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls buttons */}
          <div className="flex justify-center space-x-3 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 border border-white/10 hover:border-gold/30 rounded-full bg-luxury-black/95 text-gray-400 hover:text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {/* Visual pager indicator */}
            <div className="flex items-center space-x-1.5 px-3">
              {translatedTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? 'w-5 bg-gold' : 'w-1.5 bg-gray-600'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 border border-white/10 hover:border-gold/30 rounded-full bg-luxury-black/95 text-gray-400 hover:text-white transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
