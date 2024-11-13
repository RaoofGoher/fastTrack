import React from 'react';
import { Link } from 'react-router-dom'; // For navigation
import { AiOutlineUpload } from 'react-icons/ai';

const UploadButtonRedirect = () => {
  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="flex items-center justify-center">
        <Link
          to="/driveform" // Using Link for declarative navigation
          className="cursor-pointer inline-flex items-center justify-center space-x-2 rounded-md border-2 border-dashed border-gray-400 bg-white px-6 py-4 text-xl font-semibold text-gray-600 hover:bg-gray-100"
        >
          <AiOutlineUpload className="text-2xl" />
          <span>Upload</span>
        </Link>
      </div>
    </div>
  );
};

export default UploadButtonRedirect;
