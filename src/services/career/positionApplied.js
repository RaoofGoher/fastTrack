// positionAppliedSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  positionAppliedFor: '',
};

const positionAppliedSlice = createSlice({
  name: 'positionApplied',
  initialState,
  reducers: {
    setPositionAppliedFor: (state, action) => {
      state.positionAppliedFor = action.payload;
    },
  },
});

export const { setPositionAppliedFor } = positionAppliedSlice.actions;
export default positionAppliedSlice.reducer;
