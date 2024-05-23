"use client";

import React, { useEffect, useState } from "react";
import ViewSchedule from "../components/ViewScedule";
import ClassCardTitle from "../components/ClassCardTitle";
import Student from "../components/Student";
import {useSearchParams} from 'next/navigation';
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
  const [students, setStudents] = useState([]);
  const [info, setInfo] = useState([]);

  const SectionID = useSearchParams().toString().slice(0, -1);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/ClassStudents", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include", // Include credentials for session-based authentication
        body: JSON.stringify({ sectionNumber: SectionID })
      });
      if (response.ok) {
        const data = await response.json();
        setStudents(data.students); // Update this based on your actual data structure
      } else {
        // Handle HTTP errors
        console.error("HTTP Error: " + response.status);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchInfo = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/getInfo", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include", // Include credentials for session-based authentication
        body: JSON.stringify({ sectionNumber: SectionID })
      });
      if (response.ok) {
        const data = await response.json();
        setInfo(data); // Update this based on your actual data structure
      } else {
        // Handle HTTP errors
        console.error("HTTP Error: " + response.status);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <main>
      <div className="flex flex-col h-screen">
        <div className="font-title flex items-center justify-center text-center mt-5 mb-3 sm:text-7xl  text-6xl">
          <div className="flex flex-col items-center justify-center">
            <ViewSchedule />
            <ClassCardTitle info={info}/>
          </div>
        </div>
        <div className="flex-grow flex flex-col items-center bg-offGrey rounded-t-3xl p-4 overflow-hidden">
          <div className="text-center sm:text-7xl text-5xl font-subTitle sm:mt-10 mt-5">
            Students
          </div>
          <div className=" bg-lightGrey md:w-3/5 rounded-[3rem] h-subBanner mt-10">
            <div className="w-[98%] overflow-y-auto custom-scrollbar flex flex-col items-center h-[85%] mt-10 custom-scrollbar">
            {students.map((student, index) => (
              <Student key={index} student={student} />
            ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
