"use client";

import React, { useState } from "react";
import Add from "./Add";
import Index from "./Index"; // Assuming you have an Index component

const IndexAdd = ({onAddition}) => {
  const [sectionNumber, setSectionNumber] = useState("");
  const handleAddResponse = (response: any) => {
    onAddition(response)
  };
  return (
    <main className="flex items-center justify-center gap-4 my-10">
      <Index
        sectionNumber={sectionNumber}
        setSectionNumber={setSectionNumber}
      />
      <Add sectionNumber={sectionNumber} onAddResponse={handleAddResponse} />
    </main>
  );
};

export default IndexAdd;
