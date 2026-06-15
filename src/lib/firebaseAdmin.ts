import { getApps, initializeApp, cert, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let app;
const apps = getApps();

if (!apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  // Make sure private key is handled correctly for environment variables
  const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    : undefined;

  if (projectId && clientEmail && privateKey) {
    try {
      app = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
      console.log('Firebase Admin SDK initialized via Service Account credentials.');
    } catch (err) {
      console.error('Failed to initialize Firebase Admin SDK with credentials:', err);
    }
  } else if (projectId) {
    // If only project ID is available, try standard initialization
    try {
      app = initializeApp({
        projectId,
      });
      console.log('Firebase Admin SDK initialized with project ID only.');
    } catch (err) {
      console.error('Failed to initialize Firebase Admin SDK with Project ID:', err);
    }
  } else {
    try {
      app = initializeApp();
      console.log('Firebase Admin SDK initialized with default application credentials.');
    } catch (err) {
      console.warn('Firebase Admin configuration is missing. Firestore writes will run in mock/unconfigured mode.');
    }
  }
} else {
  app = getApp();
}

// Export the Firestore database instance
export const db = getApps().length ? getFirestore() : null;

/**
 * Helper to check if Firebase is configured.
 */
export function isFirebaseConfigured(): boolean {
  return db !== null;
}
