// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// realtime database
import {getDatabase} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5DJthnMWKeddSkG6mL1W9A1Vq3ucto2k",
  authDomain: "aforos-kmmp.firebaseapp.com",
  databaseURL: "https://aforos-kmmp-default-rtdb.firebaseio.com",
  projectId: "aforos-kmmp",
  storageBucket: "aforos-kmmp.appspot.com",
  messagingSenderId: "1039126706379",
  appId: "1:1039126706379:web:2f2e9327d3bd2fce26c34e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);