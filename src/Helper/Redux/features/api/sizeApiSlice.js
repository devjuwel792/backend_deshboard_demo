import { apiSlice } from './apiSlice';

const sizeApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Sizes endpoints
    getSizes: builder.query({
      query: (params = {}) => ({
        url: '/get-size',
        params: {
          pageSize: params.pageSize || 10,
          pageIndex: params.pageIndex || 0,
        },
      }),
      providesTags: ['Sizes'],
    }),
    createSize: builder.mutation({
      query: (sizeData) => ({
        url: '/create-size',
        method: 'POST',
        body: { name: sizeData.name },
      }),
      invalidatesTags: ['Sizes'],
    }),
    updateSize: builder.mutation({
      query: ({ id, ...size }) => ({
        url: `/update-size/${id}`,
        method: 'PUT',
        body: { name: size.name },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Sizes', id },
        'Sizes',
      ],
    }),
    deleteSize: builder.mutation({
      query: (id) => ({
        url: `/delete-size/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Sizes'],
    }),
  }),
});

export const {
  useGetSizesQuery,
  useCreateSizeMutation,
  useUpdateSizeMutation,
  useDeleteSizeMutation,
} = sizeApiSlice;
