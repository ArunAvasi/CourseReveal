import React from "react";
import ViewSchedule from "../components/ViewScedule";
import ClassCardTitle from "../components/ClassCardTitle";
import Student from "../components/Student";

const page = () => {
  return (
    <main>
      <div className="flex flex-col h-screen">
        <div className="font-title flex items-center justify-center text-center mt-5 mb-3 sm:text-7xl  text-6xl">
          <div className="flex flex-col items-center justify-center">
            <ViewSchedule />
            <ClassCardTitle />
          </div>
        </div>
        <div className="flex-grow flex flex-col items-center bg-offGrey rounded-t-3xl p-4 overflow-hidden">
          <div className="text-center sm:text-7xl text-5xl font-subTitle sm:mt-10 mt-5">
            Students
          </div>
          <div className=" bg-lightGrey md:w-3/5 rounded-[3rem] h-subBanner mt-10">
            <div className="w-[98%] overflow-y-auto custom-scrollbar flex flex-col items-center mt-10 h-subBanner custom-scrollbar">
              <Student />
              <Student />
              <Student />
              <Student />
              <Student />
              <Student />
              <Student />
              <Student />
              <Student />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
