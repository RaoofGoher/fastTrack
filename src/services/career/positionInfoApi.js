import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const positionInformationApi = createApi({
  reducerPath: 'positionInformationApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.fastrakconnect.com' }),
  endpoints: (builder) => ({
    submitPositionInformation: builder.mutation({
      query: (payload) => ({
        url: '/application/position_information/',
        method: 'POST',
        body: payload,
      }),
    }),
    updatePositionInformation: builder.mutation({
      query: ({ applicantId, payload }) => ({
        url: `/application/update-position-info/${applicantId}/`,
        method: 'PATCH',
        body: payload,
      }),
    }),
  }),
});

export const { 
  useSubmitPositionInformationMutation, 
  useUpdatePositionInformationMutation 
} = positionInformationApi;

export default positionInformationApi;
