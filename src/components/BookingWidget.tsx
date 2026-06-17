"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Phone, CheckCircle, MessageSquare, ShieldCheck, User, Sparkles, Send, Heart, AlertTriangle, Briefcase, Snowflake, Fuel, Gauge } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import VehicleImage from './VehicleImage';
import { BUSINESS } from '../lib/constants';

interface BookingWidgetProps {
  preselectedVehicleId?: string;
  selectedServiceName?: string;
  onBookingSuccess: (bookingInstance: any) => void;
}

export default function BookingWidget({ preselectedVehicleId, selectedServiceName, onBookingSuccess }: BookingWidgetProps) {
  const { t, translatedVehicles, language } = useLanguage();

  // Input fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [selectedVehicleId, setSelectedVehicleId] = useState(translatedVehicles[0].id);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Synchronize external vehicles selections
  useEffect(() => {
    if (preselectedVehicleId) {
      setSelectedVehicleId(preselectedVehicleId);
    }
  }, [preselectedVehicleId]);

  // Synchronize services selection
  useEffect(() => {
    if (selectedServiceName) {
      if (selectedServiceName.toLowerCase().includes('airport')) {
        setPickup(language === 'ta' ? 'கோயம்புத்தூர் சர்வதேச விமான நிலையம் (CJB)' : 'Coimbatore International Airport (CJB)');
        setDestination(language === 'ta' ? 'காந்திபுரம், கோயம்புத்தூர்' : 'Gandhipuram, Coimbatore');
      } else {
        setPickup(language === 'ta' ? 'கோயம்புத்தூர் நகரம்' : 'Coimbatore Town');
        setDestination(selectedServiceName);
      }
    }
  }, [selectedServiceName, language]);

  const activeVehicle = translatedVehicles.find((v) => v.id === selectedVehicleId) || translatedVehicles[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name || !phone || !pickup || !destination || !date) {
      setErrorMsg(language === 'ta' ? 'முன்பதிவு செய்ய தேவையான அனைத்து விவரங்களையும் நிரப்பவும்.' : 'Please fill out all mandatory fields to send your traveler inquiry.');
      return;
    }

    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      setErrorMsg(language === 'ta' ? 'தவறான தொலைபேசி எண். 10 இலக்கங்கள் இருக்க வேண்டும்.' : 'Invalid phone number. Must be exactly 10 digits.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone: phoneDigits,
          pickup,
          destination,
          date,
          time,
          passengers: Number(passengers),
          specialRequirements,
          selectedVehicleId
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const bookingRecord = {
          id: data.bookingId,
          name: data.data.name,
          pickup: data.data.pickupLocation,
          destination: data.data.destination,
          date: data.data.travelDate,
          whatsappUrl: data.whatsappUrl
        };
        setConfirmedBooking(bookingRecord);
        onBookingSuccess(bookingRecord);

        // Direct redirect to WhatsApp to bypass popup blockers in async handlers
        if (data.whatsappUrl) {
          window.location.href = data.whatsappUrl;
        }
      } else {
        setErrorMsg(data.message || (language === 'ta' ? 'முன்பதிவு தோல்வியடைந்தது.' : 'Booking failed. Please try again.'));
      }
    } catch (err: any) {
      console.error('Booking submission error:', err);
      setErrorMsg(language === 'ta' ? 'இணைப்பு பிழை.' : 'Network error. Please check your internet connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setPickup('');
    setDestination('');
    setSpecialRequirements('');
    setDate('');
    setTime('');
    setConfirmedBooking(null);
  };

  return (
    <section id="booking" className="py-24 bg-luxury-dark/95 relative z-10 border-t border-b border-gold/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">{t('booking.tagline')}</p>
          <h2 className="text-3xl sm:text-4xl font-space font-bold text-white tracking-tight">
            {t('booking.heading')}
          </h2>
          <p className="text-gray-400 font-light mt-3 text-sm sm:text-base leading-relaxed">
            {t('booking.description')}
          </p>
          <div className="h-[2px] w-16 bg-gold mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Booking inputs Form */}
          <div className="lg:col-span-7 bg-luxury-black/95 border border-white/5 p-8 rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!confirmedBooking ? (
                <motion.form 
                  key="form-entry"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 gap-2">
                    <h3 className="text-xl font-space font-semibold text-white">
                      {t('booking.form.title')}
                    </h3>
                    <span className="text-xs font-mono text-gold-light bg-gold/5 border border-gold/10 px-2.5 py-1 rounded-full">
                      {language === 'ta' ? '* இப்போது முன்பணம் செலுத்த வேண்டியதில்லை' : '* No Advance Payment Required Now'}
                    </span>
                  </div>

                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-xs flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Personal Contact */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="block text-xs font-mono uppercase tracking-wider text-gold mb-2 flex items-center">
                        <User className="w-3.5 h-3.5 mr-1 text-gold" /> {t('booking.form.name')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('booking.form.name.holder')}
                        className="w-full bg-luxury-gray/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/60 placeholder-gray-600 transition-colors"
                      />
                    </div>

                    <div className="relative">
                      <label className="block text-xs font-mono uppercase tracking-wider text-gold mb-2 flex items-center">
                        <Phone className="w-3.5 h-3.5 mr-1 text-gold" /> {t('booking.form.phone')}
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t('booking.form.phone.holder')}
                        className="w-full bg-luxury-gray/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/60 placeholder-gray-600 transition-colors font-mono"
                      />
                    </div>
                  </div>

                  {/* Pick & Drop */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="block text-xs font-mono uppercase tracking-wider text-gold mb-2 flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-gold" /> {t('booking.form.pickup')}
                      </label>
                      <input
                        type="text"
                        required
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        placeholder={t('booking.form.pickup.holder')}
                        className="w-full bg-luxury-gray/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/60 placeholder-gray-600 transition-colors"
                      />
                    </div>

                    <div className="relative">
                      <label className="block text-xs font-mono uppercase tracking-wider text-gold mb-2 flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-gold" /> {t('booking.form.dest')}
                      </label>
                      <input
                        type="text"
                        required
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder={t('booking.form.dest.holder')}
                        className="w-full bg-luxury-gray/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/60 placeholder-gray-600 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Date, Time & Passengers count */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-gold mb-2 flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-gold" /> {t('booking.form.date')}
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-luxury-gray/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/60 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-gold mb-2 flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1 text-gold" /> {language === 'ta' ? 'பயண நேரம்' : 'Travel Time'}
                      </label>
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-luxury-gray/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/60 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-gold mb-2 flex items-center">
                        <Users className="w-3.5 h-3.5 mr-1 text-gold" /> {t('booking.form.passengers')} *
                      </label>
                      <select
                        value={passengers}
                        onChange={(e) => setPassengers(Number(e.target.value))}
                        className="w-full bg-luxury-gray/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/60 transition-colors"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((num) => (
                          <option key={num} value={num} className="bg-luxury-black text-white">
                            {num} {num === 1 ? (language === 'ta' ? 'நபர்' : 'Passenger') : (language === 'ta' ? 'நபர்கள்' : 'Passengers')}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Choose Fleet and Special Requirements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-gold mb-2 flex items-center">
                        <Sparkles className="w-3.5 h-3.5 mr-1 text-gold" /> {t('booking.form.preferredVehicle')}
                      </label>
                      <select
                        value={selectedVehicleId}
                        onChange={(e) => setSelectedVehicleId(e.target.value)}
                        className="w-full bg-luxury-gray/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-gold focus:outline-none focus:border-gold/60 transition-colors font-medium font-space"
                      >
                        {translatedVehicles.map((vehicle) => (
                          <option key={vehicle.id} value={vehicle.id} className="bg-luxury-black text-white">
                            {vehicle.name} ({vehicle.category})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-gold mb-2 flex items-center">
                        <MessageSquare className="w-3.5 h-3.5 mr-1 text-gold" /> {t('booking.form.specialRequirements')}
                      </label>
                      <input
                        type="text"
                        value={specialRequirements}
                        onChange={(e) => setSpecialRequirements(e.target.value)}
                        placeholder={t('booking.form.specialRequirements.placeholder')}
                        className="w-full bg-luxury-gray/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/60 placeholder-gray-600 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-space font-bold text-sm tracking-widest uppercase bg-gradient-to-r from-gold-dark via-gold to-gold-light text-luxury-black hover:scale-[1.01] hover:shadow-lg hover:shadow-gold/20 transition-transform flex items-center justify-center cursor-pointer disabled:opacity-55 active:scale-95 duration-100"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center space-x-2">
                        <div className="h-4 w-4 border-2 border-luxury-black border-t-transparent rounded-full animate-spin" />
                        <span>{t('booking.form.submitting')}</span>
                      </span>
                    ) : (
                      <span>{t('booking.form.btn')}</span>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="form-confirmed"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-center py-8"
                >
                  <div className="h-16 w-16 bg-gold/10 border border-gold/40 text-gold rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-2xl font-space font-bold text-white uppercase tracking-wider">
                    {t('booking.success.title')}
                  </h3>
                  
                  <p className="text-gray-300 max-w-sm mx-auto text-xs sm:text-sm font-light leading-relaxed">
                    {t('booking.success.p1')}
                  </p>

                  <div className="p-6 rounded-xl bg-gold/5 border border-gold/10 text-left max-w-md mx-auto space-y-3">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{language === 'ta' ? 'முன்பதிவு குறிப்பு எண்' : 'Inquiry Ref ID'}</span>
                      <span className="font-mono text-white font-semibold">{confirmedBooking.id}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{language === 'ta' ? 'பயணி பெயர்' : 'Traveler Name'}</span>
                      <span className="text-white font-semibold">{confirmedBooking.name}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{t('booking.success.from')}</span>
                      <span className="text-white truncate max-w-[200px]">{confirmedBooking.pickup}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{t('booking.success.to')}</span>
                      <span className="text-white truncate max-w-[200px]">{confirmedBooking.destination}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{language === 'ta' ? 'தேதி' : 'Date'}</span>
                      <span className="text-white">{confirmedBooking.date}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-4">
                    <a
                      href={confirmedBooking.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 border border-green-500/30 bg-green-500/10 hover:bg-green-500/20 text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
                    >
                      <Send className="w-4 h-4 text-green-500 shrink-0" />
                      <span>{language === 'ta' ? 'வாட்ஸ்அப்பில் அனுப்பவும்' : 'Message on WhatsApp'}</span>
                    </a>

                    <button
                      onClick={handleReset}
                      className="w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {t('booking.success.reset')}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Premium Vehicle Specifications Showcase */}
          <div className="lg:col-span-5 bg-gradient-to-b from-luxury-gray/40 to-luxury-black/95 border border-white/5 p-8 rounded-2xl flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Sparkles className="w-40 h-40 text-gold" />
            </div>

            <div className="space-y-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-gold uppercase tracking-wider block mb-1">
                  {language === 'ta' ? 'தேர்ந்தெடுக்கப்பட்ட கேபின் விவரக்குறிப்புகள்' : 'SELECTED CABIN SPECIFICATIONS'}
                </span>
                <h3 className="text-xl font-space font-bold text-white mb-2">
                  {activeVehicle.name}
                </h3>
                <span className="inline-block text-[10px] font-mono text-luxury-black bg-gold px-2.5 py-1 rounded font-bold uppercase tracking-widest mb-4">
                  {activeVehicle.category}
                </span>
                <p className="text-xs text-gray-400 font-light leading-relaxed mb-4">
                  {activeVehicle.comfortLevel}
                </p>
                <div className="h-[1px] w-full bg-white/10 my-4" />
                
                {/* Large Premium Image Showcase */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/10 bg-luxury-dark mb-6">
                  <VehicleImage
                    vehicleId={activeVehicle.id}
                    vehicleName={activeVehicle.name}
                    imageUrl={activeVehicle.image}
                    category={activeVehicle.category}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Core Technical Specifications Grid */}
                <h4 className="text-xs font-mono uppercase tracking-wider text-gold mb-3">
                  {language === 'ta' ? 'இயந்திர & தொழில்நுட்ப விவரங்கள்' : 'Technical Specifications'}
                </h4>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center space-x-3">
                    <Users className="w-4 h-4 text-gold shrink-0" />
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-mono">{language === 'ta' ? 'இருக்கைகள்' : 'Capacity'}</p>
                      <p className="text-xs text-white font-semibold">{activeVehicle.maxPassengers} {language === 'ta' ? 'நபர்கள்' : 'Seats'}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center space-x-3">
                    <Briefcase className="w-4 h-4 text-gold shrink-0" />
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-mono">{language === 'ta' ? 'லக்கேஜ்' : 'Luggage'}</p>
                      <p className="text-xs text-white font-semibold">{activeVehicle.maxLuggage} {language === 'ta' ? 'பைகள்' : 'Bags'}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center space-x-3">
                    <Gauge className="w-4 h-4 text-gold shrink-0" />
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-mono">{language === 'ta' ? 'கியர்' : 'Transmission'}</p>
                      <p className="text-xs text-white font-semibold truncate max-w-[100px]">{activeVehicle.specs.transmission}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center space-x-3">
                    <Fuel className="w-4 h-4 text-gold shrink-0" />
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-mono">{language === 'ta' ? 'எரிபொருள்' : 'Fuel'}</p>
                      <p className="text-xs text-white font-semibold">{activeVehicle.specs.fuel}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center space-x-3 col-span-2">
                    <Snowflake className="w-4 h-4 text-gold shrink-0" />
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-mono">{language === 'ta' ? 'காற்றுச்சீரமைப்பி' : 'Climate System'}</p>
                      <p className="text-xs text-white font-semibold">{language === 'ta' ? 'முழுமையாக காற்றுச்சீரமைக்கப்பட்டது (AC)' : 'Fully Air Conditioned (AC)'}</p>
                    </div>
                  </div>
                </div>

                {/* Included Perquisites */}
                <h4 className="text-xs font-mono uppercase tracking-wider text-gold mb-3">
                  {language === 'ta' ? 'உள்ளடக்கிய சொகுசு வசதிகள்' : 'Passenger Comforts'}
                </h4>
                <div className="grid grid-cols-2 gap-2.5">
                  {activeVehicle.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-gray-300">
                      <CheckCircle className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span className="truncate">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>


        </div>

      </div>
    </section>
  );
}
