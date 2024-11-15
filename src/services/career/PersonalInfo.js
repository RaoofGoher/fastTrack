// slices/personalInfoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  applicantId: null, // Store the applicantId
};

const personalInfoSlice = createSlice({
  name: 'personalInfo',
  initialState,
  reducers: {
    setApplicantId: (state, action) => {
      state.applicantId = action.payload;
    },
  },
});

export const { setApplicantId } = personalInfoSlice.actions;
export default personalInfoSlice.reducer;
