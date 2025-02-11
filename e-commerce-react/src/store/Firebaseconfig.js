
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCJmqZ-w5yaGfmq0II_N1Lp4Ep9LNN0Do0",
  authDomain: "e-commerce-6c75f.firebaseapp.com",
  projectId: "e-commerce-6c75f",
  storageBucket: "e-commerce-6c75f.firebasestorage.app",
  messagingSenderId: "607119719179",
  appId: "1:607119719179:web:1a0a0ed082196c48cc400e",
  measurementId: "G-WD97EXVH25"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);