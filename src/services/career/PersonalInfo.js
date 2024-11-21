// slices/personalInfoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  applicantId: null, // Store the applicantId
};

const personalInfo = createSlice({
  name: 'personalInfo',
  initialState,
  reducers: {
    setApplicantId: (state, action) => {
      state.applicantId = action.payload;
    },
  },
});

export const { applicantId, setApplicantId } = personalInfo.actions;
export default personalInfo.reducer;
