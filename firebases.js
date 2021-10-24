import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API,
    authDomain: "avian-cat-300313.firebaseapp.com",
    projectId: "avian-cat-300313",
    storageBucket: "avian-cat-300313.appspot.com",
    messagingSenderId: "113933459040",
    appId: "1:113933459040:web:69edde0a4822529ff6ad05",
    measurementId: "G-5Z0DYN6E1Q"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const rdb = getDatabase();
  export {db,rdb};