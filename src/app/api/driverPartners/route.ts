import { NextResponse } from 'next/server';
import { db, isFirebaseConfigured } from '@/src/lib/firebaseAdmin';
import { sanitizeText, validatePhone, validateRequiredFields } from '@/src/lib/validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Required fields check
    const requiredFields = ['driverName', 'phoneNumber', 'vehicleType', 'vehicleNumber', 'city', 'experience'];
    const missingFields = validateRequiredFields(body, requiredFields);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, message: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Input sanitization
    const driverName = sanitizeText(body.driverName);
    const phoneNumber = sanitizeText(body.phoneNumber);
    const vehicleType = sanitizeText(body.vehicleType);
    const vehicleNumber = sanitizeText(body.vehicleNumber).toUpperCase(); // Canonical vehicle uppercase
    const city = sanitizeText(body.city);
    const experience = sanitizeText(body.experience);

    // Phone number format validation (Indian 10-digit)
    if (!validatePhone(phoneNumber)) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number format. Must be exactly 10 digits.' },
        { status: 400 }
      );
    }

    // Create unique driver application reference ID
    const randomSuffix = Math.floor(2000 + Math.random() * 8000);
    const driverPartnerId = `VDP-${randomSuffix}`;

    // Save details
    const driverData = {
      driverPartnerId,
      driverName,
      phoneNumber,
      vehicleType,
      vehicleNumber,
      city,
      experience,
      status: 'PROVISIONAL',
      createdAt: new Date().toISOString(),
    };

    let savedToFirestore = false;
    let configWarning = '';

    if (isFirebaseConfigured() && db) {
      try {
        await db.collection('driverPartners').doc(driverPartnerId).set(driverData);
        savedToFirestore = true;
      } catch (err: any) {
        console.error('Firestore driver partner save error:', err);
        configWarning = 'Firestore write failed: ' + err.message;
      }
    } else {
      console.warn('Firebase Admin not initialized. Simulated driver registration locally.');
      configWarning = 'Firebase Admin credentials missing. Driver application was mock-saved.';
    }

    return NextResponse.json({
      success: true,
      message: 'Your driver partner registration request has been received. Our team will contact you shortly.',
      driverPartnerId,
      savedToFirestore,
      warning: configWarning,
      data: driverData
    });
  } catch (error: any) {
    console.error('API driverPartners route error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}
