// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbV8FwWCs2s-tK76bT3wl_vyMBJPdkvz4",
  authDomain: "webscraping-loterias.firebaseapp.com",
  projectId: "webscraping-loterias",
  storageBucket: "webscraping-loterias.appspot.com",
  messagingSenderId: "370959246935",
  appId: "1:370959246935:web:69b8b34ed3b4cb17ce6512",
  measurementId: "G-FL7SNWCQSJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const dbFirestore = getFirestore(app);
export {dbFirestore}