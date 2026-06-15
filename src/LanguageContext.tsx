"use client";

import React, { createContext, useContext, useState } from 'react';
import { VEHICLES, SERVICES, DESTINATIONS, TESTIMONIALS } from './data';
import { Vehicle, Service, Destination, Testimonial } from './types';

export type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translatedVehicles: Vehicle[];
  translatedServices: Service[];
  translatedDestinations: Destination[];
  translatedTestimonials: Testimonial[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Core translation dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.fleet': 'Fleet',
    'nav.booking': 'Booking',
    'nav.partner': 'Driver Partner',
    'nav.reviews': 'Reviews',
    'nav.whatsapp': 'WhatsApp Connect',
    'nav.bookNow': 'Book Ride',
    'nav.mobile.fleet': 'Fleet Showcase',
    'nav.mobile.partner': 'Join as Driver Partner',
    'nav.mobile.reviews': 'Customer Reviews',
    'nav.mobile.bookNow': 'Book Ride Now',

    // Hero Section
    'hero.badge': "Coimbatore's Trusted Travel Partner",
    'hero.heading': 'Travel Safely and Comfortably with VEDAN TRAVELS',
    'hero.description': 'Book rides from Coimbatore to destinations across Tamil Nadu, Kerala, Karnataka and other parts of India. Safe drivers, clean vehicles and easy booking.',
    'hero.btn.book': 'BOOK NOW',
    'hero.btn.contact': 'CONTACT US',
    'hero.stat.trips': 'Trips Completed',
    'hero.stat.drivers': 'Verified Drivers',
    'hero.stat.support': 'Booking Support',
    'hero.stat.rating': 'Customer Rating',
    'hero.scrollDown': 'Learn More',

    // Trust (Why Choose Us)
    'trust.category': 'WHY CHOOSE US',
    'trust.heading': 'Setting the Standard in Reliable Travel',
    'trust.description': 'Customers trust VEDAN TRAVELS for safe, clean, and reliable rides starting from Coimbatore.',
    'trust.drivers.title': 'Experienced Drivers',
    'trust.drivers.desc': 'Polite and professional drivers who drive safely on all mountain roads and high highways.',
    'trust.clean.title': 'Clean Vehicles',
    'trust.clean.desc': 'All cars are cleaned daily and have double air conditioning for a nice, fresh cabin.',
    'trust.safe.title': 'Safe Travel',
    'trust.safe.desc': 'We care for your security with safe driving and plenty of rest stops for families.',
    'trust.support.title': '24/7 Booking Support',
    'trust.support.desc': 'Our customer support team is always open to help you with booking changes at any time.',
    'trust.price.title': 'Trusted Service',
    'trust.price.desc': 'We show complete honest prices up front with no hidden fees or extra costs.',
    'trust.comfort.title': 'Comfortable Journey',
    'trust.comfort.desc': 'Clean seat covers and comfortable leg space so you have a relaxing ride.',

    // Services
    'services.category': 'OUR SERVICES',
    'services.heading': 'Comfortable Rides Tailored for You',
    'services.description': 'Redefining your daily and outstation trips starting from Coimbatore with pristine timing, clean vehicles, and trusted driver-partners.',
    'services.btn.book': 'Book Now',

    // Fleet (Vehicles)
    'fleet.category': 'EXEC CABINS SHOWCASE',
    'fleet.heading': 'Choose Your Premium Cabin',
    'fleet.description': 'Our fleet consists of modern, air-conditioned vehicles, fully registered with tourism permits, driven by top-tier professionals.',
    'fleet.rating': 'Rating',
    'fleet.passengers': 'Passengers',
    'fleet.luggage': 'Luggage Bags',
    'fleet.spec.trans': 'Transmission',
    'fleet.spec.fuel': 'Fuel Type',
    'fleet.spec.engine': 'Engine Class',
    'fleet.btn.select': 'SELECT VEHICLE',
    'fleet.selected': 'Selected Vehicle',

    // Driver Network Section (Feature 2 Update)
    'partner.category': 'DRIVER NETWORK',
    'partner.heading': 'Trusted Driver Network Across Tamil Nadu',
    'partner.description': 'VEDAN TRAVELS works with experienced drivers and vehicle owners to provide reliable travel services from Coimbatore to destinations across South India.',
    'partner.cta': 'Become a Driver Partner',
    'partner.form.title': 'Register as a Driver / Owner',
    'partner.form.name': 'Driver Name',
    'partner.form.name.placeholder': 'Enter Full Name',
    'partner.form.phone': 'Phone Number',
    'partner.form.phone.placeholder': 'Enter 10-digit mobile number',
    'partner.form.vehicleType': 'Vehicle Type',
    'partner.form.vehicleNo': 'Vehicle Number',
    'partner.form.vehicleNo.placeholder': 'e.g. TN 37 CZ 1234',
    'partner.form.city': 'City / Hub',
    'partner.form.city.placeholder': 'e.g. Coimbatore, Ooty, etc.',
    'partner.form.experience': 'Years of Experience',
    'partner.form.experience.placeholder': 'Years of driving experience',
    'partner.form.submitting': 'Registering Partner Driver...',
    'partner.form.btn': 'Become a Driver Partner',
    'partner.form.success.msg': 'Our team will contact you shortly.',
    'partner.form.success.submsg': 'Our integration specialist will review your vehicle and documents within 24 hours.',
    'partner.form.reset': 'Register another vehicle',
    'partner.benefit.title': 'Exclusive Partner Network Perks',
    'partner.benefit.1': 'More Vehicle Availability',
    'partner.benefit.2': 'Faster Booking Confirmation',
    'partner.benefit.3': 'Wider Travel Coverage',
    'partner.benefit.4': 'Professional Drivers & Owners',
    'partner.benefit.5': 'Spotless Dust-Free Vehicles',
    'partner.benefit.6': '24/7 Support for Driver Partners',

    // Booking widget
    'booking.category': 'BOOK YOUR TRIP',
    'booking.heading': 'Book Your Trip',
    'booking.description': 'Fill in your details and our team will contact you shortly.',
    'booking.form.title': 'Request a Travel Quote',
    'booking.form.adv': 'No Advance Payment Required Now',
    'booking.form.name': 'Your Name *',
    'booking.form.name.holder': 'Enter full name',
    'booking.form.phone': 'Phone Number *',
    'booking.form.phone.holder': 'Enter 10-digit phone number',
    'booking.form.pickup': 'Pickup Location *',
    'booking.form.pickup.holder': 'Enter pickup address in Coimbatore',
    'booking.form.dest': 'Destination *',
    'booking.form.dest.holder': 'Where do you want to go?',
    'booking.form.date': 'Travel Date *',
    'booking.form.time': 'Travel Time *',
    'booking.form.passengers': 'Number of Passengers *',
    'booking.form.special': 'Special Requirements (Optional)',
    'booking.form.special.holder': 'e.g. Need child seat, extra cargo, multiple stops...',
    'booking.form.selectedVehicle': 'SELECTED VEHICLE',
    'booking.form.comfort': 'Comfort Level',
    'booking.form.suitable': 'Suitable For',
    'booking.form.btn': 'SUBMIT INQUIRY NOW',
    'booking.form.submitting': 'Sending Inquiry...',
    'booking.success.title': 'Travel Inquiry Logged!',
    'booking.success.p1': 'Thank you! Your car rental inquiry has been safely queued.',
    'booking.success.p2': 'Our Coimbatore travel coordinator will call you shortly on your number to finalize cheap rates and driver pairing.',
    'booking.success.ref': 'INQUIRY REFERENCE NUMBER',
    'booking.success.details': 'Travel Details Summary',
    'booking.success.route': 'Route Config',
    'booking.success.from': 'Pickup',
    'booking.success.to': 'Drop',
    'booking.success.schedule': 'Scheduled Departure',
    'booking.success.capacity': 'Passenger Count',
    'booking.success.car': 'Vehicle Selection',
    'booking.success.supportText': 'Support Team Hotline',
    'booking.success.hotline': 'Call or WhatsApp: +91 99999 99999',
    'booking.success.reset': 'Book Another Trip',
    'booking.error.alert': 'Please fill out all mandatory fields.',

    // Contact Form
    'contact.category': 'GET IN TOUCH',
    'contact.heading': 'Contact Our Coordination Hub',
    'contact.description': 'Have questions about premium rates, mountain travel guidelines, or custom tour itineraries? Write to us and our support desk will respond shortly.',
    'contact.form.title': 'Send a Message',
    'contact.form.name': 'Your Name *',
    'contact.form.name.placeholder': 'Enter Full Name',
    'contact.form.phone': 'Phone Number *',
    'contact.form.phone.placeholder': '10-Digit Mobile / WhatsApp Number',
    'contact.form.message': 'Message *',
    'contact.form.message.placeholder': 'How can we help you with your journey?',
    'contact.form.btn': 'SEND MESSAGE',
    'contact.form.submitting': 'Sending Message...',
    'contact.success.title': 'Message Sent!',
    'contact.success.subtitle': 'Your message has been received. Our team will contact you shortly.',
    'contact.success.reset': 'Send another message',

    // Tracker Simulator
    'tracker.category': 'REALTIME OPERATIONS',
    'tracker.heading': 'Coimbatore Dispatch Telematics',
    'tracker.desc': 'Simulating active GPS telemetry and track speedometers of our outstation journeys currently dispatching from Coimbatore.',
    'tracker.live': 'LIVE CONSOLE',
    'tracker.active': 'ACTIVE RIDES',
    'tracker.speed': 'SPEED',
    'tracker.eta': 'ETA',
    'tracker.status': 'STATUS',
    'tracker.status.highway': 'Cruising Express highway',
    'tracker.status.climbing': 'Climbing mountain roads',
    'tracker.status.boarding': 'Boarding passengers',
    'tracker.status.cjb': 'Airport arrival',

    // Destinations
    'dest.category': 'POPULAR DESTINATIONS',
    'dest.heading': 'Popular Scenic Journeys',
    'dest.description': 'Explore top regional destinations perfectly accessible from Coimbatore with our professional mountain & highway driver guides.',
    'dest.distance': 'Distance',
    'dest.km': 'km from Coimbatore',
    'dest.attractions': 'Popular Attractions',
    'dest.btn': 'Explore Route',

    // Testimonials
    'test.category': 'VERIFIED EXCELLENCE',
    'test.heading': 'Testimonials from Sovereign Travellers',
    'test.verifiedRoute': 'Certified Safe Dispatch Route',

    // CTA
    'cta.preheading': 'READY TO COMMENCE?',
    'cta.title': 'Experience the Ultimate Journey Today',
    'cta.desc': 'Secure Coimbatore\'s premium outstation cab service and travel in absolute comfort, safety and luxury.',
    'cta.btn': 'REQUEST A CUSTOM QUOTE',

    // Footer
    'footer.desc': 'Coimbatore\'s premier high-end travel company. Providing top-quality sedan, premium SUV and multi-seat mini bus hires for outstation travel, pilgrim tours and airport pick-ups.',
    'footer.links': 'Quick Navigation',
    'footer.services': 'Core Services',
    'footer.contact': 'Coimbatore Head Office',
    'footer.address': 'Vedas Towers, Avinashi Road, Near Airport, Coimbatore - 641014, Tamil Nadu',
    'footer.rights': 'All rights reserved.'
  },
  ta: {
    // Navbar
    'nav.home': 'முகப்பு',
    'nav.services': 'சேவைகள்',
    'nav.fleet': 'வாகனங்கள்',
    'nav.booking': 'முன்பதிவு',
    'nav.partner': 'ஓட்டுநர் நெட்வொர்க்',
    'nav.reviews': 'மதிப்புரைகள்',
    'nav.whatsapp': 'வாட்ஸ்அப் தொடர்பு',
    'nav.bookNow': 'முன்பதிவு செய்',
    'nav.mobile.fleet': 'வாகன வகைகள்',
    'nav.mobile.partner': 'ஓட்டுநர் கூட்டாளியாக சேர்',
    'nav.mobile.reviews': 'வாடிக்கையாளர் மதிப்புரைகள்',
    'nav.mobile.bookNow': 'இப்போது முன்பதிவு செய்',

    // Hero Section
    'hero.badge': 'கோயம்புத்தூரின் நம்பகமான பயண கூட்டாளி',
    'hero.heading': 'VEDAN TRAVELS உடன் பாதுகாப்பாகவும் வசதியாகவும் பயணம் செய்யுங்கள்',
    'hero.description': 'கோயம்புத்தூரிலிருந்து தமிழ்நாடு, கேரளா, கர்நாடகா மற்றும் இந்தியாவின் பல பகுதிகளுக்கு பயண சேவைகளை முன்பதிவு செய்யுங்கள். பாதுகாப்பான ஓட்டுநர்கள், சுத்தமான வாகனங்கள் மற்றும் எளிதான முன்பதிவு.',
    'hero.btn.book': 'இப்போது முன்பதிவு செய்யுங்கள்',
    'hero.btn.contact': 'எங்களை தொடர்பு கொள்ளுங்கள்',
    'hero.stat.trips': 'பயணங்கள் முடிந்தது',
    'hero.stat.drivers': 'சரிபார்க்கப்பட்ட ஓட்டுநர்கள்',
    'hero.stat.support': 'முன்பதிவு உதவி',
    'hero.stat.rating': 'வாடிக்கையாளர் மதிப்பீடு',
    'hero.scrollDown': 'மேலும் அறிய',

    // Trust (Why Choose Us)
    'trust.category': 'எங்களை ஏன் தேர்ந்தெடுக்க வேண்டும்',
    'trust.heading': 'நம்பகமான பயணத்தில் புதிய தரம்',
    'trust.description': 'வாடிக்கையாளர்கள் கோயம்புத்தூரிலிருந்து பாதுகாப்பான, சுத்தமான மற்றும் நம்பகமான பயணங்களுக்கு VEDAN TRAVELS-ஐ நம்புகிறார்கள்.',
    'trust.drivers.title': 'அனுபவம் வாய்ந்த ஓட்டுநர்கள்',
    'trust.drivers.desc': 'அனைத்து மலைப் பாதைகளிலும் மற்றும் நெடுஞ்சாலைகளிலும் பாதுகாப்பாக ஓட்டும் பண்பான மற்றும் அனுபவம் வாய்ந்த ஓட்டுநர்கள்.',
    'trust.clean.title': 'சுத்தமான வாகனங்கள்',
    'trust.clean.desc': 'அனைத்து கார்களும் தினமும் சுத்தம் செய்யப்பட்டு, இதமான பயணத்திற்கு இரட்டை ஏசி வசதி கொண்டவை.',
    'trust.safe.title': 'பாதுகாப்பான பயணம்',
    'trust.safe.desc': 'பாதுகாப்பான ஓட்டுதல் மற்றும் குடும்பங்களுக்கான போதுமான ஓய்வு நிறுத்தங்களுடன் உங்கள் பாதுகாப்பை நாங்கள் உறுதி செய்கிறோம்.',
    'trust.support.title': '24/7 முன்பதிவு உதவி',
    'trust.support.desc': 'முன்பதிவு மாற்றங்களுக்கு உங்களுக்கு உதவ எங்கள் வாடிக்கையாளர் ஆதரவு குழு எப்போதும் தயாராக உள்ளது.',
    'trust.price.title': 'நம்பகமான சேவை',
    'trust.price.desc': 'மறைமுக கட்டணங்கள் அல்லது கூடுதல் செலவுகள் இல்லாத நேர்மையான விலைகளை நாங்கள் முன்கூட்டியே காட்டுகிறோம்.',
    'trust.comfort.title': 'வசதியான பயணம்',
    'trust.comfort.desc': 'சுத்தமான சீட் கவர்கள் மற்றும் வசதியான லெக் ஸ்பேஸ் மூலம் நீங்கள் நிதானமாக பயணம் செய்யலாம்.',

    // Services
    'services.category': 'எங்கள் சேவைகள்',
    'services.heading': 'உங்களுக்காக வடிவமைக்கப்பட்ட வசதியான பயணங்கள்',
    'services.description': 'கோயம்புத்தூரிலிருந்து உங்கள் தினசரி மற்றும் வெளிவட்டார பயணங்களை சுத்தமான வாகனங்கள், அனுபவமிக்க ஓட்டுநர்கள் மற்றும் சிறந்த நேர மேலாண்மையுடன் வழங்குகிறோம்.',
    'services.btn.book': 'இப்போது முன்பதிவு செய்',

    // Fleet (Vehicles)
    'fleet.category': 'சொகுசு வாகனங்கள்',
    'fleet.heading': 'உங்களுக்கு பிடித்த சொகுசு வாகனத்தைத் தேர்ந்தெடுக்கவும்',
    'fleet.description': 'எங்கள் வாகனங்கள் அனைத்தும் நவீன, ஏர்-கண்டிஷன் செய்யப்பட்டவை, உரிய சுற்றுலா உரிமங்கள் பெற்றவை மற்றும் சிறந்த ஓட்டுநர்களால் இயக்கப்படுபவை.',
    'fleet.rating': 'மதிப்பீடு',
    'fleet.passengers': 'பயணிகள்',
    'fleet.luggage': 'சூட்கேஸ்கள்',
    'fleet.spec.trans': 'கியர் வகை',
    'fleet.spec.fuel': 'எரிபொருள்',
    'fleet.spec.engine': 'எஞ்சின் வகை',
    'fleet.btn.select': 'இந்த வாகனத்தை தேர்ந்தெடு',
    'fleet.selected': 'தேர்ந்தெடுக்கப்பட்ட வாகனம்',

    // Driver Network Section (Feature 2 Update)
    'partner.category': 'ஓட்டுநர் நெட்வொர்க்',
    'partner.heading': 'தமிழ்நாடு முழுவதிலும் நம்பகமான ஓட்டுநர் நெட்வொர்க்',
    'partner.description': 'VEDAN TRAVELS கோயம்புத்தூரிலிருந்து தென்னிந்தியா முழுவதிலும் நம்பகமான பயண சேவைகளை வழங்க அனுபவம் வாய்ந்த ஓட்டுநர்கள் மற்றும் வாகன உரிமையாளர்களுடன் இணைந்து செயல்படுகிறது.',
    'partner.cta': 'ஓட்டுநர் கூட்டாளியாக சேருங்கள்',
    'partner.form.title': 'ஓட்டுநர் / உரிமையாளராக பதிவு செய்ய விண்ணப்பம்',
    'partner.form.name': 'ஓட்டுநர் பெயர்',
    'partner.form.name.placeholder': 'முழு பெயரை உள்ளிடவும்',
    'partner.form.phone': 'தொலைபேசி எண்',
    'partner.form.phone.placeholder': '10 இலக்க மொபைல் எண்ணை உள்ளிடவும்',
    'partner.form.vehicleType': 'வாகன வகை',
    'partner.form.vehicleNo': 'வாகன எண்',
    'partner.form.vehicleNo.placeholder': 'உதாரணம்: TN 37 CZ 1234',
    'partner.form.city': 'நகரம் / ஊர்',
    'partner.form.city.placeholder': 'உதாரணம்: கோயம்புத்தூர், ஊட்டி, முதலியன',
    'partner.form.experience': 'அனுபவ ஆண்டுகள்',
    'partner.form.experience.placeholder': 'ஓட்டுநர் அனுபவ ஆண்டுகள்',
    'partner.form.submitting': 'ஓட்டுநர் விவரங்கள் சரிபார்க்கப்படுகின்றன...',
    'partner.form.btn': 'உறுதி செய்து விண்ணப்பிக்கவும்',
    'partner.form.success.msg': 'எங்கள் குழுவினர் விரைவில் உங்களைத் தொடர்பு கொள்வார்கள்.',
    'partner.form.success.submsg': 'எங்கள் ஓட்டுநர் சேர்க்கை நிபுணர் உங்களது ஆவணங்கள் மற்றும் வாகனத்தை 24 மணி நேரத்திற்குள் சரிபார்ப்பார்.',
    'partner.form.reset': 'மற்றொரு வாகனத்தை பதிவு செய்',
    'partner.benefit.title': 'கூட்டாளி ஓட்டுநர்களுக்கான பிரத்தியேக நன்மைகள்',
    'partner.benefit.1': 'அதிக வாகனங்கள் கிடைக்கும் வசதி',
    'partner.benefit.2': 'விரைவான முன்பதிவு உறுதிப்படுத்தல்',
    'partner.benefit.3': 'விரிவான பயண எல்லைகள்',
    'partner.benefit.4': 'தொழில்முறை ஓட்டுநர்கள் & உரிமையாளர்கள்',
    'partner.benefit.5': 'சுத்தமான மற்றும் தூசியற்ற வாகனங்கள்',
    'partner.benefit.6': 'கூட்டாளி ஓட்டுநர்களுக்கு 24/7 ஆதரவு',

    // Booking widget
    'booking.category': 'பயண முன்பதிவு',
    'booking.heading': 'உங்கள் பயணத்தை முன்பதிவு செய்யுங்கள்',
    'booking.description': 'உங்கள் விவரங்களை நிரப்பவும், எங்கள் குழு விரைவில் உங்களைத் தொடர்பு கொள்ளும்.',
    'booking.form.title': 'பயண கட்டண விவரங்களை பெறுக',
    'booking.form.adv': 'முன்பணம் எதுவும் இப்போது செலுத்த வேண்டியதில்லை',
    'booking.form.name': 'உங்கள் பெயர் *',
    'booking.form.name.holder': 'முழு பெயரை உள்ளிடவும்',
    'booking.form.phone': 'தொலைபேசி எண் *',
    'booking.form.phone.holder': '10 இலக்க தொலைபேசி எண்ணை உள்ளிடவும்',
    'booking.form.pickup': 'பிக்கப் செய்யும் இடம் *',
    'booking.form.pickup.holder': 'கோயம்புத்தூரில் பிக்கப் செய்ய வேண்டிய இடம்',
    'booking.form.dest': 'சென்றடைய வேண்டிய இடம் *',
    'booking.form.dest.holder': 'நீங்கள் எங்கு செல்ல விரும்புகிறீர்கள்?',
    'booking.form.date': 'பயணத் தேதி *',
    'booking.form.time': 'பயண நேரம் *',
    'booking.form.passengers': 'பயணிகள் எண்ணிக்கை *',
    'booking.form.special': 'சிறப்பு கோரிக்கைகள் (ஏதேனும் இருப்பின்)',
    'booking.form.special.holder': 'உதாரணம்: குழந்தை இருக்கை, கூடுதல் லக்கேஜ் வசதி, பல நிறுத்தங்கள்...',
    'booking.form.selectedVehicle': 'தேர்ந்தெடுக்கப்பட்ட வாகனம்',
    'booking.form.comfort': 'வசதி நிலை',
    'booking.form.suitable': 'இவற்றுக்கு உகந்தது',
    'booking.form.btn': 'விசாரணை கோரிக்கையை சமர்ப்பி',
    'booking.form.submitting': 'கோரிக்கை அனுப்பப்படுகிறது...',
    'booking.success.title': 'விசாரணை வெற்றிகரமாக பதிவு செய்யப்பட்டது!',
    'booking.success.p1': 'நன்றி! உங்கள் பயண முன்பதிவு விசாரணை வெற்றிகரமாக பதிவு செய்யப்பட்டுள்ளது.',
    'booking.success.p2': 'எங்கள் கோயம்புத்தூர் பயண ஒருங்கிணைப்பாளர் குறைந்தபட்ச கட்டண விவரங்கள் மற்றும் ஓட்டுநர் தகவல் குறித்து விரைவில் உங்களை தொலைபேசியில் தொடர்புகொள்வார்.',
    'booking.success.ref': 'முன்பதிவு குறிப்பு எண்',
    'booking.success.details': 'பயண விவரங்கள்',
    'booking.success.route': 'பயண பாதை',
    'booking.success.from': 'பிக்கப்',
    'booking.success.to': 'டிராப்',
    'booking.success.schedule': 'திட்டமிடப்பட்ட நேரம்',
    'booking.success.capacity': 'பயணிகள் எண்ணிக்கை',
    'booking.success.car': 'தேர்ந்தெடுக்கப்பட்ட வாகனம்',
    'booking.success.supportText': 'வாடிக்கையாளர் சேவை உதவி எண்',
    'booking.success.hotline': 'அழைக்க அல்லது வாட்ஸ்அப் செய்ய: +91 99999 99999',
    'booking.success.reset': 'மற்றொரு பயணத்தை முன்பதிவு செய்',
    'booking.error.alert': 'தயவுசெய்து தேவையான அனைத்து விவரங்களையும் நிரப்பவும்.',

    // Contact Form
    'contact.category': 'தொடர்பு கொள்ள',
    'contact.heading': 'எங்கள் வாடிக்கையாளர் மையத்தைத் தொடர்பு கொள்ளவும்',
    'contact.description': 'சொகுசு கட்டணங்கள், மலைப் பயண வழிகாட்டுதல்கள் அல்லது தனிப்பயன் சுற்றுலா பயணங்கள் பற்றிய கேள்விகள் உள்ளதா? எங்களை தொடர்பு கொள்ளவும், எங்கள் ஆதரவு குழு விரைவில் பதிலளிக்கும்.',
    'contact.form.title': 'செய்தி அனுப்பவும்',
    'contact.form.name': 'உங்கள் பெயர் *',
    'contact.form.name.placeholder': 'முழு பெயரை உள்ளிடவும்',
    'contact.form.phone': 'தொலைபேசி எண் *',
    'contact.form.phone.placeholder': '10 இலக்க மொபைல் எண்',
    'contact.form.message': 'செய்தி *',
    'contact.form.message.placeholder': 'உங்கள் பயணம் குறித்து நாங்கள் உங்களுக்கு எவ்வாறு உதவ முடியும்?',
    'contact.form.btn': 'செய்தியை அனுப்பவும்',
    'contact.form.submitting': 'செய்தி அனுப்பப்படுகிறது...',
    'contact.success.title': 'செய்தி அனுப்பப்பட்டது!',
    'contact.success.subtitle': 'உங்கள் செய்தி பெறப்பட்டது. எங்கள் குழுவினர் விரைவில் உங்களைத் தொடர்பு கொள்வார்கள்.',
    'contact.success.reset': 'மற்றொரு செய்தி அனுப்பவும்',

    // Tracker Simulator
    'tracker.category': 'நேரடி சேவைகள்',
    'tracker.heading': 'கோவி நேரடி கண்காணிப்பு தளம்',
    'tracker.desc': 'கோயம்புத்தூரிலிருந்து புறப்பட்டுச் சென்று கொண்டிருக்கும் எங்கள் அவுட்ஸ்டேஷன் வாகனங்களின் தற்போதைய GPS இருப்பிடம் மற்றும் வேகத்தை நேரலையில் இங்கே காணுங்கள்.',
    'tracker.live': 'நேரடி கண்காணிப்பு',
    'tracker.active': 'செயலில் உள்ள பயணங்கள்',
    'tracker.speed': 'வேகம்',
    'tracker.eta': 'வருகை நேரம்',
    'tracker.status': 'நிலை',
    'tracker.status.highway': 'தேசிய நெடுஞ்சாலையில் பயணம்',
    'tracker.status.climbing': 'மலைப்பாதையில் பயணம் செய்கிறது',
    'tracker.status.boarding': 'பயணிகள் ஏறுகிறார்கள்',
    'tracker.status.cjb': 'விமான நிலைய வருகை',

    // Destinations
    'dest.category': 'பிரபலமான சுற்றுலா இடங்கள்',
    'dest.heading': 'பிரபலமான சுற்றுலாப் பயணங்கள்',
    'dest.description': 'எங்கள் அனுபவம் வாய்ந்த மலை மற்றும் நெடுஞ்சாலை ஓட்டுநர்களுடன் கோயம்புத்தூரிலிருந்து எளிதில் செல்லக்கூடிய சிறந்த தார்மீக சுற்றுலா இடங்களை ஆராயுங்கள்.',
    'dest.distance': 'தொலைவு',
    'dest.km': 'கி.மீ (கோயம்புத்தூரிலிருந்து)',
    'dest.attractions': 'பார்க்கவேண்டிய இடங்கள்',
    'dest.btn': 'பயண வழியை பார்',

    // Testimonials
    'test.category': 'வாடிக்கையாளர் திருப்தி',
    'test.heading': 'எங்கள் வாடிக்கையாளர்களின் சிறந்த அனுபவங்கள்',
    'test.verifiedRoute': 'பாதுகாப்பான பயண வழி என உறுதி செய்யப்பட்டது',

    // CTA
    'cta.preheading': 'பயணத்தைத் தொடங்கலாமா?',
    'cta.title': 'சிறந்த பயண அனுபவத்தை இன்றே உணருங்கள்',
    'cta.desc': 'கோயம்புத்தூரின் முன்னணி சொகுசு அவுட்ஸ்டேஷன் கேப் சேவையை முன்பதிவு செய்து சிறந்த வசதி மற்றும் பாதுகாப்புடன் பயணம் செய்யுங்கள்.',
    'cta.btn': 'இலவச கட்டண விவரங்களை பெறுக',

    // Footer
    'footer.desc': 'கோயம்புத்தூரின் முதன்மையான சொகுசு பயண நிறுவனம். சிறந்த செடான் கார்கள், பிரீமியம் SUV மற்றும் பல இருக்கைகள் கொண்ட மினி பஸ்களை குறைந்த கட்டணத்தில் அவுட்ஸ்டேஷன், ஆன்மீக சுற்றுலா மற்றும் ஏர்போர்ட் பிக்கப் தேவைகளுக்கு வழங்குகிறோம்.',
    'footer.links': 'இணையதள பக்கங்கள்',
    'footer.services': 'முக்கிய சேவைகள்',
    'footer.contact': 'கோயம்புத்தூர் தலைமை அலுவலகம்',
    'footer.address': 'வேதாஸ் டவர்ஸ், அவினாசி சாலை, விமான நிலையம் அருகில், கோயம்புத்தூர் - 641014, தமிழ்நாடு',
    'footer.rights': 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to restore from localStorage if exists
    try {
      const saved = localStorage.getItem('vedan_lang');
      if (saved === 'en' || saved === 'ta') return saved;
    } catch (_) {}
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('vedan_lang', lang);
    } catch (_) {}
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  // Convert default English data dynamic resources to localized resources
  const translatedVehicles: Vehicle[] = VEHICLES.map(vehicle => {
    if (language === 'en') return vehicle;

    // Localized values for Tamil
    let nameLocal = vehicle.name;
    let categoryLocal = vehicle.category;
    let driverTierLocal = vehicle.driverTier;
    let comfortLevelLocal = vehicle.comfortLevel;
    let suitableForLocal = vehicle.suitableFor;

    if (vehicle.id === 'toyota-etios') {
      nameLocal = 'டொயோட்டா எட்டியோஸ்';
      categoryLocal = 'செடான் (Sedan)';
      driverTierLocal = 'தொழில்முறை ஓட்டுநர்';
      comfortLevelLocal = 'அதிக கால் வைக்கும் இடவசதி கொண்ட வசதியான செடான் கார்';
      suitableForLocal = 'விமான நிலைய பிக்கப் மற்றும் வெளிவட்டார பயணங்களுக்கு உகந்தது';
    } else if (vehicle.id === 'swift-dzire') {
      nameLocal = 'மாருதி சுசூகி ஸ்விஃப்ட் டிசையர்';
      categoryLocal = 'செடான் (Sedan)';
      driverTierLocal = 'நெருங்கிய உள்ளூர் கோவை ஓட்டுநர்';
      comfortLevelLocal = 'குடும்பத்தினருக்கான வசதியான ஏசி செடான் கார்';
      suitableForLocal = 'விமான நிலைய பிக்கப் மற்றும் விரைவு பயணங்களுக்கு உகந்தது';
    } else if (vehicle.id === 'hyundai-accent') {
      nameLocal = 'ஹூண்டாய் ஆக்சென்ட்';
      categoryLocal = 'செடான் (Sedan)';
      driverTierLocal = 'நெடுஞ்சாலை வேக ஓட்டுநர்';
      comfortLevelLocal = 'மென்மையான சஸ்பென்ஷன் கொண்ட சொகுசு பயணிகள் தளம்';
      suitableForLocal = 'குடும்பங்களின் நீண்ட தூர பயணத்திற்கு ஏற்றது';
    } else if (vehicle.id === 'toyota-innova') {
      nameLocal = 'டொயோட்டா இன்னோவா';
      categoryLocal = 'சொகுசு MUV / SUV';
      driverTierLocal = 'மலைப் பாதைகளில் சிறந்த ஓட்டுநர்';
      comfortLevelLocal = 'அதிவேக நெடுஞ்சாலை நிலைத்தன்மை மற்றும் பெரிய கேபின் வசதி';
      suitableForLocal = 'ஆன்மீக சுற்றுலாக்கள் மற்றும் சுற்றிப் பார்க்கும் பயணங்களுக்கு உகந்தது';
    } else if (vehicle.id === 'toyota-innova-crysta') {
      nameLocal = 'டொயோட்டா இன்னோவா கிரிஸ்டா';
      categoryLocal = 'பிரீமியம் MUV / SUV';
      driverTierLocal = 'சான்றளிக்கப்பட்ட பிரீமியம் கேப்டன் ஓட்டுநர்';
      comfortLevelLocal = 'கேப்டன் இருக்கைகளுடன் கூடிய மிக சொகுசான சொகுசு கார்';
      suitableForLocal = 'குடும்ப சுற்றுப்பயணங்கள் மற்றும் மலைப் பயணங்களுக்கு மிகவும் உகந்தது';
    } else if (vehicle.id === 'suv-scorpio-xuv') {
      nameLocal = 'மகிந்திரா ஸ்கார்பியோ / XUV';
      categoryLocal = 'சொகுசு SUV';
      driverTierLocal = 'அனுபவம் வாய்ந்த நெடுஞ்சாலை ஓட்டுநர்';
      comfortLevelLocal = 'உயரமான இருக்கை வசதியுள்ள கம்பீரமான பவர் SUV';
      suitableForLocal = 'குழு பயணங்கள் மற்றும் கரடுமுரடான மலைச் சாலைகளுக்கு ஏற்றது';
    } else if (vehicle.id === 'tempo-traveller') {
      nameLocal = 'டெம்போ டிராவலர்';
      categoryLocal = 'மினி பஸ் / விஐபி கோச்';
      driverTierLocal = 'குழு சுற்றுலா ஓட்டுநர்';
      comfortLevelLocal = 'புஷ்-பேக் ஏசி இருக்கைகளுடன் கூடிய அதிக இடவசதி கொண்ட மினி பஸ்';
      suitableForLocal = 'சுபகாரியங்கள், பெரிய குடும்ப விழாக்கள் மற்றும் நீண்ட தூர யாத்திரைகளுக்கு உகந்தது';
    }

    // Localize features
    const featureMap: Record<string, string> = {
      'Working Air Conditioning': 'வலுவான ஏசி வசதி',
      'First-Aid Kit': 'முதலுதவி பெட்டி வசதி',
      'Free Water Bottles': 'இலவச குடிநீர் பாட்டில்கள்',
      'Daily Newspaper': 'செய்தித்தாள்',
      'Premium Seat Covers': 'பிரீமியம் லெதர் இருக்கைகள்',
      'Mobile Phone Charger': 'மொபைல் போன் சார்ஜர்',
      'Spotless Dust-Free Cabin': 'சுத்தமான மற்றும் தூசியற்ற கேபின்',
      'Ergonomic Seats': 'வசதியான எர்கோனமிக் இருக்கைகள்',
      'Spacious Cargo Trunk': 'பொருட்கள் வைக்க பெரிய டிக்கி வசதி',
      'Clean and Odorless Ride': 'வாசனையான மற்றும் தூய்மையான பயணம்',
      'Spacious Cabin Layout': 'விசாலமான கேபின் வடிவமைப்பு',
      'Rear Air Conditioning Vents': 'பின்புற ஏசி துவாரங்கள்',
      'Excellent Audio Sound System': 'சிறந்த நவீன ஆடியோ சிஸ்டம்',
      'Generous Legroom': 'தாராளமான கால் இடைவெளி',
      'Comfortable Captain Seats': 'சொகுசு கேப்டன் இருக்கைகள்',
      'Rear Air Conditioning': 'பின்புற பிரத்தியேக ஏசி',
      'Free Water Bottles & Tissues': 'இலவச குடிநீர் மற்றும் திசுக்கள்',
      'Good music system': 'மனதிற்கு இனிய மியூசிக் சிஸ்டம்',
      'Powerful Engine': 'அதிவேக சக்திவாய்ந்த எஞ்சின்',
      'Full Cabin Air Conditioning': 'முழு கேபின் ஏசி குளிர்விப்பு',
      'Music System': 'இசை அமைப்பு',
      'Luggage Carrier on Top': 'மேல்புற லக்கேஜ் கேரியர்',
      'Push-back Reclining Seats': 'சாய்வு இருக்கைகள் (Push-back)',
      'Music System with LED Screen': 'LED ஸ்கிரீன் இசை அமைப்பு',
      'Double Air Conditioning': 'இரு வழி ஏர் கண்டிஷனிங்',
      'Separate Luggage Space': 'தனி லக்கேஜ் வைக்கும் இடம்'
    };

    const specsLocal = {
      transmission: vehicle.specs.transmission === 'Manual 5-Speed' ? 'மேனுவல் 5-கியர்' :
                    vehicle.specs.transmission === 'Manual / Automatic' ? 'மேனுவல் / ஆட்டோமேடிக்' :
                    vehicle.specs.transmission === 'Manual 6-Speed' ? 'மேனுவல் 6-கியர்' :
                    vehicle.specs.transmission === 'Automatic / Manual' ? 'ஆட்டோமேடிக் / மேனுவல்' : vehicle.specs.transmission,
      fuel: vehicle.specs.fuel === 'Diesel / Petrol' ? 'டீசல் / பெட்ரோல்' :
            vehicle.specs.fuel === 'Petrol' ? 'பெட்ரோல்' :
            vehicle.specs.fuel === 'Diesel' ? 'டீசல்' : vehicle.specs.fuel,
      engineClass: vehicle.specs.engineClass === '1.4L / 1.5L Engine' ? '1.4L - 1.5L எஞ்சின்' :
                   vehicle.specs.engineClass === '1.2L Engine' ? '1.2L எஞ்சின்' :
                   vehicle.specs.engineClass === '1.5L Engine' ? '1.5L எஞ்சின்' :
                   vehicle.specs.engineClass === '2.5L D-4D Engine' ? '2.5L D-4D எஞ்சின்' :
                   vehicle.specs.engineClass === '2.4L Engine' ? '2.4L அதிநவீன எஞ்சின்' :
                   vehicle.specs.engineClass === '2.2L Engine' ? '2.2L பவர் எஞ்சின்' :
                   vehicle.specs.engineClass === '2.6L Engine' ? '2.6L எஞ்சின்' : vehicle.specs.engineClass
    };

    const featuresLocal = vehicle.features.map(f => featureMap[f] || f);

    return {
      ...vehicle,
      name: nameLocal,
      category: categoryLocal,
      driverTier: driverTierLocal,
      features: featuresLocal,
      comfortLevel: comfortLevelLocal,
      suitableFor: suitableForLocal,
      specs: specsLocal
    };
  });

  const translatedServices: Service[] = SERVICES.map(service => {
    if (language === 'en') return service;

    let titleLocal = service.title;
    let descLocal = service.description;
    let taglineLocal = service.tagline;
    let highlightsLocal = service.highlights;

    if (service.id === 'airport-pickup-drop') {
      titleLocal = 'விமான நிலைய பிக்கப் & டிராப்';
      descLocal = 'தனிநபர்கள், குடும்பங்கள் மற்றும் தொழில் அதிபர்களுக்கு கோயம்புத்தூர் விமான நிலையத்தில் இருந்து மிகச் சரியான நேரத்தில் பிக்கப் மற்றும் டிராப் செய்யும் சேவை.';
      taglineLocal = 'எப்போதும் சரியான நேரம்';
      highlightsLocal = ['துல்லியமான நேர மேலாண்மை', 'டிரைவர் உங்களை விமான நிலையத்தில் வரவேற்பார்', 'விமானம் தாமதமானால் இலவச காத்திருப்பு நேரம்', 'பொருட்களை ஏற்றி இறக்க எளிமையான உதவி'];
    } else if (service.id === 'outstation-trips') {
      titleLocal = 'வெளிவட்டார பயணங்கள் (Outstation)';
      descLocal = 'கோயம்புத்தூரிலிருந்து தென்னிந்தியாவின் எந்தவொரு இடத்திற்கும் மிகவும் வசதியான சொகுசு வாகனங்கள் மற்றும் அனுபவமிக்க டிரைவர்களுடன் பயணம் செய்யுங்கள்.';
      taglineLocal = 'வசதியான தொலைதூர பயணம்';
      highlightsLocal = ['பல நாள் பயணத் திட்டங்கள்', 'பயண வழிகளை நன்கு அறிந்த அனுபவமிக்க ஓட்டுநர்கள்', 'குடும்பங்களுக்கு பாதுகாப்பான பயணம்', 'எளிமையான மற்றும் நேர்மையான கட்டணம்'];
    } else if (service.id === 'corporate-travel') {
      titleLocal = 'கார்ப்பரேட் அலுவலக பயணம்';
      descLocal = 'வணிக கூட்டங்கள், திட்டமிடப்பட்ட அலுவலக பயணங்கள் மற்றும் நிறுவனத்தின் ஊழியர்களின் பயணத் தேவைகளுக்கான நம்பகமான சேவை.';
      taglineLocal = 'தொழில்முறை பயண சேவை';
      highlightsLocal = ['சுத்தமான ஆடைகள் அணிந்த பண்பான ஓட்டுநர்கள்', 'அதிநவீன சுத்தமான கார்கள்', 'உறுதிசெய்யப்பட்ட சரியான நேர சேவை', 'எளிதான கார்ப்பரேட் ரசீதுகள்'];
    } else if (service.id === 'temple-tours') {
      titleLocal = 'ஆன்மீகத் தல யாத்திரைகள்';
      descLocal = 'தென்னிந்தியாவின் பிரசித்தி பெற்ற கோவில்கள் மற்றும் வழிபாட்டுத் தலங்களுக்கு குடும்பத்துடன் ஆன்மீகப் பயணம் செல்ல வசதியான சேவை.';
      taglineLocal = 'அமைதியான ஆன்மீகப் பயணம்';
      highlightsLocal = ['கோவில் நேரங்களை நன்கு அறிந்த ஓட்டுநர்கள்', 'பெரியவர்களுக்கு ஏற்ற வசதியான இருக்கைகள்', 'வழியில் எங்கு வேண்டுமானாலும் நிறுத்திச் செல்லும் வசதி', 'பாதுகாப்பான குடும்பப் பயணச் சூழல்'];
    } else if (service.id === 'family-trips') {
      titleLocal = 'குடும்ப சுற்றுலா பயணங்கள்';
      descLocal = 'குடும்பங்கள் மற்றும் பெரிய குழுக்கள் பாதுகாப்பாகவும் மகிழ்ச்சியாகவும் பயணம் செய்ய ஏதுவான சொகுசு வாகனங்கள்.';
      taglineLocal = 'மகிழ்ச்சியான குடும்ப பயணம்';
      highlightsLocal = ['குழந்தைகள் மற்றும் முதியவர்களுக்கு உகந்தது', 'விசாலமான மற்றும் சுத்தமான வாகன உட்புறங்கள்', 'சிறந்த ஏசி குளிரூட்டும் வசதி', 'பொருட்கள் வைக்க தாராளமான இடவசதி'];
    }

    return {
      ...service,
      title: titleLocal,
      description: descLocal,
      tagline: taglineLocal,
      highlights: highlightsLocal
    };
  });

  const translatedDestinations: Destination[] = DESTINATIONS.map(dest => {
    if (language === 'en') return dest;

    let taglineLocal = dest.tagline;
    let descLocal = dest.description;
    let attractionsLocal = dest.popularAttractions;

    if (dest.id === 'ooty') {
      taglineLocal = 'அழகான மலைப்பிரதேசம் - ஊட்டி';
      descLocal = 'கோயம்புத்தூரிலிருந்து நீலகிரி மலைகளில் இதமான பயணம். பசுமையான தேயிலைத் தோட்டங்கள் மற்றும் குளிர்ந்த காலநிலையை அனுபவியுங்கள்.';
      attractionsLocal = ['போட்டானிக்கல் கார்டன்', 'ஊட்டி ஏரி படகு சவாரி', 'தொட்டபெட்டா சிகர காட்சி', 'பைகாரா நீர்வீழ்ச்சி'];
    } else if (dest.id === 'kodaikanal') {
      taglineLocal = 'அழகிய மலை ஏரி மற்றும் பைன் காடுகள்';
      descLocal = 'அழகான ஏரி மற்றும் உயரமான பைன் மரங்கள் கொண்ட அமைதியான மலை நகரம். குடும்பத்துடன் மன அமைதி பெற சிறந்த இடம்.';
      attractionsLocal = ['கொடைக்கானல் நட்சத்திர வடிவ ஏரி', 'பைன் காடுகள்', 'கோக்கர்ஸ் வாக்', 'பில்லர் ராக்ஸ் வியூ'];
    } else if (dest.id === 'munnar') {
      taglineLocal = 'கேரளாவின் பசுமையான தேயிலை மலைகள்';
      descLocal = 'பசுமை போர்த்திய தேயிலை தோட்டங்கள் நிறைந்த மூணாறு மலைகளுக்கு சுகமளிக்கும் ஏசி சொகுசு கார் பயணம்.';
      attractionsLocal = ['இரவிகுளம் தேசிய பூங்கா', 'மாட்டுப்பட்டி அணை', 'எக்கோ பாயிண்ட் கத்தரித்தல்', 'ஆனைமுடி சிகரம்'];
    } else if (dest.id === 'bangalore') {
      taglineLocal = 'இந்தியாவின் தோட்டம் என்று அழைக்கப்படும் நகரம்';
      descLocal = 'கோவை - பெங்களூர் இடையே மிக விரைவான மற்றும் உயர்தர தேசிய நெடுஞ்சாலை வழி சொகுசு பயணம்.';
      attractionsLocal = ['பெங்களூர் அரண்மனை', 'லால்பாக் தாவரவியல் பூங்கா', 'விதான சௌதா', 'கப்பன் பூங்கா'];
    } else if (dest.id === 'chennai') {
      taglineLocal = 'தமிழ்நாட்டின் தலைநகரம்';
      descLocal = 'கோயம்புத்தூரிலிருந்து சென்னைக்கு சிறந்த சொகுசு கார்களில் அலுப்பில்லாத சுகப் பயணம்.';
      attractionsLocal = ['மெரினா கடற்கரை', 'கபாலீஸ்வரர் கோவில்', 'சாந்தோம் தேவாலயம்', 'மகாபலிபுரம் கடற்கரை கோவில்கள்'];
    } else if (dest.id === 'madurai') {
      taglineLocal = 'கோவில் மாநகரம் மதுரை';
      descLocal = 'உலகப் புகழ்பெற்ற மதுரை மீனாட்சி அம்மன் கோவில் மற்றும் வரலாற்றுச் சிறப்புமிக்க இடங்களுக்கு விரைவான ஆன்மீகப் பயணம்.';
      attractionsLocal = ['மீனாட்சி அம்மன் கோவில்', 'திருமலை நாயக்கர் மஹால்', 'காந்தி அருங்காட்சியகம்'];
    } else if (dest.id === 'mysore') {
      taglineLocal = 'அரண்மனைகள் மற்றும் பாரம்பரியத்தின் நகரம்';
      descLocal = 'மைசூர் அரண்மனை, பிருந்தாவன் கார்டன்ஸ் மற்றும் பாரம்பரிய தளங்களை ரசிக்க கோவையிலிருந்து ஒரு சொகுசு பயணம்.';
      attractionsLocal = ['மைசூர் அரண்மனை', 'சாமுண்டி மலைக் கோவில்', 'பிருந்தாவன் கார்டன்ஸ்', 'ஸ்ரீரங்கப்பட்டினம் பாரம்பரியம்'];
    } else if (dest.id === 'rameswaram') {
      taglineLocal = 'அழகிய கடல் தீவு இராமேஸ்வரம்';
      descLocal = 'புனிதத் தலமான இராமேஸ்வரத்திற்கு பயணம் செய்து புகழ்பெற்ற பாம்பன் கடல் பாலத்தின் அழகை ரசியுங்கள்.';
      attractionsLocal = ['இராமநாதசுவாமி திருக்கோவில்', 'அக்னி தீர்த்தம் கடற்கரை', 'தனுஷ்கோடி புனித கடல் முனை', 'பாம்பன் பாலம் கடல் காட்சி'];
    } else if (dest.id === 'kochi') {
      taglineLocal = 'கேரளாவின் அழகான கடற்கரை நகரம்';
      descLocal = 'போர்ட் கொச்சியின் வரலாற்று வீதிகள், கடல் உப்பங்கழிகள் மற்றும் கடற்கரையை கண்டுகளிக்க ஒரு வசதியான பயணம்.';
      attractionsLocal = ['போர்ட் கொச்சி சீன வலைகள்', 'மட்டஞ்சேரி அரண்மனை', 'மரைன் டிரைவ் உப்பங்கழி உலா', 'வில்லிங்டன் தீவு'];
    } else if (dest.id === 'hyderabad') {
      taglineLocal = 'சுவைகளும் பாரம்பரியமும் நிறைந்த நகரம்';
      descLocal = 'மிகப் பெரிய நான்கு வழிச்சாலையில் ஹைதராபாத்திற்கு அலுப்பில்லாத அதிவிரைவு சொகுசுப் பயணம்.';
      attractionsLocal = ['சார்மினார்', 'கோல்கொண்டா கோட்டை', 'ராமோஜி ஃபிலிம் சிட்டி', 'பிர்லா மந்திர்'];
    }

    return {
      ...dest,
      tagline: taglineLocal,
      description: descLocal,
      popularAttractions: attractionsLocal
    };
  });

  const translatedTestimonials: Testimonial[] = TESTIMONIALS.map(test => {
    if (language === 'en') return test;

    let reviewLocal = test.review;
    let roleLocal = test.role;
    let tripTypeLocal = test.tripType;
    let verifiedRouteLocal = test.verifiedRoute;

    if (test.id === 'rev-1') {
      roleLocal = 'கோவை குடியிருப்பாளர்';
      reviewLocal = 'கோயம்புத்தூரில் எங்கள் குடும்பத்தின் நிரந்தர பயணத் தேர்வு வேதன் டிராவல்ஸ் தான். எங்கள் ஊட்டி பயணத்திற்கு இன்னோவா கிரிஸ்டா காரை முன்பதிவு செய்தோம். டிரைவர் மிகவும் பாதுகாப்பாகவும் பண்பாகவும் மலைப்பாதைகளில் ஓட்டினார்.';
      tripTypeLocal = 'குடும்ப வெளிவட்டார சுற்றுலா';
      verifiedRouteLocal = 'கோயம்புத்தூர் முதல் ஊட்டி வரை';
    } else if (test.id === 'rev-2') {
      roleLocal = 'பள்ளி ஆசிரியை, கோவை';
      reviewLocal = 'கொடைக்கானல் மற்றும் மதுரை சுற்றுப்பயணத்திற்காக டெம்போ டிராவலரை முன்பதிவு செய்தோம். வண்டி மிகவும் சுத்தமாகவும் ஏசி மிக அருமையாகவும் செயல்பட்டது. முதியவர்களான பெற்றோருக்கு மிக வசதியான பயணமாக அமைந்தது.';
      tripTypeLocal = 'குடும்ப விடுமுறை சுற்றுலா';
      verifiedRouteLocal = 'கோவை முதல் மதுரை மற்றும் கொடைக்கானல்';
    } else if (test.id === 'rev-3') {
      roleLocal = 'வேலை செய்யும் தம்பதியினர்';
      reviewLocal = 'கோயம்புத்தூரில் சிறந்த சொகுசு பயணச் சேவை. கொச்சி செல்ல எட்டியோஸ் செடான் முன்பதிவு செய்தோம். எளிமையான முன்பதிவு, சுத்தமான கார், மற்றும் வழிகளை நன்கு அறிந்த ஓட்டுநர் என அனைத்தும் மிகச் சிறப்பு.';
      tripTypeLocal = 'அவுட்ஸ்டேஷன் கார் சவாரி';
      verifiedRouteLocal = 'கோயம்புத்தூர் முதல் கொச்சி வரை';
    }

    return {
      ...test,
      review: reviewLocal,
      role: roleLocal,
      tripType: tripTypeLocal,
      verifiedRoute: verifiedRouteLocal
    };
  });

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      translatedVehicles,
      translatedServices,
      translatedDestinations,
      translatedTestimonials
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
