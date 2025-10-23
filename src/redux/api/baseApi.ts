import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  IBook,
  IBooksResponse,
  ICreateBookResponse,
} from "@/interface/book/book.interface";
import { BASE_URL } from "@/config/baseUrl";

type UpdateBookArg = {
  id: string;
  data: Partial<Omit<IBook, "_id">>;
};

interface IGetBooksParams {
  page?: number;
  limit?: number;
}
interface IGetHightCopiesResponse {
  data: IBook[];
}
interface IGetBookByIdResponse {
  data: IBook;
}
type ICreateBookInput = Omit<IBook, "_id">;

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["book", "borrows"],
  endpoints: (builder) => ({
    // Books
    getBooks: builder.query<IBooksResponse, IGetBooksParams>({
      query: ({ page = 1, limit = 10 } = {}) =>
        `/books?page=${page}&limit=${limit}`,
      providesTags: ["book"],
    }),
    getHighestBookCopies: builder.query<IGetHightCopiesResponse, void>({
      query: () => "/books/highest-copies",
      providesTags: ["book"],
    }),
    getBookById: builder.query<IGetBookByIdResponse, { id: string }>({
      query: ({ id }) => `/books/${id}`,
      providesTags: ["book"],
    }),
    createBook: builder.mutation<ICreateBookResponse, ICreateBookInput>({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["book"],
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"],
    }),
    updateBook: builder.mutation<void, UpdateBookArg>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),

    // Borrows
    getBorrowSummary: builder.query({
      query: () => "/borrow",
      providesTags: ["borrows", "book"],
    }),
    createBorrow: builder.mutation({
      query: (borrowData) => ({
        url: "/borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["borrows", "book"],
    }),
  }),
});

export const {
  //book hook
  useGetBooksQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useGetHighestBookCopiesQuery,
  useGetBookByIdQuery,
  // Borrow Hooks
  useGetBorrowSummaryQuery,
  useCreateBorrowMutation,
} = baseApi;
