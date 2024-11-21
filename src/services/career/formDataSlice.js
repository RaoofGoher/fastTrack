// services/formDataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalInfo: {},  // For Personal Info form data
  positionInfo: {},  // For Position Info form data
  professionalExp: {},  // For Position Info form data
  skillAssement: {},  // For Position Info form data
  education: {},  // For Position Info form data
  additionalInfo: {},  // For Position Info form data
  videoIntro: {},  // For Position Info form data
  attachements: {},  // For Position Info form data

  // Add other dynamic steps here...
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    // A generic reducer to update data for any step/component dynamically
    setFormData: (state, action) => {
      const { componentName, data } = action.payload;
      state[componentName] = data;  // Update the object dynamically by component name
    },
    // Reset the form data (optional)
    resetFormData: () => initialState,
  },
});

export const { setFormData, resetFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
