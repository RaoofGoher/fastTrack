import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'loginApi', // Optional, default is 'api'
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.fastrakconnect.com/', // Base URL for all endpoints
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: 'user_admin/login/', // Endpoint path
        method: 'POST',
        body: credentials, // { email: '', password: '' }
      }),
    }),
  }),
});

export const { useLoginUserMutation } = apiSlice;
