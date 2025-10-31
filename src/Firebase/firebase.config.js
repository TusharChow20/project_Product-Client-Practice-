

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAl_Cki7qZn10JF4Z-AW1LNY0GmuyOWjnM",
  authDomain: "deal-product.firebaseapp.com",
  projectId: "deal-product",
  storageBucket: "deal-product.firebasestorage.app",
  messagingSenderId: "956344685255",
  appId: "1:956344685255:web:fd38983e5d4cf5f8f464e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)