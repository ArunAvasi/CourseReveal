"use client";
import React from "react";
import ClassCode from "./ClassCode";
import Section from "./Section";
import ClassName from "./ClassName";
import { useRouter } from "next/navigation";
import Close from "./Close";

const ClassCard = ({ courseData, onAddition }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/classinfo?${courseData.SectionID}`);
  };
  const handleAddOrDeleteResponse = (response: any) => {
    onAddition(response);
  };
  return (
    <main
      onClick={handleClick}
      className="bg-lightGrey my-14  sm:w-[25rem] md:w-[98%] min-w-[19rem] rounded-full active:duration-75 hover:scale-[1.02] ease-in-out transition-all cursor-pointer"
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-center">
          <div className="my-4">
            <div className="flex items-center mb-3">
              <ClassCode code={courseData.code} />
              <Section sect={courseData.sect} />
            </div>
            <div>
              <ClassName name={courseData.ClassName} />
            </div>
          </div>
        </div>
        <div className="sm:mr-9 mr-7 mt-3.5">
          <Close
            sectionNumber={courseData.SectionID}
            onAddResponse={handleAddOrDeleteResponse}
          />
        </div>
      </div>
    </main>
  );
};

export default ClassCard;
