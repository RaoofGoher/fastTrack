import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const additionalInfoApi = createApi({
  reducerPath: 'skillapi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.fastrakconnect.com/' }),
  endpoints: (builder) => ({
    postAdditionalInfo: builder.mutation({
      query: (data) => ({
        url: 'application/additional_information/',
        method: 'POST',
        body: data,
      }),
    }),
    updateAdditionalInfo: builder.mutation({
      query: ({ applicantId, data }) => ({
        url: `application/update-additional-info/${applicantId}/`,
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const { usePostAdditionalInfoMutation, useUpdateAdditionalInfoMutation } = additionalInfoApi;
