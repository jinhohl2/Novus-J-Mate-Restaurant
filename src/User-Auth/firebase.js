// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


/*
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDlqf_xS7dfpwbgF2vYmMrJA7wGmRhSoH4",
  authDomain: "novus-j-mate-restaurant.firebaseapp.com",
  projectId: "novus-j-mate-restaurant",
  storageBucket: "novus-j-mate-restaurant.appspot.com",
  messagingSenderId: "404011935861",
  appId: "1:404011935861:web:6f630cc545a64ab480303c",
  measurementId: "G-FGX3M5W2RT"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export default auth;
*/


import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
//import { initializeApp } from "firebase/app";
//import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlqf_xS7dfpwbgF2vYmMrJA7wGmRhSoH4",
  authDomain: "novus-j-mate-restaurant.firebaseapp.com",
  projectId: "novus-j-mate-restaurant",
  storageBucket: "novus-j-mate-restaurant.appspot.com",
  messagingSenderId: "404011935861",
  appId: "1:404011935861:web:6f630cc545a64ab480303c",
  measurementId: "G-FGX3M5W2RT"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();

export default app;

