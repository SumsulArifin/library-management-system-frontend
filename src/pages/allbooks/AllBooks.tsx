import BookCard from "@/components/bookCard/BookCard";
import Loader from "@/components/loader/Loader";
import { Button } from "@/components/ui/button";
import type { IBook } from "@/interface/book/book.interface";
import { useGetBooksQuery } from "@/redux/api/baseApi";

import { useState } from "react";
import { Helmet } from "react-helmet";

const AllBooks = () => {
  const [page, setPage] = useState(1);
  const limit = 9;
  const {
    data: bookData,
    isLoading,
    isError,
  } = useGetBooksQuery({ page, limit });
  const books: IBook[] = bookData?.data || [];
  const totalPages = bookData?.meta?.totalPages || 1;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader></Loader>
      </div>
    );
  }

  if (isError)
    return (
      <p className="text-center text-destructive">Failed to load books.</p>
    );

  return (
    <div className="w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
      <Helmet>
        <title>All Books</title>
        <meta name="description" content="All Books" />
      </Helmet>
      <h1 className="text-lg lg:text-2xl font-bold mb-5"> All Books </h1>
      {!isLoading && books?.length === 0 ? (
        <p className="text-center text-lg md:text-xl lg:text-3xl font-bold py-6 lg:py-10">
          No books found.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <BookCard book={book} key={book?._id}></BookCard>
            ))}
          </div>

          <div className="flex justify-center items-center mt-10 space-x-2">
            <Button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span className="px-4 font-medium text-lg">{page}</span>
            <Button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllBooks;
