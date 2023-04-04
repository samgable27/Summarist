// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2QmqQDVCSSyTwjgRNgXFB61jJr8cpPTc",
  authDomain: "sam-virtualinternshipv2.firebaseapp.com",
  projectId: "sam-virtualinternshipv2",
  storageBucket: "sam-virtualinternshipv2.appspot.com",
  messagingSenderId: "1093148466180",
  appId: "1:1093148466180:web:d554b5cb7e306150b42951",
  measurementId: "G-B5BRMH6W7R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
