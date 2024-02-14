'use client';

import React from "react";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import { useRouter } from 'next/navigation';


// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAOuiVGNP8WTp7ZXsg5NoGXPxCuUBeWLw",
  authDomain: "courselogin-19fbf.firebaseapp.com",
  projectId: "courselogin-19fbf",
  storageBucket: "courselogin-19fbf.appspot.com",
  messagingSenderId: "507655263700",
  appId: "1:507655263700:web:cb550303f67e3ec5947241",
  measurementId: "G-QN0XN1FK9E"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const SignInWithGoogle = () => {
  const router = useRouter();
  const signIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // The signed-in user info.
        var user = result.user;
        console.log(user)
        // Get the ID token of the user
        user.getIdToken().then(function(idToken) {
            // Send the ID token to the backend
            fetch('http://127.0.0.1:5000/verifyToken', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idToken: idToken })
            }).then(function(response) {
                if (response.ok) {
                    // Redirect to home page
                    router.push('/schedule');
                } else {
                    // Handle error
                    console.error('Error:', response);
                }
            });
        });
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // Display the error message
        // document.getElementById('error-message').innerText = errorMessage;
        console.log(errorMessage)

    });
  };
  return (
    <div
      className="flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.02] ease-in-out transition-all bg-slate-50 h-16 w-72 rounded-full cursor-pointer"
      onClick={signIn}
    >
      <svg viewBox="0 0 48 48" className="h-10">
        <title>Google Logo</title>
        <clipPath id="g">
          <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
        </clipPath>
        <g className="colors" clip-path="url(#g)">
          <path fill="#FBBC05" d="M0 37V11l17 13z" />
          <path fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
          <path fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
          <path fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
        </g>
      </svg>
      Sign In With Google
    </div>
  );
};
export default SignInWithGoogle;
