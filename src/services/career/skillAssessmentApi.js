import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const skillAssessmentApi = createApi({
  reducerPath: 'skillApi', // Unique key for the reducer
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.fastrakconnect.com/application/', // Base URL for API
  }),
  endpoints: (builder) => ({
    // Existing POST mutation
    submitSkillsAssessment: builder.mutation({
      query: (data) => ({
        url: 'skills_assessment/', // Endpoint
        method: 'POST',
        body: data,
      }),
    }),
    // New PATCH mutation
    updateSkills: builder.mutation({
      query: ({ applicantId, data }) => ({
        url: `update-skills/${applicantId}/`, // Endpoint with dynamic applicantId
        method: 'PATCH',
        body: data, // Updated skills data
      }),
    }),
  }),
});

export const { useSubmitSkillsAssessmentMutation, useUpdateSkillsMutation } = skillAssessmentApi;
