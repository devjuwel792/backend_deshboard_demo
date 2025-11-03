import { apiSlice } from './apiSlice';

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Categories endpoints
    getCategories: builder.query({
      query: (params = {}) => ({
        url: '/get-categories',
        params: {
          pageSize: params.limit || 10,
          pageIndex: (params.page - 1) || 0,
        },
      }),
      providesTags: ['Categories'],
    }),
    getCategory: builder.query({
      query: (id) => `/categories/${id}`,
      providesTags: (result, error, id) => [{ type: 'Categories', id }],
    }),
    createCategory: builder.mutation({
      query: (categoryData) => {
        const formData = new FormData();
        formData.append('name', categoryData.name);
        if (categoryData.image) {
          formData.append('image', categoryData.image);
        }
        return {
          url: '/create-category',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Categories'],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...category }) => ({
        url: `/categories/${id}`,
        method: 'PUT',
        body: category,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Categories', id },
        'Categories',
      ],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;
