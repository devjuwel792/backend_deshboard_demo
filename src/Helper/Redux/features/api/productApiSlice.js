import { apiSlice } from './apiSlice';

const productApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Products endpoints
    getProducts: builder.query({
      query: (params = {}) => ({
        url: '/get-products',
        params: {
          pageSize: params.pageSize || 10,
          pageIndex: params.pageIndex || 0,
          searchText: params.searchText || '',
        },
      }),
      providesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
} = productApiSlice;
