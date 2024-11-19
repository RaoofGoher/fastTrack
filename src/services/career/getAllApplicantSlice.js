// src/features/applications/applicationsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const applicationsApi = createApi({
  reducerPath: 'applicationsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.fastrakconnect.com' }),
  endpoints: (builder) => ({
    fetchApplications: builder.query({
      query: () => '/application/get/all',
    }),
  }),
});

export const { useFetchApplicationsQuery } = applicationsApi;
