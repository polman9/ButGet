// firebaseConfig.js

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQ77cA08Nq3rEpGy_sR3JETohhPCF53fw",
  authDomain: "budget-91e6b.firebaseapp.com",
  projectId: "budget-91e6b",
  storageBucket: "budget-91e6b.appspot.com", // Ensure this has .appspot.com
  messagingSenderId: "45357921698",
  appId: "1:45357921698:ios:db96e55eea6183183feefb",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app); // Use getFirestore to initialize Firestore

export { db };
