"use client";

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Trust from './components/Trust';
import Services from './components/Services';
import Fleet from './components/Fleet';
import BookingWidget from './components/BookingWidget';
import DriverPartner from './components/DriverPartner';
import ContactForm from './components/ContactForm';
import Destinations from './components/Destinations';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

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
    console.log('Premium Booking Confirmed on client-side:', bookingInstance);
  };

  return (
    <div className="relative min-h-screen bg-luxury-black font-sans text-white antialiased overflow-x-hidden selection:bg-gold selection:text-luxury-black">
      
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


        {/* scenic attraction points */}
        <Destinations onDestinationSelect={handleDestinationSelect} />

        {/* certified client feedback */}
        <Testimonials />

        {/* regional travel driver alliances */}
        <DriverPartner />

        {/* coordination hub contact section */}
        <ContactForm />

        {/* final action bottom segment */}
        <CTA onBookClick={scrollToBooking} />

      </main>

      {/* Corporate details and footer directories */}
      <Footer />

      {/* Persistent floating communication widget with gold glow effect */}
      <FloatingWhatsApp />

    </div>
  );
}
