// store.js
import { configureStore } from '@reduxjs/toolkit';
import { clientApi } from './services/clientApi';
import { orderApi } from './services/orderApi';
import { fastrakApi } from './services/fastrackApi';
import { uploadApi } from './services/uploadApi';
import { personalInfoApi } from './services/career/PersonalInfoApi';
import personalInfoReducer from './services/career/PersonalInfo';  // Directly import the reducer
import positionInformationApi from './services/career/positionInfoApi';
import { experienceApiSlice } from './services/career/experienceApi';
import { skillAssementApi } from './services/career/skillAssessmentApi';
import { educationApiSlice } from './services/career/educationApi';
import { additionalInfoApi } from './services/career/additionalInfo';
import addMediaReducer  from './services/career/addMediaSlice';
import {mediaApi} from './services/career/mediaApi'
import authReducer from './services/career/authSlice'
import { apiSlice } from './services/career/loginApi';

const store = configureStore({
  reducer: {
    [clientApi.reducerPath]: clientApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [fastrakApi.reducerPath]: fastrakApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
    [personalInfoApi.reducerPath]: personalInfoApi.reducer,
    [positionInformationApi.reducerPath]: positionInformationApi.reducer,
    [experienceApiSlice.reducerPath]: experienceApiSlice.reducer,
    [skillAssementApi.reducerPath]: skillAssementApi.reducer,
    [educationApiSlice.reducerPath]: educationApiSlice.reducer,
    [additionalInfoApi.reducerPath]: additionalInfoApi.reducer,
    [mediaApi.reducerPath]: mediaApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    media: addMediaReducer,
    personalInfo: personalInfoReducer,  // Pass the reducer directly
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(clientApi.middleware)
      .concat(orderApi.middleware)
      .concat(fastrakApi.middleware)
      .concat(uploadApi.middleware)
      .concat(personalInfoApi.middleware)
      .concat(positionInformationApi.middleware)
      .concat(experienceApiSlice.middleware)
      .concat(skillAssementApi.middleware)
      .concat(educationApiSlice.middleware)
      .concat(additionalInfoApi.middleware)
      .concat(mediaApi.middleware)
      .concat(apiSlice.middleware),
});

export default store;
