"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Compass, CheckCircle2, ShieldCheck, PhoneCall, Check, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function DriverPartner() {
  const { t, language } = useLanguage();
  
  // 6 mandatory fields for driver partner network
  const [driverName, setDriverName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('Sedan');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [city, setCity] = useState('');
  const [experience, setExperience] = useState('5');
  
  const [isApplying, setIsApplying] = useState(false);
  const [applicationReference, setApplicationReference] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const perks = [
    {
      icon: <CheckCircle2 className="w-5 h-5 text-gold animate-pulse" />,
      titleKey: 'partner.benefit.1',
      descriptionKey: 'partner.benefit.4'
    },
    {
      icon: <Compass className="w-5 h-5 text-gold" />,
      titleKey: 'partner.benefit.2',
      descriptionKey: 'partner.benefit.5'
    },
    {
      icon: <Award className="w-5 h-5 text-gold" />,
      titleKey: 'partner.benefit.3',
      descriptionKey: 'partner.benefit.6'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-gold" />,
      titleKey: 'trust.safe.title',
      descriptionKey: 'trust.safe.desc'
    }
  ];

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!driverName || !phoneNumber || !vehicleNumber || !city) {
      setErrorMsg(language === 'ta' ? 'அனைத்து விவரங்களையும் நிரப்பவும்.' : 'Please fill out all mandatory fields.');
      return;
    }

    const phoneDigits = phoneNumber.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      setErrorMsg(language === 'ta' ? 'தவறான தொலைபேசி எண். 10 இலக்கங்கள் இருக்க வேண்டும்.' : 'Invalid phone number. Must be exactly 10 digits.');
      return;
    }

    setIsApplying(true);

    try {
      const response = await fetch('/api/driverPartners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          driverName,
          phoneNumber: phoneDigits,
          vehicleType,
          vehicleNumber,
          city,
          experience
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setApplicationReference({
          id: data.driverPartnerId,
          name: data.data.driverName,
          phone: data.data.phoneNumber,
          city: data.data.city,
          vehicle: data.data.vehicleType,
          vehicleNo: data.data.vehicleNumber,
          experience: data.data.experience,
          dateApplied: new Date(data.data.createdAt).toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        });
      } else {
        setErrorMsg(data.message || (language === 'ta' ? 'விண்ணப்பம் தோல்வியடைந்தது.' : 'Application failed. Please try again.'));
      }
    } catch (err: any) {
      console.error('Driver partner submission error:', err);
      setErrorMsg(language === 'ta' ? 'இணைப்பு பிழை.' : 'Network error. Please check your internet connection.');
    } finally {
      setIsApplying(false);
    }
  };

  const handleReset = () => {
    setDriverName('');
    setPhoneNumber('');
    setVehicleNumber('');
    setCity('');
    setApplicationReference(null);
  };

  return (
    <section id="partner" className="py-24 bg-luxury-dark/90 relative z-10 border-t border-b border-gold/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2 font-mono">{t('partner.category')}</p>
            <h2 className="text-3xl sm:text-4xl font-space font-bold text-white tracking-tight leading-tight">
              {t('partner.heading')}
            </h2>
          </div>
          <p className="text-gray-400 font-light text-sm max-w-sm mt-4 md:mt-0 leading-relaxed md:text-right">
            {t('partner.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Perks list - left */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {perks.map((perp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 rounded-2xl bg-luxury-black/95 border border-white/5 hover:border-gold/20 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="mb-4 h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                  {perp.icon}
                </div>
                <div>
                  <h3 className="text-base font-space font-semibold text-white tracking-wide mb-2">
                    {t(perp.titleKey)}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
                    {t(perp.descriptionKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Interactive registration Form - right */}
          <div className="lg:col-span-6 bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl flex flex-col justify-between shadow-2xl relative overflow-hidden">
            
            {/* Soft glowing gold backup light */}
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-gold/15 rounded-full blur-2xl pointer-events-none" />

            <AnimatePresence mode="wait">
              {!applicationReference ? (
                <motion.form
                  key="apply-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleApply}
                  className="space-y-5"
                >
                  <div>
                    <h3 className="text-xl font-space font-semibold text-white mb-1.5">
                      {t('partner.form.title')}
                    </h3>
                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                      {t('partner.description')}
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-xs flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* 1. Driver Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono uppercase tracking-wider text-gold">{t('partner.form.name')}</label>
                    <input
                      type="text"
                      required
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                      placeholder={t('partner.form.name.placeholder')}
                      className="w-full bg-luxury-gray/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-gold/60 placeholder-gray-600 transition-all"
                    />
                  </div>

                  {/* 2. Phone Number & 3. Years of Experience */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono uppercase tracking-wider text-gold">{t('partner.form.phone')}</label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder={t('partner.form.phone.placeholder')}
                        className="w-full bg-luxury-gray/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-gold/60 placeholder-gray-600 transition-all font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono uppercase tracking-wider text-gold">{t('partner.form.experience')}</label>
                      <select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-full bg-luxury-gray/40 border border-white/10 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-gold/60"
                      >
                        <option value="3" className="bg-luxury-black text-white">{language === 'ta' ? '3+ ஆண்டுகள்' : '3+ Years'}</option>
                        <option value="5" className="bg-luxury-black text-white">{language === 'ta' ? '5+ ஆண்டுகள்' : '5+ Years'}</option>
                        <option value="8" className="bg-luxury-black text-white">{language === 'ta' ? '8+ ஆண்டுகள்' : '8+ Years'}</option>
                        <option value="12" className="bg-luxury-black text-white">{language === 'ta' ? '12+ ஆண்டுகள்' : '12+ Years'}</option>
                      </select>
                    </div>
                  </div>

                  {/* 4. Vehicle Type Selection & 5. Vehicle Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono uppercase tracking-wider text-gold">{t('partner.form.vehicleType')}</label>
                      <select
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        className="w-full bg-luxury-gray/40 border border-white/10 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-gold/60"
                      >
                        <option value="Sedan" className="bg-luxury-black text-white">{language === 'ta' ? 'செடான் (Sedan)' : 'Sedan'}</option>
                        <option value="SUV" className="bg-luxury-black text-white">{language === 'ta' ? 'எஸ்யுவி / இன்னோவா' : 'SUV / Innova'}</option>
                        <option value="Tempo Traveller" className="bg-luxury-black text-white">{language === 'ta' ? 'டெம்போ டிராவலர்' : 'Tempo Traveller'}</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono uppercase tracking-wider text-gold">{t('partner.form.vehicleNo')}</label>
                      <input
                        type="text"
                        required
                        value={vehicleNumber}
                        onChange={(e) => setVehicleNumber(e.target.value)}
                        placeholder={t('partner.form.vehicleNo.placeholder')}
                        className="w-full bg-luxury-gray/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-gold/60 placeholder-gray-600 transition-all font-mono uppercase"
                      />
                    </div>
                  </div>

                  {/* 6. City / Hub Location */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono uppercase tracking-wider text-gold">{t('partner.form.city')}</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder={t('partner.form.city.placeholder')}
                      className="w-full bg-luxury-gray/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-gold/60 placeholder-gray-600 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isApplying}
                    className="w-full py-3.5 bg-gradient-to-r from-gold-dark to-gold text-luxury-black font-space font-bold text-xs tracking-wider uppercase rounded-xl transition-all hover:scale-[1.01] hover:shadow-lg hover:shadow-gold/25 flex items-center justify-center cursor-pointer disabled:opacity-55 active:scale-95 duration-150"
                  >
                    {isApplying ? (
                      <span className="flex items-center space-x-2">
                        <div className="h-3 w-3 border-2 border-luxury-black border-t-transparent rounded-full animate-spin" />
                        <span>{t('partner.form.submitting')}</span>
                      </span>
                    ) : (
                      <span>{t('partner.form.btn')}</span>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="apply-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-center py-6"
                >
                  <div className="border border-gold/40 h-56 p-6 rounded-xl bg-gradient-to-b from-gold/5 to-transparent relative flex flex-col justify-between text-left mx-auto shadow-inner">
                    <div className="flex justify-between items-start border-b border-white/5 pb-3">
                      <div>
                        <p className="text-[10px] font-space font-bold tracking-widest text-gold uppercase">VEDAN TRAVELS</p>
                        <p className="text-[8px] font-mono text-gray-500">COIMBATORE DISPATCH NETWORK</p>
                      </div>
                      <span className="text-[8px] border border-gold/30 bg-gold/15 px-1.5 py-0.5 rounded text-gold font-mono font-bold uppercase animate-pulse">
                        {language === 'ta' ? 'சரிபார்ப்பு நிலை' : 'PROVISIONAL'}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[9px] font-mono uppercase text-gray-500">Applicant Credentials</p>
                      <h4 className="text-base font-space font-bold text-white tracking-wide truncate">{applicationReference.name}</h4>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-gray-400">
                        <span>Hub: <strong className="text-white font-medium">{applicationReference.city}</strong></span>
                        <span>Vehicle Class: <strong className="text-white font-medium">{applicationReference.vehicle}</strong></span>
                        <span>Number: <strong className="text-white font-medium uppercase">{applicationReference.vehicleNo}</strong></span>
                        <span>Experience: <strong className="text-white font-medium">{applicationReference.experience}+ Yers</strong></span>
                      </div>
                    </div>

                    <div className="flex justify-between items-end border-t border-white/5 pt-3">
                      <div>
                        <p className="text-[7px] font-mono text-gray-500">VERIFICATION REF CODE</p>
                        <p className="text-xs font-mono text-gold font-semibold">{applicationReference.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[7px] font-mono text-gray-500">FILING DATE</p>
                        <p className="text-[9px] font-mono text-white">{applicationReference.dateApplied}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-space font-bold text-gold-light">{t('partner.form.success.msg')}</h3>
                    <p className="text-gray-400 text-xs font-light max-w-sm mx-auto leading-relaxed">
                      {t('partner.form.success.submsg')}
                    </p>
                  </div>

                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl text-xs font-medium transition-all"
                  >
                    {t('partner.form.reset')}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
