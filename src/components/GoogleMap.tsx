"use client";

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { BUSINESS } from '../lib/constants';

export default function GoogleMap() {
  const { language } = useLanguage();

  return (
    <section id="location" className="py-24 bg-luxury-dark/50 relative z-10 border-t border-white/5">
      {/* Subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2 font-mono">
            {language === 'ta' ? 'எங்கள் இருப்பிடம்' : 'OUR LOCATION'}
          </p>
          <h2 className="text-3xl sm:text-4xl font-space font-bold text-white tracking-tight">
            {language === 'ta' ? 'எங்களை சந்திக்கவும்' : 'Visit Our Office'}
          </h2>
          <p className="text-gray-400 font-light mt-3 text-sm sm:text-base leading-relaxed">
            {language === 'ta'
              ? 'கோயம்புத்தூர் நகரில் அவினாசி ரோடு அருகில் எங்கள் அலுவலகம் அமைந்துள்ளது. எப்போது வேண்டுமானாலும் வாருங்கள்.'
              : 'Our office is located on Avinashi Road in Coimbatore. Feel free to visit us or reach out anytime.'}
          </p>
          <div className="h-[2px] w-16 bg-gold mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Map iframe */}
          <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl h-[400px] lg:h-[480px] relative group">
            <iframe
              src={BUSINESS.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.95) contrast(0.9)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={language === 'ta' ? 'வேதன் டிராவல்ஸ் இருப்பிடம்' : 'Vedan Travels Location'}
              className="w-full h-full"
            />
            {/* Overlay gradient at the edges */}
            <div className="absolute inset-0 border border-gold/10 rounded-2xl pointer-events-none" />
          </div>

          {/* Contact Info Card */}
          <div className="lg:col-span-4 flex flex-col gap-5">

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-2xl bg-luxury-black/90 border border-white/5 space-y-4"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-gold/10 border border-gold/20">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="text-sm font-space font-semibold text-white mb-1">
                    {language === 'ta' ? 'அலுவலக முகவரி' : 'Office Address'}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {language === 'ta' ? BUSINESS.address.ta : BUSINESS.address.en}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-2xl bg-luxury-black/90 border border-white/5 space-y-4"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-gold/10 border border-gold/20">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="text-sm font-space font-semibold text-white mb-1">
                    {language === 'ta' ? 'தொலைபேசி' : 'Phone Number'}
                  </h4>
                  <a href={`tel:${BUSINESS.phone}`} className="text-xs text-gray-400 hover:text-gold transition-colors font-mono">
                    {BUSINESS.phoneDisplay}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-2xl bg-luxury-black/90 border border-white/5 space-y-4"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-gold/10 border border-gold/20">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="text-sm font-space font-semibold text-white mb-1">
                    {language === 'ta' ? 'மின்னஞ்சல்' : 'Email'}
                  </h4>
                  <a href={`mailto:${BUSINESS.email}`} className="text-xs text-gray-400 hover:text-gold transition-colors">
                    {BUSINESS.email}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Working Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 rounded-2xl bg-luxury-black/90 border border-white/5 space-y-4"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-gold/10 border border-gold/20">
                  <Clock className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="text-sm font-space font-semibold text-white mb-1">
                    {language === 'ta' ? 'வேலை நேரம்' : 'Working Hours'}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {language === 'ta' ? '24 மணி நேரமும் 7 நாட்களும் — எப்போதும் உங்கள் சேவையில்' : '24/7 — Always available for your travel needs'}
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
