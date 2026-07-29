// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBHcCafvyvC8lLq3EkpMH7UgY9-DCNmxuI",
  authDomain: "stratebridgeconsultancy.firebaseapp.com",
  projectId: "stratebridgeconsultancy",
  storageBucket: "stratebridgeconsultancy.firebasestorage.app",
  messagingSenderId: "382979058201",
  appId: "1:382979058201:web:d991533b1f727fd7839888"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs };
