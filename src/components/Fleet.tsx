import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { Vehicle } from '../types';
import { Users2, ShieldCheck, Star, Sparkles, Snowflake, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import VehicleImage from './VehicleImage';

interface FleetProps {
  onVehicleSelect: (vehicleId: string) => void;
}

export default function Fleet({ onVehicleSelect }: FleetProps) {
  const { translatedVehicles, t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedSpecVehicleId, setSelectedSpecVehicleId] = useState<string>('toyota-etios');

  const selectedSpecVehicle = translatedVehicles.find(v => v.id === selectedSpecVehicleId) || translatedVehicles[0];

  // Localized Categories for Tamil Nadu travel
  const categoriesLocal = [
    { label: language === 'ta' ? 'அனைத்தும்' : 'All Fleet', value: 'ALL' },
    { label: language === 'ta' ? 'செடான் (Sedan)' : 'Sedan', value: 'Sedan' },
    { label: language === 'ta' ? 'மியூவி / எஸ்யூவி' : 'MUV / Executive SUV', value: 'MUV' },
    { label: language === 'ta' ? 'மினி பஸ் / டிராவலர்' : 'VIP Coach / Mini Bus', value: 'VIP Coach / Mini Bus' },
  ];

  const filteredVehicles = activeCategory === 'ALL' 
    ? translatedVehicles 
    : translatedVehicles.filter(v => {
        if (activeCategory === 'Sedan') {
          return v.id === 'toyota-etios' || v.id === 'swift-dzire' || v.id === 'hyundai-accent';
        }
        if (activeCategory === 'MUV') {
          return v.id === 'toyota-innova' || v.id === 'toyota-innova-crysta' || v.id === 'suv-scorpio-xuv';
        }
        if (activeCategory === 'VIP Coach / Mini Bus') {
          return v.id === 'tempo-traveller';
        }
        return true;
      });

  return (
    <section id="fleet" className="py-24 bg-luxury-black relative z-10 text-white">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-luxury-dark to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">{t('fleet.category')}</p>
          <h2 className="text-3xl sm:text-4xl font-space font-bold tracking-tight">
            {t('fleet.heading')}
          </h2>
          <p className="text-gray-400 font-light mt-3 text-sm sm:text-base leading-relaxed">
            {t('fleet.description')}
          </p>
          <div className="h-[2px] w-16 bg-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* Category Filter Pills */}
        <div className="flex justify-center flex-wrap gap-2 sm:gap-4 mb-12">
          {categoriesLocal.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all duration-300 cursor-pointer ${
                activeCategory === cat.value
                  ? 'bg-gold border-gold text-luxury-black font-bold shadow-lg shadow-gold/20'
                  : 'bg-white/5 border-white/10 hover:border-gold/40 text-gray-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Fleet Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {filteredVehicles.map((vehicle) => (
            <motion.div
              key={vehicle.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              onClick={() => setSelectedSpecVehicleId(vehicle.id)}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-luxury-gray/30 to-luxury-black border cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-gold/5 flex flex-col h-auto md:h-[550px] group ${
                selectedSpecVehicleId === vehicle.id 
                  ? 'border-gold shadow-lg shadow-gold/15'
                  : 'border-white/5 hover:border-gold/30'
              }`}
            >
              {/* Image Container representing 60% of the card height */}
              <div className="relative h-[280px] md:h-[60%] w-full overflow-hidden">
                <VehicleImage
                  vehicleId={vehicle.id}
                  vehicleName={vehicle.name}
                  imageUrl={vehicle.image}
                  category={vehicle.category}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Visual Highlights Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent/40 to-transparent" />
                
                {/* Rating Badge */}
                <div className="absolute top-4 left-4 p-2 rounded-xl bg-luxury-black/95 border border-gold/40 flex items-center space-x-1.5 backdrop-blur-sm shadow-md">
                  <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                  <span className="text-xs font-bold tracking-wider">{vehicle.comfortRating} {language === 'ta' ? 'நட்சத்திர வசதி' : 'Star Comfort'}</span>
                </div>

                {/* Category label */}
                <span className="absolute top-4 right-4 p-2 rounded-lg bg-gold text-luxury-black text-[10px] font-bold tracking-widest uppercase shadow-md">
                  {vehicle.category}
                </span>
              </div>

              {/* Vehicle specifications representing 40% of the card height */}
              <div className="p-6 md:p-8 md:h-[40%] flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-space font-semibold text-white tracking-wide mb-1 flex items-center gap-2">
                    {vehicle.name}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-gold-light font-light mb-4 font-space">
                    {vehicle.comfortLevel}
                  </p>

                  {/* Elegant High-End Spec Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-gray-300 flex items-center gap-1.5">
                      <Users2 className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>{vehicle.maxPassengers} {language === 'ta' ? 'நபர்கள்' : 'Seats'}</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-green-500/10 border border-green-500/20 text-[11px] text-green-400 flex items-center gap-1.5">
                      <Snowflake className="w-3.5 h-3.5 shrink-0 animate-pulse" />
                      <span>{language === 'ta' ? 'டபுள் ஏசி' : 'Double AC'}</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-gold/10 border border-gold/20 text-[11px] text-gold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                      <span>{vehicle.driverTier}</span>
                    </span>
                  </div>
                </div>

                {/* Action Row */}
                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="text-[10px] font-mono text-gray-500">
                    {selectedSpecVehicleId === vehicle.id ? (language === 'ta' ? '✦ வாகனம் தேர்ந்தெடுக்கப்பட்டது' : '✦ Vehicle Selected') : (language === 'ta' ? 'கூடுதல் விவரங்களை பார்க்க தட்டவும்...' : 'Tap for specs...')}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onVehicleSelect(vehicle.id);
                      const bookingSection = document.getElementById('booking');
                      if (bookingSection) {
                        bookingSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="px-4 py-2 rounded-full bg-luxury-dark border border-gold hover:bg-gold hover:text-luxury-black text-gold font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-1 cursor-pointer shadow-md"
                  >
                    <span>{language === 'ta' ? 'இந்த வாகனத்தை முன்பதிவு செய்' : 'Request Trip'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Specifications Bento Panel */}
        <AnimatePresence mode="wait">
          {selectedSpecVehicle && (
            <motion.div
              key={selectedSpecVehicle.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="p-8 rounded-2xl bg-luxury-gray/30 border border-gold/20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Selected Title and Description */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-gold mb-2">{language === 'ta' ? 'வாகன தொழில்நுட்ப கட்டமைப்பு' : 'Configure Specifications'}</h4>
                  <p className="text-2xl font-space font-semibold text-white mb-2">{selectedSpecVehicle.name}</p>
                  <p className="text-gray-400 text-sm font-light mb-4">
                    {language === 'ta' ? 'சிறந்த காலநிலை கட்டுப்பாட்டு அமைப்புகள் (கிளைமேட் கன்ட்ரோல்), அவசர கால முதலுதவி பெட்டிகள் மற்றும் அனுபவம் வாய்ந்த உள்ளூர் ஓட்டுநர்கள் கொண்டது.' : 'Equipped with advanced climate systems, emergency safety kits, and seasoned, high-availability driver operators.'}
                  </p>
                  <span className="inline-flex items-center px-3 py-1 rounded bg-white/10 border border-white/5 text-xs text-white">
                    <ShieldCheck className="w-4 h-4 text-gold mr-1.5" /> {language === 'ta' ? 'தினமும் சுத்தம் செய்யப்பட்டு சரிபார்க்கப்படுகிறது' : 'Checked & Cleaned Daily'}
                  </span>
                </div>

                {/* In-Depth Engine Specs */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-gold mb-4">{language === 'ta' ? 'இயந்திர விவரங்கள்' : 'Mechanical Class'}</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
                      <span className="text-gray-400 font-light">{language === 'ta' ? 'கியர் வசதி' : 'Transmission Type'}</span>
                      <span className="text-white font-medium">{selectedSpecVehicle.specs.transmission}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
                      <span className="text-gray-400 font-light">{language === 'ta' ? 'எரிபொருள் வகை' : 'Fuel Propulsion'}</span>
                      <span className="text-white font-medium">{selectedSpecVehicle.specs.fuel}</span>
                    </div>
                    <div className="flex justify-between pb-2 text-sm">
                      <span className="text-gray-400 font-light">{language === 'ta' ? 'எஞ்சின் வகை' : 'Engine Displacement'}</span>
                      <span className="text-white font-medium">{selectedSpecVehicle.specs.engineClass}</span>
                    </div>
                  </div>
                </div>

                {/* Included Perquisites */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-gold mb-4">{language === 'ta' ? 'உள்ளடக்கிய சொகுசு வசதிகள்' : 'Included Passenger Comforts'}</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedSpecVehicle.features.map((ft, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs text-gray-300">
                        <div className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                        <span>{ft}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
