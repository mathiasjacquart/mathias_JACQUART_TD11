// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZoDWoXvUdoB-0TjoxbQjuhuXbTxTJM74",
  authDomain: "vidfuse-imgstorage.firebaseapp.com",
  projectId: "vidfuse-imgstorage",
  storageBucket: "vidfuse-imgstorage.appspot.com",
  messagingSenderId: "354311256995",
  appId: "1:354311256995:web:28b527946700e7f53a7816",
  measurementId: "G-XJCZ010P16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app