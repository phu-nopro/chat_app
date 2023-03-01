import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
    apiKey: "AIzaSyDYrwYwhbltSnxfCjTqPC9uOno2vE3Ri74",
    authDomain: "chatapp-f5c46.firebaseapp.com",
    projectId: "chatapp-f5c46",
    storageBucket: "chatapp-f5c46.appspot.com",
    messagingSenderId: "87821793554",
    appId: "1:87821793554:web:1efbf6a1b05c414dae1bcb",
    measurementId: "G-LWWPLM3WG2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore()
export const storage = getStorage();
// const analytics = getAnalytics(app);