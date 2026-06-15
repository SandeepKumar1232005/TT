/**
 * Types representing the domain models of the luxury travelers ecosystem.
 */

export interface Vehicle {
  id: string;
  name: string;
  category: string;
  image: string;
  maxPassengers: number;
  maxLuggage: number;
  comfortRating: number;
  driverTier: string;
  features: string[];
  specs: {
    transmission: string;
    fuel: string;
    engineClass: string;
  };
  acAvailable: boolean;
  comfortLevel: string;
  suitableFor: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  tagline: string;
  iconName: string;
  highlights: string[];
}

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  distanceFromBase: number;
  popularAttractions: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  avatar: string;
  tripType: string;
  verifiedRoute: string;
}

export interface Booking {
  id: string;
  name: string;
  pickup: string;
  destination: string;
  date: string;
  time: string;
  passengerCount: number;
  phoneNumber: string;
  selectedVehicleId: string;
  specialRequirements?: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED';
}
