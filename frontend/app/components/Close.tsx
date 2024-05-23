"use client";

import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAOuiVGNP8WTp7ZXsg5NoGXPxCuUBeWLw",
  authDomain: "courselogin-19fbf.firebaseapp.com",
  projectId: "courselogin-19fbf",
  storageBucket: "courselogin-19fbf.appspot.com",
  messagingSenderId: "507655263700",
  appId: "1:507655263700:web:cb550303f67e3ec5947241",
  measurementId: "G-QN0XN1FK9E",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Close = ({ sectionNumber, onAddResponse }) => {
  const handleClick = async (event) => {
    event.stopPropagation(); // Stop the event from bubbling up to parent components
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await fetch("http://127.0.0.1:5000/deleteClass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for cookies/session
        body: JSON.stringify({ sectionNumber: sectionNumber }), // Include sectionNumber in the request body
      });

      if (response.ok) {
        const jsonResponse = await response.json(); // Parse the JSON response
        onAddResponse(jsonResponse);
        // Additional success handling
      } else {
        console.error("Error deleting class");
        // Additional error handling
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main onClick={handleClick} className='bg-offGrey rounded-full w-10 h-10 flex items-center justify-center text-[1.75rem] ml-0 cursor-pointer active:duration-75 hover:scale-[1.1] ease-in-out transition-all'>
      <div className='mb-1'>
        x
      </div>
    </main>
  );
};

export default Close;