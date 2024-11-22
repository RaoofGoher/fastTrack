import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const experienceApiSlice = createApi({
  reducerPath: 'experienceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.fastrakconnect.com/' }),
  tagTypes: ['Experience'], // Add tag type for cache management
  endpoints: (builder) => ({
    addExperience: builder.mutation({
      query: (data) => ({
        url: 'application/experience/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Experience'], // Invalidate cache on success
    }),
    updateExperience: builder.mutation({
      query: ({ applicantId, data }) => ({
        url: `application/update-experience/${applicantId}/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Experience'], // Invalidate cache on success
    }),
  }),
});

export const { 
  useAddExperienceMutation, 
  useUpdateExperienceMutation 
} = experienceApiSlice;

export default experienceApiSlice;
