import React from "react";
import ClassCodeTitle from "./ClassCodeTitle";
import SectionTitle from "./SectionTitle";
import ClassNameTitle from "./ClassNameTitle";
import Close from "./Close";

const ClassCardTitle = () => {
  return (
    <main className="bg-lightGrey my-6  sm:w-[25rem] md:w-140 min-w-[19rem] rounded-full">
        <div className="flex flex-col justify-center">
          <div className="my-4">
            <div className="flex items-center justify-center mb-3">
              <ClassCodeTitle />
              <SectionTitle />
            </div>
            <div>
              <ClassNameTitle />
            </div>
          </div>
        </div>
        
      
    </main>
  );
};

export default ClassCardTitle;
