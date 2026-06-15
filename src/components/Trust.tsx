import React from 'react';
import { UserCheck, Shield, PhoneCall, Star, ClipboardCheck, Network, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';

export default function Trust() {
  const { t } = useLanguage();

  const points = [
    {
      icon: <UserCheck className="w-6 h-6 text-gold" />,
      titleKey: 'trust.drivers.title',
      descKey: 'trust.drivers.desc'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-gold" />,
      titleKey: 'trust.clean.title',
      descKey: 'trust.clean.desc'
    },
    {
      icon: <Shield className="w-6 h-6 text-gold" />,
      titleKey: 'trust.safe.title',
      descKey: 'trust.safe.desc'
    },
    {
      icon: <PhoneCall className="w-6 h-6 text-gold" />,
      titleKey: 'trust.support.title',
      descKey: 'trust.support.desc'
    },
    {
      icon: <ClipboardCheck className="w-6 h-6 text-gold" />,
      titleKey: 'trust.price.title',
      descKey: 'trust.price.desc'
    },
    {
      icon: <Network className="w-6 h-6 text-gold" />,
      titleKey: 'trust.comfort.title',
      descKey: 'trust.comfort.desc'
    }
  ];

  return (
    <section id="trust" className="py-24 bg-luxury-black/95 relative z-10 border-t border-b border-gold/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">{t('trust.category')}</p>
          <h2 className="text-3xl sm:text-4xl font-space font-bold text-white tracking-tight">
            {t('trust.heading')}
          </h2>
          <p className="text-gray-400 font-light mt-3 text-sm sm:text-base leading-relaxed">
            {t('trust.description')}
          </p>
          <div className="h-[2px] w-16 bg-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* Feature Grid with Hover Glow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative group p-6 rounded-2xl bg-gradient-to-b from-luxury-gray/40 to-luxury-black/95 border border-white/5 hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/5 transition-all duration-500 ease-out flex flex-col justify-between"
            >
              {/* Subtle gold backlighting */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gold/5 rounded-bl-full rounded-tr-2xl group-hover:bg-gold/10 transition-colors" />

              <div>
                {/* Icon Container */}
                <div className="mb-5 p-3 rounded-xl bg-white/5 border border-white/10 inline-block group-hover:scale-105 group-hover:border-gold/40 transition-all">
                  {point.icon}
                </div>

                <h3 className="text-lg font-space font-semibold text-white tracking-wide mb-2.5 group-hover:text-gold-light transition-colors">
                  {t(point.titleKey)}
                </h3>

                <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
                  {t(point.descKey)}
                </p>
              </div>

              {/* Gold marker line */}
              <div className="w-5 h-[1px] bg-gold-dark/25 group-hover:bg-gold transition-colors mt-5" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
