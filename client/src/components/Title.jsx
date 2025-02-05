import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="text-center py-12">
      <h2 className="text-4xl font-bold tracking-tight">
        {text1}
        <span className="text-red-500"> {text2}</span>
      </h2>
      <div className="flex justify-center items-center mt-4">
        <div className="w-20 h-1 bg-red-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default Title;
