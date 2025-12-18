// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCRrrYulWeDtKbnwU-eLQBwIPIxJLNUOHk",
  authDomain: "pajak-koe.firebaseapp.com",
  projectId: "pajak-koe",
  storageBucket: "pajak-koe.firebasestorage.app",
  messagingSenderId: "767990011162",
  appId: "1:767990011162:web:e599f37e18928a5b9608a3",
  measurementId: "G-HYNZNHTZ8P",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
