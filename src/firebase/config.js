import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBoqkY4PmYDDFj1aTstFSPLx2R3aBd1444",
  authDomain: "catering-system-de0cb.firebaseapp.com",
  projectId: "catering-system-de0cb",
  storageBucket: "catering-system-de0cb.firebasestorage.app",
  messagingSenderId: "931929643509",
  appId: "1:931929643509:web:434833e9ca997d40ec28bc",
  measurementId: "G-94DMG4745M"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };