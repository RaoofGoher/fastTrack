import React from 'react';
import { FaGoogleDrive } from 'react-icons/fa'; // Font Awesome icon for Google Drive
import { Link } from 'react-router-dom';

const ConnectWithDriveCard = () => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">Connect Your Drive</h2>
        <p className="mt-2 text-gray-600">
          Easily connect with your Google Drive to access and manage your files directly.
        </p>
      </div>

      <div className="p-4 bg-gray-100 text-center">
        {/* Redirect to OAuth page */}
        <Link to="https://api.fastrakconnect.com/google-drive-oauth/?redirect_uri=https://your-app-url.com/oauth-callback">
          <button className="flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            <FaGoogleDrive className="w-5 h-5 mr-2" /> Connect with Drive
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ConnectWithDriveCard;
