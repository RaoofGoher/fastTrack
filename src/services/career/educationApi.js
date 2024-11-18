import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the RTK Query API slice
export const educationApiSlice = createApi({
  reducerPath: 'educationApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.fastrakconnect.com/' }),
  endpoints: (builder) => ({
    submitEducation: builder.mutation({
      query: (educationData) => ({
        url: 'application/education_view/',
        method: 'POST',
        body: educationData,
      }),
    }),
  }),
});

export const { useSubmitEducationMutation } = educationApiSlice;
