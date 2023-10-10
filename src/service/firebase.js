// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/app";
import "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCapRMCLX3Cbqzj3zC3rarBmGGbh-IDqs",
  authDomain: "picme-firebase-df08a.firebaseapp.com",
  projectId: "picme-firebase-df08a",
  storageBucket: "picme-firebase-df08a.appspot.com",
  messagingSenderId: "177494434408",
  appId: "1:177494434408:web:f680875e3f392686c2d1dd",
  measurementId: "G-TS8W9Q9DNR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebase;
