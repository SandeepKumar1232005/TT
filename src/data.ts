import { Vehicle, Service, Destination, Testimonial } from './types';

export const VEHICLES: Vehicle[] = [
  {
    id: 'toyota-etios',
    name: 'Toyota Etios',
    category: 'Sedan',
    image: '/images/toyota-etios.png',
    maxPassengers: 4,
    maxLuggage: 3,
    comfortRating: 4.8,
    driverTier: 'Professional Driver',
    features: ['Working Air Conditioning', 'First-Aid Kit', 'Free Water Bottles', 'Daily Newspaper'],
    specs: {
      transmission: 'Manual 5-Speed',
      fuel: 'Diesel / Petrol',
      engineClass: '1.4L / 1.5L Engine'
    },
    acAvailable: true,
    comfortLevel: 'Comfortable Sedan with good legroom',
    suitableFor: 'Ideal For Airport Pick-Up & Outstation Travel'
  },
  {
    id: 'swift-dzire',
    name: 'Maruti Suzuki Swift Dzire',
    category: 'Sedan',
    image: '/images/swift-dzire.png',
    maxPassengers: 4,
    maxLuggage: 2,
    comfortRating: 4.7,
    driverTier: 'Local Coimbatore Driver',
    features: ['Working Air Conditioning', 'Premium Seat Covers', 'Mobile Phone Charger', 'Spotless Dust-Free Cabin'],
    specs: {
      transmission: 'Manual / Automatic',
      fuel: 'Petrol',
      engineClass: '1.2L Engine'
    },
    acAvailable: true,
    comfortLevel: 'Comfortable Sedan with good legroom',
    suitableFor: 'Ideal For Airport Pick-Up & Outstation Travel'
  },
  {
    id: 'hyundai-accent',
    name: 'Hyundai Accent',
    category: 'Sedan',
    image: '/images/hyundai-accent.png',
    maxPassengers: 4,
    maxLuggage: 3,
    comfortRating: 4.7,
    driverTier: 'Polite Express Highway Driver',
    features: ['Working Air Conditioning', 'Ergonomic Seats', 'Spacious Cargo Trunk', 'Clean and Odorless Ride'],
    specs: {
      transmission: 'Manual 5-Speed',
      fuel: 'Diesel / Petrol',
      engineClass: '1.5L Engine'
    },
    acAvailable: true,
    comfortLevel: 'Comfortable passenger deck with soft suspension',
    suitableFor: 'Safe and smooth ride for families'
  },
  {
    id: 'toyota-innova',
    name: 'Toyota Innova',
    category: 'MUV / Executive SUV',
    image: '/images/toyota-innova.png',
    maxPassengers: 7,
    maxLuggage: 4,
    comfortRating: 4.8,
    driverTier: 'Experienced Mountain Driver',
    features: ['Spacious Cabin Layout', 'Rear Air Conditioning Vents', 'Excellent Audio Sound System', 'Generous Legroom'],
    specs: {
      transmission: 'Manual 5-Speed',
      fuel: 'Diesel',
      engineClass: '2.5L D-4D Engine'
    },
    acAvailable: true,
    comfortLevel: 'Excellent highway stability and spacious cabin',
    suitableFor: 'Ideal For outstation pilgrim & sightseeing tours'
  },
  {
    id: 'toyota-innova-crysta',
    name: 'Toyota Innova Crysta',
    category: 'MUV / Executive SUV',
    image: '/images/toyota-innova-crysta.png',
    maxPassengers: 7,
    maxLuggage: 5,
    comfortRating: 5.0,
    driverTier: 'Certified Premium Captain Driver',
    features: ['Comfortable Captain Seats', 'Rear Air Conditioning', 'Free Water Bottles & Tissues', 'Good music system'],
    specs: {
      transmission: 'Automatic / Manual',
      fuel: 'Diesel',
      engineClass: '2.4L Engine'
    },
    acAvailable: true,
    comfortLevel: 'Very comfortable seats with extra space',
    suitableFor: 'Ideal For Family Trips & Long Mountain Journeys'
  },
  {
    id: 'suv-scorpio-xuv',
    name: 'SUV (Mahindra Scorpio / XUV)',
    category: 'MUV / Executive SUV',
    image: '/images/suv-scorpio-xuv.png',
    maxPassengers: 7,
    maxLuggage: 4,
    comfortRating: 4.9,
    driverTier: 'Experienced Highway Driver',
    features: ['Powerful Engine', 'Full Cabin Air Conditioning', 'Music System', 'Luggage Carrier on Top'],
    specs: {
      transmission: 'Manual 6-Speed',
      fuel: 'Diesel',
      engineClass: '2.2L Engine'
    },
    acAvailable: true,
    comfortLevel: 'Comfortable SUV with high seating',
    suitableFor: 'Ideal For Group Travels & Mountain Roads'
  },
  {
    id: 'tempo-traveller',
    name: 'Tempo Traveller',
    category: 'VIP Coach / Mini Bus',
    image: '/images/tempo-traveller.png',
    maxPassengers: 12,
    maxLuggage: 10,
    comfortRating: 4.9,
    driverTier: 'Group Tour Driver',
    features: ['Push-back Reclining Seats', 'Music System with LED Screen', 'Double Air Conditioning', 'Separate Luggage Space'],
    specs: {
      transmission: 'Manual 5-Speed',
      fuel: 'Diesel',
      engineClass: '2.6L Engine'
    },
    acAvailable: true,
    comfortLevel: 'Very spacious and comfortable for large passenger groups',
    suitableFor: 'Ideal For Large Groups, Family Events & Pilgrimages'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'airport-pickup-drop',
    title: 'Airport Pickup & Drop',
    description: 'On-time airport pickup and drop service for individuals, families and business travellers.',
    tagline: 'Always On Time',
    iconName: 'PlaneTakeoff',
    highlights: ['On-time Pickups', 'Driver greets you at the airport', 'Free waiting time if flight is late', 'Easy help with luggage']
  },
  {
    id: 'outstation-trips',
    title: 'Outstation Trips',
    description: 'Travel from Coimbatore to any destination with comfortable vehicles and experienced drivers.',
    tagline: 'Comfortable long-distance travel',
    iconName: 'Navigation',
    highlights: ['Multi-day travel options', 'Experienced drivers who know the routes', 'Safe travel for families', 'Clear and simple billing']
  },
  {
    id: 'corporate-travel',
    title: 'Corporate Travel',
    description: 'Reliable travel service for business meetings, office trips and company travel needs.',
    tagline: 'Professional travel service',
    iconName: 'Briefcase',
    highlights: ['Well-dressed, polite drivers', 'Clean cars', 'On-time service guaranteed', 'Simple booking receipts']
  },
  {
    id: 'temple-tours',
    title: 'Temple Tours',
    description: 'Comfortable travel for temple visits and religious trips.',
    tagline: 'Peaceful pilgrim travel',
    iconName: 'Sparkles',
    highlights: ['Helpful drivers who know temple timings', 'Comfortable vehicles for senior citizens', 'Flexible stops along the way', 'Safe family travel environment']
  },
  {
    id: 'family-trips',
    title: 'Family Trips',
    description: 'Safe and comfortable travel for families and groups.',
    tagline: 'Happy family travels',
    iconName: 'Heart',
    highlights: ['Child-friendly and senior-citizen friendly', 'Spacious vehicles with clean interiors', 'Ac for hot weather', 'Plenty of space for luggage']
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: 'ooty',
    name: 'Coimbatore ➔ Ooty',
    tagline: 'Beautiful Hill Station',
    description: 'Ride up the beautiful mountains from Coimbatore. Enjoy fresh air, tea gardens, and cold weather.',
    image: '/images/ooty.png',
    distanceFromBase: 86,
    estimatedTravelTime: '~2.5 hrs',
    availableVehicleTypes: ['Sedan', 'SUV', 'Innova'],
    popularAttractions: ['Botanical Gardens', 'Ooty Lake Boating', 'Doddabetta Peak View', 'Pykara Waterfalls']
  },
  {
    id: 'kodaikanal',
    name: 'Coimbatore ➔ Kodaikanal',
    tagline: 'Beautiful Mountain Lake and Forests',
    description: 'A quiet mountain town with a beautiful lake and tall pine trees. Perfect place to relax with your family.',
    image: '/images/kodaikanal.png',
    distanceFromBase: 172,
    estimatedTravelTime: '~4.5 hrs',
    availableVehicleTypes: ['Sedan', 'SUV', 'Innova', 'Innova Crysta'],
    popularAttractions: ['Kodaikanal Star Lake', 'Pine Forest', 'Coakers Walkway', 'Pillar Rocks View']
  },
  {
    id: 'munnar',
    name: 'Coimbatore ➔ Munnar',
    tagline: 'Beautiful Tea Hills in Kerala',
    description: 'Beautiful green hills covered with tea plants. Cross into Kerala in a comfortable car.',
    image: '/images/munnar.png',
    distanceFromBase: 156,
    estimatedTravelTime: '~4 hrs',
    availableVehicleTypes: ['Sedan', 'SUV', 'Innova', 'Innova Crysta'],
    popularAttractions: ['Eravikulam National Park', 'Mattupetty Dam', 'ECHO Point', 'Anamudi Peak']
  },
  {
    id: 'bangalore',
    name: 'Coimbatore ➔ Bangalore',
    tagline: 'Garden City of India',
    description: 'Travel on the smooth highway from Coimbatore to Bangalore for business or holidays.',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=800',
    distanceFromBase: 365,
    estimatedTravelTime: '~6.5 hrs',
    availableVehicleTypes: ['Sedan', 'SUV', 'Innova', 'Innova Crysta', 'Tempo Traveller'],
    popularAttractions: ['Bangalore Palace', 'Lalbagh Botanical Gardens', 'Vidhana Soudha', 'Cubbon Park']
  },
  {
    id: 'chennai',
    name: 'Coimbatore ➔ Chennai',
    tagline: 'Capital City of Tamil Nadu',
    description: 'Travel from Coimbatore to Chennai comfortably check out the historic cities and beach side.',
    image: '/images/chennai.png',
    distanceFromBase: 505,
    estimatedTravelTime: '~8 hrs',
    availableVehicleTypes: ['Sedan', 'SUV', 'Innova', 'Innova Crysta', 'Tempo Traveller'],
    popularAttractions: ['Marina Beach', 'Kapaleeshwarar Temple', 'San Thome Basilica', 'Mahabalipuram Shore Temples']
  },
  {
    id: 'madurai',
    name: 'Coimbatore ➔ Madurai',
    tagline: 'Temple City of South India',
    description: 'Visit the famous Meenakshi Amman Temple and other ancient places in Madurai.',
    image: '/images/madurai.png',
    distanceFromBase: 190,
    estimatedTravelTime: '~4 hrs',
    availableVehicleTypes: ['Sedan', 'SUV', 'Innova', 'Innova Crysta'],
    popularAttractions: ['Meenakshi Amman Temple', 'Thirumalai Nayakkar Palace', 'Gandhi Memorial Museum']
  },
  {
    id: 'mysore',
    name: 'Coimbatore ➔ Mysore',
    tagline: 'City of Palaces and Heritage',
    description: 'A comfortable ride from Coimbatore to Mysore to see beautiful palaces, gardens and heritage sites.',
    image: '/images/mysore.png',
    distanceFromBase: 200,
    estimatedTravelTime: '~5 hrs',
    availableVehicleTypes: ['Sedan', 'SUV', 'Innova', 'Innova Crysta'],
    popularAttractions: ['Mysore Palace', 'Chamundi Hills Temple', 'Brindavan Gardens', 'Srirangapatna Heritage']
  },
  {
    id: 'rameswaram',
    name: 'Coimbatore ➔ Rameswaram',
    tagline: 'Beautiful Beach Island',
    description: 'Visit the sacred island of Rameswaram and ride across the famous Pamban Bridge.',
    image: '/images/rameswaram.png',
    distanceFromBase: 340,
    estimatedTravelTime: '~7 hrs',
    availableVehicleTypes: ['Sedan', 'SUV', 'Innova', 'Innova Crysta', 'Tempo Traveller'],
    popularAttractions: ['Ramanathaswamy Temple', 'Agni Theertham Beach', 'Dhanushkodi Ghost Town', 'Pamban Sea Bridge view']
  },
  {
    id: 'kochi',
    name: 'Coimbatore ➔ Kochi',
    tagline: 'Coastal City in Kerala',
    description: 'Enjoy the water lagoons, beautiful beaches, and historic streets of Fort Kochi.',
    image: '/images/kochi.png',
    distanceFromBase: 190,
    estimatedTravelTime: '~4.5 hrs',
    availableVehicleTypes: ['Sedan', 'SUV', 'Innova', 'Innova Crysta'],
    popularAttractions: ['Fort Kochi Chinese Nets', 'Mattancherry Palace', 'Marine Drive Backwater walk', 'Willingdon Island']
  },
  {
    id: 'hyderabad',
    name: 'Coimbatore ➔ Hyderabad',
    tagline: 'Historical City',
    description: 'A smooth highway trip from Coimbatore directly to Hyderabad, famous for food and monuments.',
    image: '/images/hyderabad.png',
    distanceFromBase: 920,
    estimatedTravelTime: '~14 hrs',
    availableVehicleTypes: ['Innova', 'Innova Crysta', 'Tempo Traveller'],
    popularAttractions: ['Charminar', 'Golconda Fort', 'Ramoji Film City', 'Birla Mandir']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Arun Kumar Subramaniam',
    role: 'Coimbatore Resident',
    review: 'Vedan Travels is our regular travel choice in Coimbatore. We booked the Innova Crysta for our family trip to Ooty. The driver was very safe and polite, and drove very well in the mountains.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    tripType: 'Family Outstation Trip',
    verifiedRoute: 'Coimbatore to Ooty'
  },
  {
    id: 'rev-2',
    name: 'Dr. Meera Vasudevan',
    role: 'School Teacher, Coimbatore',
    review: 'We booked the Tempo Traveller for a trip to Kodaikanal and Madurai. The vehicle was completely clean and the AC worked very well. It was a very comfortable and safe trip for my parents.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    tripType: 'Family Vacation',
    verifiedRoute: 'Coimbatore to Madurai and Kodaikanal'
  },
  {
    id: 'rev-3',
    name: 'Vikram & Shreya Sengupta',
    role: 'Working Professionals',
    review: 'Very good travel service in Coimbatore. We booked their Etios sedan for a trip to Kochi. The booking was easy, the car was clean, and the driver knew the route perfectly.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    tripType: 'Outstation Trip',
    verifiedRoute: 'Coimbatore to Kochi'
  }
];
