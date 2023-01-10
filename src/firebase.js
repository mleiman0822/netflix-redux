// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQJi27UPuw10NgF3MP61poJnMY9XEUdLI",
  authDomain: "netflix-clone-3406b.firebaseapp.com",
  projectId: "netflix-clone-3406b",
  storageBucket: "netflix-clone-3406b.appspot.com",
  messagingSenderId: "90521011156",
  appId: "1:90521011156:web:6e8844f72dd8f91e160c41"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export {auth, db}
