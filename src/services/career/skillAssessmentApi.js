import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const  skillAssementApi = createApi({
  reducerPath: 'api', // Unique key for the reducer
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.fastrakconnect.com/', // Base URL for API
  }),
  
  endpoints: (builder) => ({
    submitSkillsAssessment: builder.mutation({
      query: (data) => ({
        url: 'application/skills_assessment/', // Endpoint
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSubmitSkillsAssessmentMutation } =  skillAssementApi;
