import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-P8V52NkNXafKY5lYj2oVIeKAJody6hc",
  authDomain: "hackathonapp-ac3d0.firebaseapp.com",
  projectId: "hackathonapp-ac3d0",
  storageBucket: "hackathonapp-ac3d0.appspot.com",
  messagingSenderId: "241841979923",
  appId: "1:241841979923:web:2c365656b8e1441a0335e6",
  measurementId: "G-PWK3NPHGXL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db }
