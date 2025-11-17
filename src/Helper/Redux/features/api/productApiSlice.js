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
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/delete-product/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        url: '/create-product',
        method: 'POST',
        body: productData,
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
} = productApiSlice;
