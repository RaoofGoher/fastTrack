import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fastrakApi = createApi({
  reducerPath: 'fastrakApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.fastrakconnect.com/' }),
  endpoints: (builder) => ({
    createOrderBilling: builder.mutation({
      query: ({ orderId, payload }) => ({
        url: `create-order-billing/${orderId}/`, // Using orderId in the URL
        method: 'POST',
        body: payload, // Sending the payload in the request body
      }),
    }),
  }),
});

export const { useCreateOrderBillingMutation } = fastrakApi;
