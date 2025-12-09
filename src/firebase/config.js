import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBopCts79EAXMWbL4itDTK1nwX8Bs6_Paw",
  authDomain: "cholo-portfolio.firebaseapp.com",
  projectId: "cholo-portfolio",
  storageBucket: "cholo-portfolio.firebasestorage.app",
  messagingSenderId: "60185625052",
  appId: "1:60185625052:web:7000a2297f7ac7896b4f19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Storage
export const storage = getStorage(app);

export default app;
