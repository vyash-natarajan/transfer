// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';  // Import Firestore

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyASNJ9wSJfJn2ZENQwTijNHy1ojmwLRfFc",
  authDomain: "transfer-288b1.firebaseapp.com",
  projectId: "transfer-288b1",
  storageBucket: "transfer-288b1.appspot.com",
  messagingSenderId: "743896072395",
  appId: "1:743896072395:web:2e7784dec2af0204359b4e",
  measurementId: "G-H7DMK59GP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  // Initialize Firestore

// Export Firestore
export { db };
