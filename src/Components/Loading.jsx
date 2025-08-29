import React from "react";
//
const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-3">
        <div className="w-12 h-12 border-4 border-green-800 border-dashed rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
