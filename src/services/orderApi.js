// src/services/orderApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.fastrakconnect.com/' }), // Replace with your API base URL
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: 'create-order/',
        method: 'POST',
        body: orderData,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
