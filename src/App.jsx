import './App.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnvKn6lF8lJJPIIKk1TDsdi6ZLhzU7log",
  authDomain: "pwmanagerr.firebaseapp.com",
  projectId: "pwmanagerr",
  storageBucket: "pwmanagerr.appspot.com",
  messagingSenderId: "929686227389",
  appId: "1:929686227389:web:8e628278d9596ee914aad4",
  measurementId: "G-FYZXCNXW3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {

  return (
    <h1 className="text-3xl font-bold text-center mt-2">
      Hello world!
    </h1>
  )
}

export default App
