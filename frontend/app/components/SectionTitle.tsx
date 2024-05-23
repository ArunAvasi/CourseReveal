import React from "react";

const SectionTitle = ({section}) => {
  return (
    <main className="font-default sm:text-4xl text-3xl ml-3 border-2 border-black rounded-md">
      <div className="sm:m-1 m-[.2rem]">
        {section}
      </div>
    </main>
  );
};

export default SectionTitle;
