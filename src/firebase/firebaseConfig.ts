// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCht34j9yB9AaUyWbK0hsFnV4Wjd-muztk",
  authDomain: "carapp-57ae6.firebaseapp.com",
  projectId: "carapp-57ae6",
  storageBucket: "carapp-57ae6.appspot.com", 
  messagingSenderId: "858614598224",
  appId: "1:858614598224:web:eb1e13bd1d964d38679f55",
  measurementId: "G-SWJN48TLQD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
