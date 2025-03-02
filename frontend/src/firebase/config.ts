import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAnalytics, Analytics, setAnalyticsCollectionEnabled } from 'firebase/analytics';

// Firebase configuration - using Vite environment variables format
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "czepbuilds-d99da.firebaseapp.com",
  projectId: "czepbuilds-d99da",
  storageBucket: "czepbuilds-d99da.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase with error handling
let firebaseApp: FirebaseApp;
let auth: Auth;
let db: Firestore;
let analytics: Analytics;

try {
  firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);
  
  // Initialize analytics but respect user privacy
  analytics = getAnalytics(firebaseApp);
  
  // Disable analytics by default until user consent
  setAnalyticsCollectionEnabled(analytics, false);
  
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase:", error);
  throw error; // Re-throw the error so we can catch it higher up if needed
}

export { firebaseApp, auth, db, analytics, setAnalyticsCollectionEnabled }; 