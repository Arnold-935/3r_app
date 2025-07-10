// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNCGrbEFF_8L6C8QoUTaYrY28pzcfZm6w",
  authDomain: "lab1-86f7d.firebaseapp.com",
  projectId: "lab1-86f7d",
  storageBucket: "lab1-86f7d.firebasestorage.app",
  messagingSenderId: "14868489164",
  appId: "1:14868489164:web:4281d8b7f5e8e0818a3369"
};

const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
