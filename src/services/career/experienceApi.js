// src/features/experience/experienceApiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const experienceApiSlice = createApi({
  reducerPath: 'experienceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.fastrakconnect.com/' }),
  endpoints: (builder) => ({
    addExperience: builder.mutation({
      query: (data) => ({
        url: 'application/experience/',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useAddExperienceMutation } = experienceApiSlice;
