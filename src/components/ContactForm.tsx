"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, User, CheckCircle, Send, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function ContactForm() {
  const { t, language } = useLanguage();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Client-side quick checks
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setErrorMsg(language === 'ta' ? 'அனைத்து விவரங்களையும் நிரப்பவும்.' : 'Please fill out all fields.');
      return;
    }

    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      setErrorMsg(language === 'ta' ? 'தவறான தொலைபேசி எண். 10 இலக்கங்கள் இருக்க வேண்டும்.' : 'Invalid phone number. Must be exactly 10 digits.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phoneDigits,
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessData({
          id: data.contactId,
          name: name.trim(),
        });
      } else {
        setErrorMsg(data.message || (language === 'ta' ? 'பிழை ஏற்பட்டது.' : 'Something went wrong. Please try again.'));
      }
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setErrorMsg(language === 'ta' ? 'இணைப்பு பிழை.' : 'Network error. Please check your internet connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setMessage('');
    setSuccessData(null);
    setErrorMsg(null);
  };

  return (
    <section id="contact" className="py-24 bg-luxury-black relative z-10 border-t border-white/5">
      {/* Glow background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Description */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2 font-mono">
            {t('contact.category')}
          </p>
          <h2 className="text-3xl sm:text-4xl font-space font-bold text-white tracking-tight">
            {t('contact.heading')}
          </h2>
          <p className="text-gray-400 font-light mt-3 text-sm sm:text-base leading-relaxed">
            {t('contact.description')}
          </p>
          <div className="h-[2px] w-16 bg-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* Contact Form Container */}
        <div className="bg-luxury-dark/95 border border-white/5 p-8 rounded-2xl shadow-xl max-w-2xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
            <Mail className="w-48 h-48 text-gold" />
          </div>

          <AnimatePresence mode="wait">
            {!successData ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <h3 className="text-xl font-space font-semibold text-white border-b border-white/5 pb-4">
                  {t('contact.form.title')}
                </h3>

                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-xs flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Name field */}
                <div className="relative">
                  <label className="block text-xs font-mono uppercase tracking-wider text-gold mb-2 flex items-center">
                    <User className="w-3.5 h-3.5 mr-1 text-gold" /> {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('contact.form.name.placeholder')}
                    className="w-full bg-luxury-gray/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/60 placeholder-gray-600 transition-colors"
                  />
                </div>

                {/* Phone field */}
                <div className="relative">
                  <label className="block text-xs font-mono uppercase tracking-wider text-gold mb-2 flex items-center">
                    <Phone className="w-3.5 h-3.5 mr-1 text-gold" /> {t('contact.form.phone')}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t('contact.form.phone.placeholder')}
                    className="w-full bg-luxury-gray/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/60 placeholder-gray-600 transition-colors font-mono"
                  />
                </div>

                {/* Message field */}
                <div className="relative">
                  <label className="block text-xs font-mono uppercase tracking-wider text-gold mb-2 flex items-center">
                    <Mail className="w-3.5 h-3.5 mr-1 text-gold" /> {t('contact.form.message')}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('contact.form.message.placeholder')}
                    className="w-full bg-luxury-gray/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/60 placeholder-gray-600 transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-space font-bold text-sm tracking-widest uppercase bg-gradient-to-r from-gold-dark via-gold to-gold-light text-luxury-black hover:scale-[1.01] hover:shadow-lg hover:shadow-gold/20 transition-all flex items-center justify-center cursor-pointer disabled:opacity-55 active:scale-95 duration-100"
                >
                  {isSubmitting ? (
                    <span className="flex items-center space-x-2">
                      <div className="h-4 w-4 border-2 border-luxury-black border-t-transparent rounded-full animate-spin" />
                      <span>{t('contact.form.submitting')}</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1.5">
                      <Send className="w-3.5 h-3.5" />
                      <span>{t('contact.form.btn')}</span>
                    </span>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="contact-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 text-center py-8"
              >
                <div className="h-16 w-16 bg-gold/10 border border-gold/40 text-gold rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-space font-bold text-white uppercase tracking-wider">
                  {t('contact.success.title')}
                </h3>

                <p className="text-gray-300 max-w-sm mx-auto text-xs sm:text-sm font-light leading-relaxed">
                  {t('contact.success.subtitle')}
                </p>

                <div className="p-4 rounded-xl bg-gold/5 border border-gold/10 text-left max-w-xs mx-auto text-xs space-y-2">
                  <div className="flex justify-between text-gray-400">
                    <span>Reference ID</span>
                    <span className="font-mono text-white font-semibold">{successData.id}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Sender Name</span>
                    <span className="text-white font-semibold">{successData.name}</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  {t('contact.success.reset')}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
