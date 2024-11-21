import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const personalInfoApi = createApi({
  reducerPath: 'personalInfoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.fastrakconnect.com/application/' }),
  endpoints: (builder) => ({
    // POST request for submitting personal information
    submitPersonalInfo: builder.mutation({
      query: (data) => ({
        url: 'basic_information/',
        method: 'POST',
        body: data,
      }),
    }),
    // PATCH request for updating personal information
    updatePersonalInfo: builder.mutation({
      query: ({ applicantId, data }) => ({
        url: `update-basic-info/${applicantId}/`,
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const { useSubmitPersonalInfoMutation, useUpdatePersonalInfoMutation } = personalInfoApi;
