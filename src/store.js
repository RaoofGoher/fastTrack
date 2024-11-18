// store.js
import { configureStore } from '@reduxjs/toolkit';
import { clientApi } from './services/clientApi';
import { orderApi } from './services/orderApi';
import { fastrakApi } from './services/fastrackApi';
import { uploadApi } from './services/uploadApi';
import { personalInfoApi } from './services/career/PersonalInfoApi'; 
import personalInfoReducer from './services/career/PersonalInfo';  // Directly import the reducer
import positionInformationApi from './services/career/positionInfoApi';

const store = configureStore({
  reducer: {
    [clientApi.reducerPath]: clientApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [fastrakApi.reducerPath]: fastrakApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
    [personalInfoApi.reducerPath]: personalInfoApi.reducer,
    [positionInformationApi.reducerPath]: positionInformationApi.reducer,
    personalInfo: personalInfoReducer,  // Pass the reducer directly
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(clientApi.middleware)
      .concat(orderApi.middleware)
      .concat(fastrakApi.middleware)
      .concat(uploadApi.middleware)
      .concat(personalInfoApi.middleware)
      .concat(positionInformationApi.middleware),
});

export default store;
