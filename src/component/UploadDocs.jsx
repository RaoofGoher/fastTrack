import React from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';

const UploadButtonRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = location.state || {};

  const handleRedirect = () => {
    if (!token) {
      console.error("No token found!");
      // Optionally redirect to login or display an error message
      return;
    }

    // Navigate to the DriveForm component with the token in the state
    navigate('/driveform', { state: { token } });
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="flex items-center justify-center">
        {/* Upload button that redirects to the form */}
        <button
          onClick={handleRedirect}
          className="cursor-pointer inline-flex items-center justify-center space-x-2 rounded-md border-2 border-dashed border-blue-400 bg-white px-6 py-4 text-xl font-semibold text-gray-600 hover:bg-gray-100"
        >
          <AiOutlineUpload className="text-2xl text-blue-500" />
          <span>Upload</span>
        </button>
      </div>
    </div>
  );
};

export default UploadButtonRedirect;
