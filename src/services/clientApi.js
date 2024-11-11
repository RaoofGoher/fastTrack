// services/clientApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const clientApi = createApi({
  reducerPath: 'clientApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.fastrakconnect.com/' }), // Replace '/api' with your API's base URL
  endpoints: (builder) => ({
    addClient: builder.mutation({
      query: (clientData) => ({
        url: 'create-client/', // Replace with your endpoint path
        method: 'POST',
        body: clientData,
      }),
    }),
  }),
});

export const { useAddClientMutation } = clientApi;
