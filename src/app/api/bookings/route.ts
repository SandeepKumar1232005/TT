import { NextResponse } from 'next/server';
import { db, isFirebaseConfigured } from '@/src/lib/firebaseAdmin';
import { sanitizeText, validatePhone, validateRequiredFields } from '@/src/lib/validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Required fields check
    const requiredFields = ['name', 'phone', 'pickup', 'destination', 'date', 'passengers'];
    const missingFields = validateRequiredFields(body, requiredFields);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, message: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Input sanitization
    const name = sanitizeText(body.name);
    const phone = sanitizeText(body.phone);
    const pickup = sanitizeText(body.pickup);
    const destination = sanitizeText(body.destination);
    const date = sanitizeText(body.date);
    const time = sanitizeText(body.time);
    const passengers = Number(body.passengers);
    const specialRequirements = sanitizeText(body.specialRequirements || '');
    const selectedVehicleId = sanitizeText(body.selectedVehicleId || 'toyota-etios');

    // Phone number format validation (Indian 10-digit)
    if (!validatePhone(phone)) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number format. Must be exactly 10 digits.' },
        { status: 400 }
      );
    }

    // Generate unique booking reference ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `VED-${randomSuffix}-COIMBATORE`;

    // Save details
    const bookingData = {
      bookingId,
      name,
      phoneNumber: phone,
      pickupLocation: pickup,
      destination,
      travelDate: date,
      travelTime: time,
      passengerCount: passengers,
      specialRequirements,
      selectedVehicleId,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    let savedToFirestore = false;
    let configWarning = '';

    if (isFirebaseConfigured() && db) {
      try {
        await db.collection('bookings').doc(bookingId).set(bookingData);
        savedToFirestore = true;
      } catch (err: any) {
        console.error('Firestore booking save error:', err);
        configWarning = 'Firestore write failed, using mock mode: ' + err.message;
      }
    } else {
      console.warn('Firebase Admin not initialized. Simulated booking locally.');
      configWarning = 'Firebase Admin credentials missing. Booking was mock-saved.';
    }

    // Vehicle ID to human-friendly display name mapping
    const vehicleNameMap: Record<string, string> = {
      'toyota-etios': 'Toyota Etios (Sedan)',
      'swift-dzire': 'Swift Dzire (Sedan)',
      'hyundai-accent': 'Hyundai Accent (Sedan)',
      'toyota-innova': 'Toyota Innova (Luxury MUV/SUV)',
      'toyota-innova-crysta': 'Toyota Innova Crysta (Premium MUV/SUV)',
      'suv-scorpio-xuv': 'Mahindra Scorpio / XUV (Luxury SUV)',
      'tempo-traveller': 'Tempo Traveller (VIP Coach)',
    };
    const vehicleDisplayName = vehicleNameMap[selectedVehicleId] || selectedVehicleId;

    // WhatsApp Message text compilation
    const waText = `*NEW BOOKING ENQUIRY*
____________________________________

*Name:* ${name}
*Reference:* ${bookingId}
*Route:* From *${pickup}* to *${destination}*
*Departure Date:* ${date}${time ? ` at ${time}` : ''}
*Passengers:* ${passengers}
*Vehicle Class:* ${vehicleDisplayName}
${specialRequirements ? `*Special Notes:* ${specialRequirements}` : ''}
____________________________________
_Our coordinator will verify these details and confirm your pricing shortly!_`;

    const whatsappUrl = `https://wa.me/919363499428?text=${encodeURIComponent(waText)}`;

    return NextResponse.json({
      success: true,
      message: 'Your booking request has been received. Our team will contact you shortly.',
      bookingId,
      whatsappUrl,
      savedToFirestore,
      warning: configWarning,
      data: bookingData
    });
  } catch (error: any) {
    console.error('API bookings route error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}
