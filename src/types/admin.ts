/**
 * Future-ready type definitions for Admin Dashboard, Driver Dashboard,
 * Booking Management, and Analytics features.
 *
 * These types define the planned data models. Implementation is deferred
 * to a future phase — only the type architecture is established here.
 */

/** Admin user who can manage bookings, drivers, and view analytics */
export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: 'super_admin' | 'manager' | 'support';
  permissions: AdminPermission[];
  createdAt: string;
  lastLoginAt?: string;
}

export type AdminPermission =
  | 'bookings.read'
  | 'bookings.write'
  | 'bookings.delete'
  | 'drivers.read'
  | 'drivers.write'
  | 'drivers.approve'
  | 'contacts.read'
  | 'analytics.view'
  | 'settings.manage';

/** Full booking record as stored in Firestore */
export interface BookingRecord {
  bookingId: string;
  name: string;
  phoneNumber: string;
  pickupLocation: string;
  destination: string;
  travelDate: string;
  travelTime: string;
  passengerCount: number;
  specialRequirements: string;
  selectedVehicleId: string;
  status: 'PENDING' | 'CONFIRMED' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  assignedDriverId?: string;
  assignedVehicleNumber?: string;
  totalFare?: number;
  createdAt: string;
  updatedAt?: string;
  confirmedBy?: string;
}

/** Driver partner record as stored in Firestore */
export interface DriverRecord {
  driverPartnerId: string;
  driverName: string;
  phoneNumber: string;
  vehicleType: string;
  vehicleNumber: string;
  city: string;
  experience: string;
  status: 'PROVISIONAL' | 'VERIFIED' | 'ACTIVE' | 'SUSPENDED';
  documentsVerified: boolean;
  rating?: number;
  totalTrips?: number;
  createdAt: string;
  verifiedAt?: string;
  verifiedBy?: string;
}

/** Analytics event for tracking user interactions and business metrics */
export interface AnalyticsEvent {
  eventId: string;
  eventType:
    | 'page_view'
    | 'booking_started'
    | 'booking_completed'
    | 'whatsapp_click'
    | 'call_click'
    | 'driver_registration'
    | 'contact_submitted'
    | 'vehicle_selected'
    | 'destination_clicked'
    | 'language_switched';
  metadata?: Record<string, string | number | boolean>;
  timestamp: string;
  sessionId?: string;
  userAgent?: string;
}

/**
 * Dashboard summary stats for the admin overview page.
 * Aggregated from Firestore collections.
 */
export interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  completedBookings: number;
  totalDrivers: number;
  activeDrivers: number;
  totalContacts: number;
  revenueThisMonth?: number;
  bookingsThisWeek: number;
}
