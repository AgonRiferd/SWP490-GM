// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeyk-CdQrrYYqqR8gOMoLAGvMi0aoOH9s",
  authDomain: "swp490-gm.firebaseapp.com",
  projectId: "swp490-gm",
  storageBucket: "swp490-gm.appspot.com",
  messagingSenderId: "308402552624",
  appId: "1:308402552624:web:2a47880f22426cd5ec12f5",
  measurementId: "G-VS22LNV1WB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Firebase storage reference
export const storage = getStorage(app);