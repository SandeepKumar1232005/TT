import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { 
  Plane, 
  Navigation, 
  Briefcase, 
  Sparkles, 
  Compass, 
  Users, 
  Heart,
  CheckCircle, 
  ArrowRight 
} from 'lucide-react';

interface ServicesProps {
  onServiceSelect: (serviceName: string) => void;
}

export default function Services({ onServiceSelect }: ServicesProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { translatedServices, t } = useLanguage();

  // Dynamic Lucide icon renderer
  const renderIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6 text-gold group-hover:scale-110 transition-transform duration-500' };
    switch (iconName) {
      case 'PlaneTakeoff':
        return <Plane {...props} />;
      case 'Navigation':
        return <Navigation {...props} />;
      case 'Briefcase':
        return <Briefcase {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'Milestone':
        return <Compass {...props} />;
      case 'Users':
        return <Users {...props} />;
      case 'Heart':
        return <Heart {...props} />;
      default:
        return <Navigation {...props} />;
    }
  };

  return (
    <section id="services" className="py-24 bg-luxury-dark/60 relative z-10 border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-xl">
            <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">{t('services.category')}</p>
            <h2 className="text-3xl sm:text-4xl font-space font-bold text-white tracking-tight">
              {t('services.heading')}
            </h2>
          </div>
          <p className="text-gray-400 font-light text-sm max-w-sm mt-4 md:mt-0 leading-relaxed md:text-right">
            {t('services.description')}
          </p>
        </div>

        {/* Dynamic Service Grid with 3D Tilt Hover Simulation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {translatedServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => onServiceSelect(service.title)}
              className="relative p-8 rounded-2xl bg-luxury-black/90 border border-white/5 hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/5 transition-all duration-500 ease-out flex flex-col justify-between overflow-hidden group cursor-pointer"
              style={{
                perspective: 1000,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Animated Gold/White Line Sweep effect on hover */}
              <div 
                className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" 
              />
              
              {/* Premium subtle gloss background */}
              <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gold/10 group-hover:border-gold/30 transition-all duration-500">
                    {renderIcon(service.iconName)}
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#a1a1aa] bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                    {service.tagline}
                  </span>
                </div>

                <h3 className="text-xl font-space font-semibold text-white tracking-wide mb-3 group-hover:text-gold-light transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-400 text-sm font-light leading-relaxed mb-6 group-hover:text-white/80 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Service Highlights bullet points */}
                <ul className="space-y-2 mb-8">
                  {service.highlights.map((hlt, i) => (
                    <li key={i} className="flex items-center text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                      <CheckCircle className="w-3.5 h-3.5 text-gold/60 mr-2 shrink-0 group-hover:text-gold transition-colors" />
                      <span>{hlt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Booking Trigger Link */}
              <div
                className="flex items-center items-end text-gold group-hover:text-gold-light font-semibold tracking-wider text-xs uppercase text-left"
              >
                <span>{t('services.btn.book')}</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1.5 duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
