import React, { useState } from 'react'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { GoogleAuthProvider, getAuth, signInWithRedirect, signInAnonymously, signOut, signInWithEmailAndPassword } from "firebase/auth";

function App() {

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
  const analytics = getAnalytics(app);

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const anonymously = () => {
    signInAnonymously(auth)
      .then((userCredential) => {
        // Signed in..
        const user = userCredential.user;
        console.log("Logged in");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  const signInWithGoogle = () => {
    signInWithRedirect(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setLoggedIn(true);
        console.log("Logged in");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  const signInWithEmail = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  const out = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Signed out");
      }).catch((error) => {
        // An error happened.
        console.log(error);
      });
  }

  const [loggedIn, setLoggedIn] = useState(false);

  if (loggedIn) {
    return (
      <div className="flex h-screen px-2 justify-center items-center">
        <div className="bg-gray-800 rounded-2xl w-4/5 h-4/5 justify-around items-center flex flex-col">
          <div className="font-bold text-4xl mb-4">Hello World</div>
          <button onClick={out} className="mb-4 bg-gray-900 text-gray-300 font-bold rounded-2xl px-4 py-2 hover:animate-pulse hover:bg-blue-800 transition">Sign out</button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex h-screen px-2 justify-center items-center">
        <div className="bg-gray-800 rounded-2xl w-4/5 h-4/5 justify-center items-center flex flex-col space-y-4">
          <p className="font-bold text-5xl">Hello World</p>
          {/* <div className="flex flex-col space-y-2">
            <input type="email" name="email" id="email" placeholder='Email' className='placeholder:text-gray-800 text-gray-800 p-2 rounded-xl' />
            <input type="password" name="password" id="password" placeholder='Password' className='placeholder:text-gray-800 text-gray-800 p-2 rounded-xl' />
            <button onClick={signInWithEmail} className="mb-4 bg-gray-900 text-gray-300 font-bold rounded-2xl px-4 py-2 hover:animate-pulse hover:bg-blue-800 transition">Sign in with email</button>
          </div> */}
          <button
            onClick={signInWithGoogle}
            className="bg-gray-900 text-gray-300 font-bold rounded-2xl px-4 py-2 hover:animate-pulse hover:bg-blue-800 transition"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    )
  }
}

export default App
