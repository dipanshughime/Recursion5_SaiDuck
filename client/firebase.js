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
    // apiKey: "AIzaSyAOutxB8PLl8T3y4-vpBp5zdDgPaq8allk",
    // authDomain: "devignite-5823b.firebaseapp.com",
    // databaseURL: "https://devignite-5823b-default-rtdb.firebaseio.com",
    // projectId: "devignite-5823b",
    // storageBucket: "devignite-5823b.appspot.com",
    // messagingSenderId: "621067507703",
    // appId: "1:621067507703:web:7694fe736c793b424200f2",
    // measurementId: "G-9BJXN9S2E3"
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