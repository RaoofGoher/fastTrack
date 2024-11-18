import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const additionalInfoApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.fastrakconnect.com/' }),
  endpoints: (builder) => ({
    postAdditionalInfo: builder.mutation({
      query: (data) => ({
        url: 'application/additional_information/',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { usePostAdditionalInfoMutation } = additionalInfoApi;
