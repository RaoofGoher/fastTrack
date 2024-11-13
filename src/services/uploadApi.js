// services/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const uploadApi = createApi({
  reducerPath: 'uploadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.fastrakconnect.com/', // Replace with your API base URL
  }),
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (formData) => ({
        url: 'upload/', // endpoint for uploading
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useUploadFileMutation } = uploadApi;
