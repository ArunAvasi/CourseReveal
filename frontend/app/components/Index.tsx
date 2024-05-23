import React from "react";

const Index = ({ sectionNumber, setSectionNumber }) => {
  return (
    <input 
      type="number" 
      placeholder="Index" 
      value={sectionNumber}
      onChange={(e) => setSectionNumber(e.target.value)}
      className="w-36 font-default h-8 rounded-full px-4 bg-lightGrey"
    />
  );
};

export default Index;
