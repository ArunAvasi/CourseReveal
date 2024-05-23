"use client";

import React, { useEffect, useState } from "react";
import Index from "../components/Index";
import Add from "../components/Add";
import ClassCard from "../components/ClassCard";
import "../globals.css";
import IndexAdd from "../components/IndexAdd";
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

const page = () => {
  const [classes, setClasses] = useState([]);

  const fetchClasses = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/getClasses", {
        method: "GET",
        credentials: "include", // Include credentials for session-based authentication
      });
      if (response.ok) {
        const data = await response.json();
        setClasses(data.items); // Update this based on your actual data structure
      } else {
        // Handle HTTP errors
        console.error("HTTP Error: " + response.status);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleAddOrDeleteResponse = (response: any) => {
    setClasses(response.items);
  };
  return (
    <main>
      <div className="flex flex-col h-screen">
        <div className="font-title text-center">
          <h1 className="sm:mt-16 sm:text-6xl mt-12 text-5xl font-title text-offWhite">
            Add Your Classes
          </h1>
          <div>
            <IndexAdd onAddition={handleAddOrDeleteResponse} />
          </div>
        </div>
        <div className="h-banner flex justify-center bg-offGrey rounded-t-3xl p-4 ">
          <div className="md:w-3/5 overflow-y-auto custom-scrollbar flex justify-center">
            <div className="w-[98%]">
            {classes.map((classData, index) => (
              <ClassCard key={index} courseData={classData} onAddition={handleAddOrDeleteResponse} />
            ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
