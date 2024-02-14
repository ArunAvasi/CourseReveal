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

const Add = ({ sectionNumber }) => {
  const handleSubmit = async (event) => {
    console.log(sectionNumber);

    event.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await fetch("http://127.0.0.1:5000/addClass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for cookies/session
        body: JSON.stringify({ sectionNumber: sectionNumber }), // Include sectionNumber in the request body
      });

      if (response.ok) {
        console.log("Class added successfully");
        // Additional success handling
      } else {
        console.error("Error adding class");
        // Additional error handling
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          type="submit"
          value="Add"
          className="w-14 h-8 rounded-full px-4 bg-offGrey font-subTitle flex items-center justify-center cursor-pointer"
        />
      </form>
    </main>
  );
};

export default Add;
