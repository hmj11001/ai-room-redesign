// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "api-room-redesign.firebaseapp.com",
  projectId: "api-room-redesign",
  storageBucket: "api-room-redesign.firebasestorage.app",
  messagingSenderId: "167816885363",
  appId: "1:167816885363:web:246d5c03bb7c319868a606",
  measurementId: "G-M5T6ZY2PPR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)