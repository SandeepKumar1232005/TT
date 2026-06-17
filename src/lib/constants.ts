/**
 * Centralized business contact information.
 * Update these values in one place — all components reference this file.
 *
 * TODO: Replace any placeholder values with real business details before go-live.
 */

export const BUSINESS = {
  name: 'Vedan Travels',
  nameUpper: 'VEDAN TRAVELS',

  // Primary contact phone number (used for Call Now, footer, booking confirmations)
  phone: '+919363499428',
  phoneDisplay: '+91 93634 99428',

  // WhatsApp number (may be same as phone)
  whatsapp: '919363499428',

  // Business email
  email: 'vedantravels.booking@gmail.com',

  // Physical address
  address: {
    en: 'Vedan Travels, Avinashi Road, Coimbatore, Tamil Nadu - 641018',
    ta: 'வேதன் டிராவல்ஸ், அவினாசி ரோடு, கோயம்புத்தூர், தமிழ்நாடு - 641018',
  },

  // City & State
  city: 'Coimbatore',
  state: 'Tamil Nadu',
  pincode: '641018',
  country: 'India',

  // Google Maps embed URL for Coimbatore location
  // TODO: Replace with your exact Google Maps place embed URL if available
  googleMapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125322.39942095498!2d76.88537868906246!3d11.01455465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f461b59%3A0x5f3e1e0c7f0e9c0!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',

  // Social media links (TODO: Replace with real URLs)
  social: {
    instagram: '#', // TODO: Add real Instagram URL
    facebook: '#',  // TODO: Add real Facebook URL
    youtube: '#',   // TODO: Add real YouTube URL
  },

  // Website URL (used for SEO, sitemap)
  // TODO: Replace with real domain before deployment
  siteUrl: 'https://vedantravels.in',
} as const;
