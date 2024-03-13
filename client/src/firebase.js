// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import {getAuth} from "firebase/auth";

import { getFirestore,collection,setDoc,doc ,serverTimestamp,getDoc,addDoc,query, where,updateDoc} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyChDniEEQQVuO1gFyAIHsYPDQ0yQggEKT4",
    authDomain: "recursion5.firebaseapp.com",
    projectId: "recursion5",
    storageBucket: "recursion5.appspot.com",
    messagingSenderId: "116808240486",
    appId: "1:116808240486:web:ce2830360d729a81410ca7",
    measurementId: "G-VJKV2GB75E"
  };



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore(app); 

export {app,auth, firestore,collection ,setDoc,doc,getDoc,serverTimestamp,addDoc,query, where,updateDoc};