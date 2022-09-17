import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCnZ5EEKuvBUBLxZdLeAHtaGofdvbnQQGA",
  authDomain: "ecom-d57d8.firebaseapp.com",
  projectId: "ecom-d57d8",
  storageBucket: "ecom-d57d8.appspot.com",
  messagingSenderId: "174227157547",
  appId: "1:174227157547:web:416bb225c4cd7dc142706e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);