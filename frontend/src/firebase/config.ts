import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAnalytics, Analytics, setAnalyticsCollectionEnabled } from 'firebase/analytics';

// Check for environment variables
const hasEnvVars = 
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID &&
  import.meta.env.VITE_FIREBASE_APP_ID &&
  import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;

// Firebase configuration - using Vite environment variables format
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "placeholder-api-key",
  authDomain: "czepbuilds-d99da.firebaseapp.com",
  projectId: "czepbuilds-d99da",
  storageBucket: "czepbuilds-d99da.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "placeholder-sender-id",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "placeholder-app-id",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "placeholder-measurement-id"
};

// Initialize Firebase with error handling
let firebaseApp: FirebaseApp;
let auth: Auth;
let db: Firestore;
let analytics: Analytics | null = null;

try {
  if (!hasEnvVars) {
    console.warn("Firebase environment variables are missing. Using mock Firebase functionality.");
  }
  
  firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);
  
  // Only initialize analytics if in browser and env vars exist
  if (typeof window !== 'undefined' && hasEnvVars) {
    // Initialize analytics but respect user privacy
    analytics = getAnalytics(firebaseApp);
    
    // Disable analytics by default until user consent
    setAnalyticsCollectionEnabled(analytics, false);
  }
  
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase:", error);
  // Create fallback objects for development
  firebaseApp = {} as FirebaseApp;
  auth = {} as Auth;
  db = {} as Firestore;
}

export { firebaseApp, auth, db, analytics, setAnalyticsCollectionEnabled }; 