/**
 * Firebase SDK Initialization (Modular v12)
 * 
 * This file initializes Firebase services using the modular SDK syntax.
 * All credentials are read from environment variables for security.
 * 
 * @see https://firebase.google.com/docs/web/setup
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// ===========================================
// Firebase Configuration from Environment
// ===========================================
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// ===========================================
// Singleton Pattern: Prevent multiple initializations
// (Important for Next.js hot reloading in development)
// ===========================================
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}

// Initialize services
auth = getAuth(app);
db = getFirestore(app);
storage = getStorage(app);

// ===========================================
// Exports
// ===========================================
export { app, auth, db, storage };
export default app;
