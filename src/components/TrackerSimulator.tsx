import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { 
  Navigation, 
  MapPin, 
  Smartphone, 
  UserCheck, 
  Send, 
  MessageCircle, 
  Activity, 
  Compass 
} from 'lucide-react';

export default function TrackerSimulator() {
  const { language } = useLanguage();
  const [simulationState, setSimulationState] = useState<'IDLE' | 'LOCATING' | 'ASSIGNED' | 'EN_ROUTE' | 'TRIP_ACTIVE'>('IDLE');
  const [eta, setEta] = useState(6);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [distanceRemaining, setDistanceRemaining] = useState(5.8);
  const [driverName, setDriverName] = useState(language === 'ta' ? 'ராஜேஷ் செல்வம் (சர்டிஃபைட் ஓட்டுநர்)' : 'Rajesh Selvam (Certified Owner-Driver)');

  useEffect(() => {
    setDriverName(language === 'ta' ? 'ராஜேஷ் செல்வம் (சர்டிஃபைட் ஓட்டுநர்)' : 'Rajesh Selvam (Certified Owner-Driver)');
  }, [language]);

  // Simulation loop trigger
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (simulationState === 'LOCATING') {
      interval = setTimeout(() => {
        setSimulationState('ASSIGNED');
      }, 2500);
    } else if (simulationState === 'ASSIGNED') {
      interval = setTimeout(() => {
        setSimulationState('EN_ROUTE');
      }, 3000);
    } else if (simulationState === 'EN_ROUTE') {
      // Simulating car moving on map (ETA & distance decrease)
      interval = setInterval(() => {
        setEta((prev) => {
          if (prev <= 1) {
            setSimulationState('TRIP_ACTIVE');
            return 0;
          }
          return prev - 1;
        });
        setDistanceRemaining((prev) => Math.max(0.1, Number((prev - 0.95).toFixed(2))));
        setCurrentSpeed(62);
      }, 2500);
    } else if (simulationState === 'TRIP_ACTIVE') {
      // Highway cruising
      interval = setInterval(() => {
        setCurrentSpeed(() => Math.floor(75 + Math.random() * 15));
      }, 3000);
    }

    return () => {
      clearTimeout(interval);
      clearInterval(interval);
    };
  }, [simulationState]);

  const startSimulation = () => {
    setEta(6);
    setDistanceRemaining(5.8);
    setCurrentSpeed(0);
    setSimulationState('LOCATING');
  };

  const cancelSimulation = () => {
    setSimulationState('IDLE');
  };

  return (
    <section className="py-24 bg-luxury-black relative z-10 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-xl">
            <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2 font-mono">
              {language === 'ta' ? 'கார்ப்பரேட் டிஜிட்டல் வசதி' : 'ADVANCED DIGITAL COOPERATIVE'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-space font-bold text-white tracking-tight leading-tight">
              {language === 'ta' ? 'எளிய மொபைல் ஆப் போன்ற நேரடி கண்காணிப்பு வசதி' : 'The App-Like Chauffeur Dispatch Experience'}
            </h2>
          </div>
          <p className="text-gray-400 font-light text-sm max-w-sm mt-4 md:mt-0 leading-relaxed md:text-right">
            {language === 'ta' 
              ? 'எங்கள் ஓட்டுநர்கள் மற்றும் வாகனத்தை எவ்வாறு மேம்பட்ட தொழில்நுட்பத்தைப் பயன்படுத்தி நேரலையில் கண்காணிக்கிறோம் என்பதை இங்கே மாதிரி செயல்விளக்கம் மூலம் காண்க.'
              : 'See how our dispatch network maps and tracks active rides, guaranteeing safety, absolute transparency, and zero booking delays.'}
          </p>
        </div>

        {/* Outer Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Dashboard Visualizer Left (Large Interactive UI Mockup) */}
          <div className="lg:col-span-7 bg-[#0b0b0e] border border-white/5 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col justify-between">
            {/* Top Device Header Chrome */}
            <div className="bg-luxury-gray/30 px-6 py-4 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
                <span className="text-xs font-mono text-gray-500 ml-4 font-semibold">gps-core-coimbatore.sh</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-gold/10 px-3 py-1 rounded border border-gold/25">
                <Activity className="w-3.5 h-3.5 text-gold animate-pulse" />
                <span className="text-[10px] font-mono font-medium text-gold">{language === 'ta' ? 'கோவை வாகன கட்டுப்பாட்டகம்' : 'COIMBATORE DISPATCH LOGS'}</span>
              </div>
            </div>

            {/* Display Canvas with simulated telemetry or map */}
            <div className="p-8 flex-1 min-h-[340px] flex flex-col justify-center relative">
              
              {/* Star-grid background for high tech map aura */}
              <div className="absolute inset-0 bg-[radial-gradient(#1e1e2d_1.2px,transparent_1.2px)] [background-size:24.5px_24.5px] opacity-25 pointer-events-none" />

              <AnimatePresence mode="wait">
                {simulationState === 'IDLE' && (
                  <motion.div 
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center relative max-w-sm mx-auto space-y-6"
                  >
                    <div className="h-14 w-14 bg-gradient-to-r from-gold-dark to-gold rounded-full flex items-center justify-center mx-auto shadow-lg shadow-gold/20 animate-float">
                      <Navigation className="w-6 h-6 text-luxury-black transform rotate-45" />
                    </div>
                    <div>
                      <h4 className="text-lg font-space font-semibold text-white">{language === 'ta' ? 'நேரடி ஜிபிஎஸ் மாதிரி செயல்விளக்கம்' : 'Live Dispatched GPS Mockup'}</h4>
                      <p className="text-gray-400 text-xs font-light mt-1.5 leading-relaxed">
                        {language === 'ta'
                          ? 'ஓட்டுநர் ஒதுக்கீடு மற்றும் வாகனத்தின் நேரடி இருப்பிடத்தைக் காட்டும் மாதிரி கட்டுப்பாட்டுப் பலகையைத் தொடங்கிச் சரிபார்க்கவும்.'
                          : 'Simulate our driver-partner match cycles and witness high-availability tracking, coordinate assignments, and active dispatch status.'}
                      </p>
                    </div>
                    <button
                      onClick={startSimulation}
                      className="px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-luxury-black text-xs font-semibold tracking-wider uppercase rounded-full transition-all duration-300 cursor-pointer"
                    >
                      {language === 'ta' ? 'கண்காணிப்புச் சோதனையைத் தொடங்கு' : 'Initialize Tracking Demo'}
                    </button>
                  </motion.div>
                )}

                {simulationState === 'LOCATING' && (
                  <motion.div 
                    key="locating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-6"
                  >
                    {/* Ring scan animations */}
                    <div className="relative h-28 w-28 mx-auto mb-6 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border border-gold/45 animate-ping opacity-60" />
                      <div className="absolute inset-2 rounded-full border border-gold/30 animate-pulse" />
                      <div className="absolute inset-4 rounded-full bg-gold/5" />
                      <Compass className="w-8 h-8 text-gold animate-spin" />
                    </div>
                    <h4 className="text-gold-light font-space text-lg font-semibold uppercase tracking-wider animate-pulse">
                      {language === 'ta' ? 'அருகிலுள்ள வாகனங்களைத் தேடுகிறது' : 'Analyzing Coordinated Fleet Grid'}
                    </h4>
                    <p className="text-gray-500 text-xs font-light max-w-xs mx-auto mt-1">
                      {language === 'ta'
                        ? 'ஜிபிஎஸ் சிக்னல்களைச் சரிபார்த்து கோயம்புத்தூரின் தற்போதைய பயணப் பகுதியிலுள்ள சிறந்த வாகனங்களை இணைகிறது...'
                        : 'Querying local GPS modules and evaluating operator availability near Coimbatore Airport & City center.'}
                    </p>
                  </motion.div>
                )}

                {simulationState === 'ASSIGNED' && (
                  <motion.div 
                    key="assigned"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center space-y-4"
                  >
                    <div className="inline-block p-4 rounded-full bg-white/5 border border-gold/35">
                      <UserCheck className="w-10 h-10 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-gold uppercase tracking-widest">{language === 'ta' ? 'ஓட்டுநர் ஒதுக்கீடு செய்யப்பட்டது' : 'Driver Partner Allocated'}</p>
                      <h4 className="text-xl font-space font-semibold text-white mt-1">{driverName}</h4>
                      <p className="text-gray-400 text-xs font-light mt-1">{language === 'ta' ? 'நம்பகமான சொகுசு வாகனம் ✦ ஓட்டுநர் மதிப்பீடு: 4.95/5.0' : 'Comfortable vehicle assigned ✦ Partner rating: 4.95/5.0'}</p>
                    </div>
                  </motion.div>
                )}

                {simulationState === 'EN_ROUTE' && (
                  <motion.div 
                    key="en-route"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full space-y-6"
                  >
                    {/* Beautiful visual track representing a luxury route */}
                    <div className="w-full h-16 rounded-xl bg-white/5 border border-white/5 relative overflow-hidden flex items-center justify-between px-8">
                      {/* Pick Pin */}
                      <div className="relative z-10 flex items-center space-x-2 bg-luxury-black/90 p-2 rounded-lg border border-white/5">
                        <MapPin className="w-4 h-4 text-red-500 animate-pulse" />
                        <span className="text-[10px] font-mono text-gray-300 text-center">{language === 'ta' ? 'கோயம்புத்தூர்' : 'COIMBATORE'}</span>
                      </div>

                      {/* Moving Car Line representing Tamil nadu route */}
                      <div className="absolute left-32 right-32 top-11/12 h-[2px] bg-gradient-to-r from-red-500 via-gold to-green-500" />
                      
                      {/* Floating model car icon with Framer Motion sliding along path */}
                      <motion.div 
                        animate={{ x: [0, 180, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute h-8 w-8 bg-gold text-luxury-black rounded-lg flex items-center justify-center shadow-lg shadow-gold/30 z-20"
                      >
                        <Navigation className="w-4 h-4 transform rotate-90" />
                      </motion.div>

                      {/* Target Pin */}
                      <div className="relative z-10 flex items-center space-x-2 bg-luxury-black/90 p-2 rounded-lg border border-white/5">
                        <MapPin className="w-4 h-4 text-green-500 animate-pulse" />
                        <span className="text-[10px] font-mono text-gray-300">{language === 'ta' ? 'ஊட்டி / ஹில்ஸ்' : 'OOTY / HILLS'}</span>
                      </div>
                    </div>

                    {/* Stats pane */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                        <p className="text-[10px] font-mono uppercase text-gray-500 tracking-wider">{language === 'ta' ? 'வரும் நேரம்' : 'Estimated Wait'}</p>
                        <p className="text-2xl font-space font-extrabold text-gold">{eta} {language === 'ta' ? 'நிமி' : 'Min'}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                        <p className="text-[10px] font-mono uppercase text-gray-500 tracking-wider">{language === 'ta' ? 'தொலைவு' : 'Distance'}</p>
                        <p className="text-2xl font-space font-extrabold text-white">{distanceRemaining} km</p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                        <p className="text-[10px] font-mono uppercase text-gray-500 tracking-wider">{language === 'ta' ? 'நிலவரம்' : 'Fleet Status'}</p>
                        <p className="text-2xl font-space font-extrabold text-white">{language === 'ta' ? 'தயார்' : 'Ready'}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {simulationState === 'TRIP_ACTIVE' && (
                  <motion.div 
                    key="trip-active"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center space-y-6"
                  >
                    <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 px-4 py-1.5 rounded-full text-green-400 text-xs">
                      <div className="h-2 w-2 bg-green-400 rounded-full animate-ping" />
                      <span className="font-mono uppercase font-semibold text-[10px]">{language === 'ta' ? 'ஓட்டுநர் உங்களை வந்தடைந்தார்' : 'Chauffeur Arrived'}</span>
                    </div>

                    <h4 className="text-2xl font-space font-extrabold text-white">
                      {language === 'ta' ? 'உங்களது வாகனம் புறப்படத் தயார்' : 'Your Vehicle is ready to start'}
                    </h4>
                    
                    {/* Live dashboard speed gauge mockup */}
                    <div className="max-w-xs mx-auto border-t border-b border-white/10 py-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[9px] uppercase font-mono text-gray-500">{language === 'ta' ? 'வேகம்' : 'Live Speed'}</p>
                        <p className="text-3xl font-space font-extrabold text-gold">{currentSpeed} km/h</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-mono text-gray-500">{language === 'ta' ? 'கேபின் குளிர்' : 'Cabin Cool'}</p>
                        <p className="text-3xl font-space font-extrabold text-white">21°C Double AC</p>
                      </div>
                    </div>

                    <button
                      onClick={cancelSimulation}
                      className="px-6 py-2.5 bg-white/5 border border-white/10 text-gray-400 hover:text-white text-xs font-semibold tracking-wider uppercase rounded-full transition-all cursor-pointer"
                    >
                      {language === 'ta' ? 'கண்காணிப்பகம் ரீசெட் செய்க' : 'Reset Telematics'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Bottom Telemetry Status Line */}
            <div className="bg-luxury-gray/20 px-8 py-3.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-500">
              <span className="flex items-center">
                <span className="bg-green-500 h-2 w-2 rounded-full mr-2.5 animate-pulse" />
                <span>{language === 'ta' ? 'நம்பகமான நேரடி ஜிபிஎஸ் கண்காணிப்பு இயங்குகிறது' : 'SECURE GPS DISPATCH ACTIVE'}</span>
              </span>
              <span>COIMBATORE HUB</span>
            </div>
          </div>

          {/* Right features checklist dashboard */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="p-6 rounded-2xl bg-luxury-gray/20 border border-white/5 space-y-4">
              <div className="h-10 w-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-gold" />
              </div>
              <h3 className="text-lg font-space font-semibold text-white">
                {language === 'ta' ? '100% எளிய டிஜிட்டல் தொழில்நுட்பம்' : '100% Digital Native Mobility'}
              </h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                {language === 'ta' 
                  ? 'பயணத்தை முன்பதிவு செய்ததும் ஓட்டுநரின் முழு விவரங்களையும் வாட்ஸ்அப் அல்லது எஸ்எம்எஸ் மூலம் துல்லியமாகப் பெறுவீர்கள். தொலைபேசி காத்திருப்புகள் கிடையாது.'
                  : 'Receive direct coordination channels without annoying administrative telephone loops. Access complete digital controls on demand.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-luxury-gray/20 border border-white/5 space-y-4">
              <div className="h-10 w-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center">
                <Send className="w-5 h-5 text-gold" />
              </div>
              <h3 className="text-lg font-space font-semibold text-white">
                {language === 'ta' ? 'விரைவான ஓட்டுநர் ஒதுக்கீடு' : 'Intelli-Track Chauffeur Assignment'}
              </h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                {language === 'ta' 
                  ? 'உங்களுக்கு அருகிலுள்ள மற்றும் மிகச் சிறந்த சரிபார்க்கப்பட்ட ஓட்டுநர்களைக் கண்டறிந்து வேகம் மற்றும் தூரக் கணக்கீடுகளின் அடிப்படையில் உங்களுக்கு இணைக்கிறோம்.'
                  : 'Our booking management systems ensure nearby drivers are matched to avoid scheduling discrepancies and ensure seamless pickups.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-luxury-gray/20 border border-white/5 space-y-4">
              <div className="h-10 w-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-gold" />
              </div>
              <h3 className="text-lg font-space font-semibold text-white">
                {language === 'ta' ? 'நேரடி வாட்ஸ்அப் தகவல்கள்' : 'Real-Time WhatsApp Pushes'}
              </h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                {language === 'ta' 
                  ? 'பயணத் திட்டம், ஓட்டுநர்களின் மொபைல் எண்கள், வாகன எண் மற்றும் ஜிபிஎஸ் இருப்பிட இணைப்புகள் அனைத்தும் உங்கள் வாட்ஸ்அப்பிற்கு உடனுக்குடன் அனுப்பப்படும்.'
                  : 'Detailed chauffeur credentials, routes, map coordinates, and vehicle registration statuses are pushed directly to your registered WhatsApp.'}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
