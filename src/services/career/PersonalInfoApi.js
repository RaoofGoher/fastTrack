// services/personalInfoApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const personalInfoApi = createApi({
  reducerPath: 'personalInfoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.fastrakconnect.com/application/' }), // Set your base URL here
  endpoints: (builder) => ({
    submitPersonalInfo: builder.mutation({
      query: (data) => ({
        url: 'basic_information/', // Adjust the endpoint as necessary
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSubmitPersonalInfoMutation } = personalInfoApi;
