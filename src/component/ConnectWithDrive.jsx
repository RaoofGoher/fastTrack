import React, { useEffect } from 'react';
import { FaGoogleDrive } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConnectWithDriveCard = () => {
  const navigate = useNavigate();

  const checkOAuthStatus = async () => {
    try {
      const response = await axios.get('https://api.fastrakconnect.com/check-oauth-status');
      if (response.data.success) {
        console.log('OAuth Success:', response.data);
        navigate('/your-form-page'); // Redirect user to the form page
      } else {
        console.error('OAuth Error:', response.data.error);
      }
    } catch (error) {
      console.error('Error checking OAuth status:', error);
    }
  };

  useEffect(() => {
    // Optionally start polling for OAuth success
    const intervalId = setInterval(checkOAuthStatus, 3000); // Check every 3 seconds

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  const handleConnectClick = () => {
    // Redirect user to the Google OAuth URL
    window.location.href = 'https://api.fastrakconnect.com/google-drive-oauth/';
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">Connect Your Drive</h2>
        <p className="mt-2 text-gray-600">
          Easily connect with your Google Drive to access and manage your files directly.
        </p>
      </div>
      <div className="p-4 bg-gray-100 text-center">
        <button
          onClick={handleConnectClick}
          className="flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          <FaGoogleDrive className="w-5 h-5 mr-2" /> Connect with Drive
        </button>
      </div>
    </div>
  );
};

export default ConnectWithDriveCard;
