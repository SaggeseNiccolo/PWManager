import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBnvKn6lF8lJJPIIKk1TDsdi6ZLhzU7log",
    authDomain: "pwmanagerr.firebaseapp.com",
    projectId: "pwmanagerr",
    storageBucket: "pwmanagerr.appspot.com",
    messagingSenderId: "929686227389",
    appId: "1:929686227389:web:8e628278d9596ee914aad4",
    measurementId: "G-FYZXCNXW3G"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
