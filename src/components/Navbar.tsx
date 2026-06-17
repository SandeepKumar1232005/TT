"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { BUSINESS } from '../lib/constants';

interface NavbarProps {
  onBookClick: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // offset for the navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      id="vedan-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3 bg-luxury-black/95 border-b border-gold/15 shadow-xl shadow-luxury-black/60 backdrop-blur-md'
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center cursor-pointer group shrink-0"
          >
            <div className="relative">
              <div className="text-2xl font-bold font-space tracking-wider text-white">
                VEDAN <span className="text-gold tracking-tight font-light font-sans ml-1 text-lg">TRAVELS</span>
              </div>
              <div className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-gradient-to-r from-gold via-white to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
            {/* Elegant luxury status dot */}
            <span className="ml-2.5 flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold/50 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8 lg:ml-12">
            {[
              { label: t('nav.home'), id: 'home' },
              { label: t('nav.services'), id: 'services' },
              { label: t('nav.fleet'), id: 'fleet' },
              { label: t('nav.booking'), id: 'booking' },
              { label: t('nav.partner'), id: 'partner' },
              { label: t('nav.reviews'), id: 'reviews' },
              { label: language === 'ta' ? 'தொடர்பு' : 'Contact', id: 'contact' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium tracking-wide text-gray-300 hover:text-gold transition-colors duration-300 relative py-1.5 group cursor-pointer"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </button>
            ))}
          </div>

          {/* Contact & Booking CTA elements + Language Switching Capsule (Features 1 & 3) */}
          <div className="flex items-center space-x-3">
            
            {/* Elegant Language Switcher Capsule */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1 shadow-inner">
              <button
                onClick={() => setLanguage('en')}
                id="lang-btn-en"
                aria-label="Switch to English"
                className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase transition-all tracking-wider font-mono cursor-pointer ${
                  language === 'en'
                    ? 'bg-gold text-luxury-black font-extrabold shadow-md shadow-gold/20'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ta')}
                id="lang-btn-ta"
                aria-label="தமிழில் மாற்றுக"
                className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all tracking-wide font-sans cursor-pointer ${
                  language === 'ta'
                    ? 'bg-gold text-luxury-black font-extrabold shadow-md shadow-gold/20'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                தமிழ்
              </button>
            </div>

            {/* Desktop-only Action Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* WhatsApp Integration */}
              <a
                href={`https://wa.me/${BUSINESS.whatsapp}?text=Hello%20Vedan%20Travels,%20I'm%20interested%20in%20booking%20a%20trip.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 border border-gold/25 hover:border-gold/60 text-gray-200 hover:text-white rounded-full bg-luxury-dark/40 hover:bg-gold/10 transition-all duration-300 text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4 text-green-500 animate-pulse" />
                <span>{t('nav.whatsapp')}</span>
              </a>

              {/* Quick Action Button with premium hover glow effect */}
              <button
                onClick={onBookClick}
                className="relative px-5 py-2.5 overflow-hidden group rounded-full bg-gold hover:bg-gold-light text-luxury-black font-semibold text-sm tracking-wide shadow-lg shadow-gold/15 transition-all duration-300 hover:shadow-gold/30 active:scale-95"
              >
                <span className="relative z-10 flex items-center space-x-1">
                  <span>{t('nav.bookNow')}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white/20 transition-transform duration-500 ease-out" />
              </button>
            </div>

            {/* Mobile Hamburger */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 border border-white/10 hover:border-gold/30 rounded bg-luxury-dark/50 text-gray-300 hover:text-white transition-all cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Drawer menu with glassmorphic slide down effect */}
      <div
        className={`lg:hidden fixed left-0 right-0 bg-luxury-black border-b border-gold/10 shadow-2xl transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'top-[60px] opacity-100 max-h-[420px]' : 'top-[-500px] opacity-0 max-h-0 pointer-events-none'
        }`}
      >
        <div className="px-5 py-6 space-y-4 bg-luxury-dark/95 backdrop-blur-lg">
          {[
            { label: t('nav.home'), id: 'home' },
            { label: t('nav.services'), id: 'services' },
            { label: t('nav.mobile.fleet'), id: 'fleet' },
            { label: t('nav.booking'), id: 'booking' },
            { label: t('nav.mobile.partner'), id: 'partner' },
            { label: t('nav.mobile.reviews'), id: 'reviews' },
            { label: language === 'ta' ? 'தொடர்பு' : 'Contact', id: 'contact' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="block w-full text-left text-base font-medium py-2 text-gray-300 hover:text-gold tracking-wide transition-colors duration-200 border-b border-white/5"
            >
              {item.label}
            </button>
          ))}
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-3">
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}?text=Hello%20Vedan%20Travels,%20I'm%20interested%20in%20booking%20a%20ride.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 px-4 py-2.5 border border-gold/25 rounded-md text-gray-200 bg-luxury-dark/60 hover:bg-gold/10 text-sm font-medium"
            >
              <MessageCircle className="w-4 h-4 text-green-500" />
              <span>{t('nav.whatsapp')}</span>
            </a>
            
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full text-center px-4 py-2.5 bg-gold hover:bg-gold-light text-luxury-black font-semibold rounded-md text-sm shadow shadow-gold/10 transition-colors cursor-pointer"
            >
              {t('nav.mobile.bookNow')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
