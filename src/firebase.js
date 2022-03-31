// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCs52cC6C2XjmlR_V3F94r-fEpyxbiAE5w",
  authDomain: "sparta-react-basic-41e70.firebaseapp.com",
  projectId: "sparta-react-basic-41e70",
  storageBucket: "sparta-react-basic-41e70.appspot.com",
  messagingSenderId: "1088082740078",
  appId: "1:1088082740078:web:2d1b82785e1ed16c1b777f",
  measurementId: "G-L4HB3MTZY3",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

export const db = getFirestore();
