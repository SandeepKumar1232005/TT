"use client";

import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Compass, Clock, Car } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface DestinationsProps {
  onDestinationSelect: (destName: string) => void;
}

export default function Destinations({ onDestinationSelect }: DestinationsProps) {
  const { t, translatedDestinations, language } = useLanguage();

  return (
    <section id="destinations" className="py-24 bg-luxury-black relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">{t('destinations.category')}</p>
          <h2 className="text-3xl sm:text-4xl font-space font-bold text-white tracking-tight leading-tight">
            {t('destinations.heading')}
          </h2>
          <p className="text-gray-400 font-light mt-3 text-sm sm:text-base leading-relaxed">
            {t('destinations.description')}
          </p>
          <div className="h-[2px] w-16 bg-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* Scenic Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {translatedDestinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => onDestinationSelect(dest.name)}
              className="group relative h-96 rounded-2xl overflow-hidden border border-white/5 hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/5 transition-all duration-500 ease-out cursor-pointer"
            >
              {/* Image with zoom on hover */}
              <div className="absolute inset-0 z-0">
                <img
                  src={dest.image}
                  alt={dest.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                />
                {/* Visual shade overlays simulating dusky travel */}
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/60 to-transparent transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gold/15 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Card Contents */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                {/* Top corner elements */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-1 bg-luxury-black/80 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur">
                    <Compass className="w-3.5 h-3.5 text-gold" />
                    <span className="text-[10px] font-mono text-gray-300 font-medium tracking-wide">
                      {dest.distanceFromBase > 0 
                        ? (language === 'ta' ? `~${dest.distanceFromBase} கி.மீ` : `~${dest.distanceFromBase} km`)
                        : (language === 'ta' ? 'முதன்மை மையம்' : 'Focal Hub')
                      }
                    </span>
                  </div>
                  
                  {/* Floating Action Circle */}
                  <div className="h-9 w-9 rounded-full bg-gold hover:bg-gold-light text-luxury-black flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom details */}
                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gold font-bold">
                    {dest.tagline}
                  </span>
                  
                  <h3 className="text-2xl font-space font-semibold text-white tracking-wide">
                    {dest.name}
                  </h3>
                  
                  <p className="text-gray-300 text-xs font-light leading-relaxed opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500">
                    {dest.description}
                  </p>

                  {/* Travel time + vehicle types info */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {dest.estimatedTravelTime && (
                      <span className="flex items-center space-x-1 text-[9px] bg-gold/10 border border-gold/20 px-2.5 py-1 rounded text-gold-light font-mono font-semibold">
                        <Clock className="w-3 h-3" />
                        <span>{dest.estimatedTravelTime}</span>
                      </span>
                    )}
                    {dest.availableVehicleTypes && dest.availableVehicleTypes.length > 0 && (
                      <span className="flex items-center space-x-1 text-[9px] bg-white/5 border border-white/10 px-2.5 py-1 rounded text-gray-400 font-mono">
                        <Car className="w-3 h-3" />
                        <span>{dest.availableVehicleTypes.slice(0, 3).join(', ')}</span>
                      </span>
                    )}
                  </div>

                  {/* Highlights attractions chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {dest.popularAttractions.slice(0, 2).map((spot, i) => (
                      <span 
                        key={i} 
                        className="text-[9px] bg-white/5 border border-white/5 px-2.5 py-1 rounded text-gray-400 group-hover:text-gold-light transition-colors"
                      >
                        {spot}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
