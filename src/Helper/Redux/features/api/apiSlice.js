import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

// Custom baseQuery using fetchBaseQuery with authorization header
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers) => {
    const token = Cookies.get("uat");
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('Accept', 'application/json');
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    // Define your endpoints here
    // Example:
    // getUsers: builder.query({
    //   query: () => '/users',
    // }),
  }),
});

export const {
  // Export hooks here
  // Example:
  // useGetUsersQuery,
} = apiSlice;
