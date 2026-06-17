"use client";

import React, { useState, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Trust from './components/Trust';
import Services from './components/Services';
import Fleet from './components/Fleet';
import BookingWidget from './components/BookingWidget';
import ContactForm from './components/ContactForm';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import PageLoader from './components/PageLoader';
import GoogleMap from './components/GoogleMap';

// Lazy-loaded components for performance (below-the-fold heavy sections)
const DriverPartner = lazy(() => import('./components/DriverPartner'));
const Destinations = lazy(() => import('./components/Destinations'));

/** Minimal fallback while lazy components load */
function SectionSkeleton() {
  return (
    <div className="py-24 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-3">
        <div className="w-8 h-8 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
        <span className="text-[10px] font-mono text-gold-light/40 tracking-widest uppercase">Loading...</span>
      </div>
    </div>
  );
}

export default function App() {
  const [preselectedVehicleId, setPreselectedVehicleId] = useState<string | undefined>(undefined);
  const [selectedServiceName, setSelectedServiceName] = useState<string | undefined>(undefined);

  // Helper routine to smooth scroll directly to the Booking module with offset adjustment
  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      const offset = 80;
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

  // Event handlers
  const handleVehicleSelect = (vehicleId: string) => {
    setPreselectedVehicleId(vehicleId);
    setTimeout(() => {
      scrollToBooking();
    }, 100);
  };

  const handleServiceSelect = (serviceTitle: string) => {
    setSelectedServiceName(serviceTitle);
    setTimeout(() => {
      scrollToBooking();
    }, 100);
  };

  const handleDestinationSelect = (destName: string) => {
    setSelectedServiceName(destName);
    setTimeout(() => {
      scrollToBooking();
    }, 100);
  };

  const handleBookingTrigger = (bookingInstance: any) => {
    console.log('Booking Confirmed on client-side:', bookingInstance);
  };

  return (
    <div className="relative min-h-screen bg-luxury-black font-sans text-white antialiased overflow-x-hidden selection:bg-gold selection:text-luxury-black">
      
      {/* Premium Page Loader */}
      <PageLoader />

      {/* Premium Luxury Navbar */}
      <Navbar onBookClick={scrollToBooking} />

      {/* Main Single Page Sections Array */}
      <main>
        
        {/* cinematic introductory segment */}
        <Hero 
          onBookClick={scrollToBooking} 
          onFleetClick={() => {
            const el = document.getElementById('fleet');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} 
        />

        {/* core values and safety measures */}
        <Trust />

        {/* specialized chauffeur trips */}
        <Services onServiceSelect={handleServiceSelect} />

        {/* executive cabins showcase */}
        <Fleet onVehicleSelect={handleVehicleSelect} />

        {/* real-time interactive booking terminal */}
        <BookingWidget 
          preselectedVehicleId={preselectedVehicleId} 
          selectedServiceName={selectedServiceName}
          onBookingSuccess={handleBookingTrigger}
        />

        {/* scenic attraction points (lazy loaded) */}
        <Suspense fallback={<SectionSkeleton />}>
          <Destinations onDestinationSelect={handleDestinationSelect} />
        </Suspense>

        {/* certified client feedback */}
        <Testimonials />

        {/* regional travel driver alliances (lazy loaded) */}
        <Suspense fallback={<SectionSkeleton />}>
          <DriverPartner />
        </Suspense>

        {/* coordination hub contact section */}
        <ContactForm />

        {/* Google Maps location section */}
        <GoogleMap />

        {/* final action bottom segment */}
        <CTA onBookClick={scrollToBooking} />

      </main>

      {/* Corporate details and footer directories */}
      <Footer />

      {/* Persistent floating communication widgets (WhatsApp + Call Now) */}
      <FloatingWhatsApp />

    </div>
  );
}
