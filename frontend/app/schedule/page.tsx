import React from "react";
import Index from "../components/Index";
import Add from "../components/Add";
import ClassCard from "../components/ClassCard";
import "../globals.css";
import IndexAdd from "../components/IndexAdd";

const page = () => {
  return (
    <main>
      <div className="flex flex-col h-screen">
        <div className="font-title text-center">
          <h1 className="sm:mt-16 sm:text-6xl mt-12 text-5xl font-title text-offWhite">
            Add Your Classes
          </h1>
          <div>
            <IndexAdd/>
          </div>
        </div>
        <div className="h-banner flex justify-center bg-offGrey rounded-t-3xl p-4 ">
          <div className="md:w-3/5 overflow-y-auto custom-scrollbar">
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
