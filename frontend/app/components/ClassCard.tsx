import React from "react";
import ClassCode from "./ClassCode";
import Section from "./Section";
import ClassName from "./ClassName";
import Close from "./Close";

const ClassCard = () => {
  return (
    <main className="bg-lightGrey my-14  sm:w-[25rem] md:w-[98%] min-w-[19rem] rounded-full">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-center">
          <div className="my-4">
            <div className="flex items-center mb-3">
              <ClassCode />
              <Section />
            </div>
            <div>
              <ClassName />
            </div>
          </div>
        </div>
        <div className="sm:mr-9 mr-7 mt-3.5">
          <Close />
        </div>
      </div>
    </main>
  );
};

export default ClassCard;
