// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCb_N_yiHDu2hCnxYEAFKtJSpQiQLLTU3s",
  authDomain: "note-presto-com.firebaseapp.com",
  projectId: "note-presto-com",
  storageBucket: "note-presto-com.appspot.com",
  messagingSenderId: "755061726771",
  appId: "1:755061726771:web:9d8496fa9c7dbc07304d46",
  measurementId: "G-ERQYGBNYJM",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
