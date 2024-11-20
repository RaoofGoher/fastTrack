import React from 'react';
import image from "../../assets/underConstruction.gif"

const UnderConstruction = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        {/* Animated Construction Scene */}
        <div className="relative inline-block mb-6">
          {/* Add an animated construction crane or worker here */}
          <img
            src={image} 
            alt="Construction Crane" 
            className="w-38 h-38  "
          />
        </div>
        
        <h1 className="text-4xl font-semibold text-gray-800 mt-4">Under Construction</h1>
        <p className="text-xl text-gray-600 mt-2">We're working hard to bring this page to life!</p>
      </div>
    </div>
  );
};

export default UnderConstruction;
