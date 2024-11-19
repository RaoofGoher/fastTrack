// features/mediaSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  video: null, // Stores the video file
  resume: null, // Stores the resume file
  coverLetter: null, // Stores the cover letter file or text
};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    setVideo: (state, action) => {
      state.video = action.payload;
    },
    setResume: (state, action) => {
      state.resume = action.payload;
    },
    setCoverLetter: (state, action) => {
      state.coverLetter = action.payload;
    },
    resetMedia: () => initialState, // Renamed the reset function to match the new slice name
  },
});

export const { setVideo, setResume, setCoverLetter, resetMedia } = mediaSlice.actions;
export default mediaSlice.reducer;
