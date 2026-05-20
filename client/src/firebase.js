import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfhpAOJFFf8zQg0I2Dn4hvUFQoh6Owxh0",
  authDomain: "mern-ecommerce-35a13.firebaseapp.com",
  projectId: "mern-ecommerce-35a13",
  storageBucket: "mern-ecommerce-35a13.firebasestorage.app",
  messagingSenderId: "117900787465",
  appId: "1:117900787465:web:53314531d61acaecb9ddd8",
  measurementId: "G-FBC8FY5QHX"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();