import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCno19dheUb-E4lfp4Hip93D9MkGKs3MBw",
  authDomain: "reactauthtutorial-2cf61.firebaseapp.com",
  projectId: "reactauthtutorial-2cf61",
  storageBucket: "reactauthtutorial-2cf61.appspot.com",
  messagingSenderId: "697533683576",
  appId: "1:697533683576:web:f1681d0936460c0980da8d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export default app;