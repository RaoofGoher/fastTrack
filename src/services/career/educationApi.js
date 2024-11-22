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
    updateEducation: builder.mutation({
      query: ({ applicantId, updatedData }) => ({
        url: `application/update-education/${applicantId}/`,
        method: 'PATCH',
        body: updatedData,
      }),
    }),
  }),
});

export const { useSubmitEducationMutation, useUpdateEducationMutation } = educationApiSlice;
