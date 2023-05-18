import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todoSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3600' }),
  endpoints: (builder) => ({
    getTodoList: builder.query({
      query: () => '/todos',
      //if b.id - a.id is less than 0, minus, then b will put in front of a
      //this method will do with the response value if we need, this place is to sort the content according to id
      transformResponse: (result) => result.sort((a, b) => b.id - a.id),
      providesTags: ['todo'],
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: '/todos',
        method: 'POST', // it can use both upper and lower cases
        body: todo,
      }),
      invalidatesTags: ['todo'],
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: 'PATCH',
        body: todo,
      }),
      invalidatesTags: ['todo'],
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['todo'],
    }),
  }),
});

export const {
  useGetTodoListQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoSlice;
