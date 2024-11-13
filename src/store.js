// store.js
import { configureStore } from '@reduxjs/toolkit';
import { clientApi } from './services/clientApi';
import { orderApi } from './services/orderApi';
import { fastrakApi } from './services/fastrackApi';
import { uploadApi } from './services/uploadApi';
const store = configureStore({
  reducer: {
    // Add the clientApi reducer
    [clientApi.reducerPath]: clientApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [fastrakApi.reducerPath]: fastrakApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(clientApi.middleware).concat(orderApi.middleware).concat(fastrakApi.middleware).concat(uploadApi.middleware),
  
});

export default store;
