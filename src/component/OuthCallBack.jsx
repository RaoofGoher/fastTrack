import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('access_token'); // Extract token from URL
    console.log("hello", queryParams,token)
    if (token) {
      // Store the token in localStorage or use other secure methods
      localStorage.setItem('driveToken', token);

      // Redirect to the upload page after successful token retrieval
      navigate('/uploaddocs', {
        state: {
          token: token,
        },
      });  // Redirects to the Upload component
    } else {
      console.error('Token not found');
    }
  }, [navigate]);

  return <div>Redirecting...</div>;
};

export default OAuthCallback;
