import { NextResponse } from 'next/server';
import { db, isFirebaseConfigured } from '@/src/lib/firebaseAdmin';
import { sanitizeText, validatePhone, validateRequiredFields } from '@/src/lib/validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Required fields check
    const requiredFields = ['name', 'phone', 'message'];
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
    const message = sanitizeText(body.message);

    // Phone number format validation (Indian 10-digit)
    if (!validatePhone(phone)) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number format. Must be exactly 10 digits.' },
        { status: 400 }
      );
    }

    const contactId = `CNT-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;

    // Save details
    const contactData = {
      contactId,
      name,
      phoneNumber: phone,
      message,
      createdAt: new Date().toISOString(),
    };

    let savedToFirestore = false;
    let configWarning = '';

    if (isFirebaseConfigured() && db) {
      try {
        await db.collection('contacts').doc(contactId).set(contactData);
        savedToFirestore = true;
      } catch (err: any) {
        console.error('Firestore contact save error:', err);
        configWarning = 'Firestore write failed: ' + err.message;
      }
    } else {
      console.warn('Firebase Admin not initialized. Simulated contact submission locally.');
      configWarning = 'Firebase Admin credentials missing. Contact inquiry was mock-saved.';
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully. Our team will contact you shortly.',
      contactId,
      savedToFirestore,
      warning: configWarning,
      data: contactData
    });
  } catch (error: any) {
    console.error('API contacts route error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}
