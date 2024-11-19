// Define the API using RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mediaApi = createApi({
  reducerPath: 'mediaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.fastrakconnect.com/' }),
  endpoints: (builder) => ({
    uploadMedia: builder.mutation({
      query: (formData) => ({
        url: 'application/Media_uploadsView/',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useUploadMediaMutation } = mediaApi;
