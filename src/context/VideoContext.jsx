// context/VideoContext.js

import React, { createContext, useState, useContext } from 'react';

// Create VideoContext
const VideoContext = createContext();

// Custom hook to use VideoContext
export const useVideoContext = () => useContext(VideoContext);

// VideoProvider component to wrap your app
export const VideoProvider = ({ children }) => {
  const [video, setVideo] = useState(null);

  return (
    <VideoContext.Provider value={{ video, setVideo }}>
      {children}
    </VideoContext.Provider>
  );
};
