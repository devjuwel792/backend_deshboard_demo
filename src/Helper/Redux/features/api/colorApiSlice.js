import { apiSlice } from './apiSlice';

const colorApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Colors endpoints
    getColors: builder.query({
      query: (params = {}) => ({
        url: '/get-colors',
        params: {
          pageSize: params.pageSize || 10,
          pageIndex: params.pageIndex || 0,
        },
      }),
      providesTags: ['Colors'],
    }),
    createColor: builder.mutation({
      query: (colorData) => ({
        url: '/create-color',
        method: 'POST',
        body: { name: colorData.name },
      }),
      invalidatesTags: ['Colors'],
    }),
    updateColor: builder.mutation({
      query: ({ id, ...color }) => ({
        url: `/update-color/${id}`,
        method: 'PUT',
        body: { name: color.name },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Colors', id },
        'Colors',
      ],
    }),
    deleteColor: builder.mutation({
      query: (id) => ({
        url: `/delete-color/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Colors'],
    }),
  }),
});

export const {
  useGetColorsQuery,
  useCreateColorMutation,
  useUpdateColorMutation,
  useDeleteColorMutation,
} = colorApiSlice;
