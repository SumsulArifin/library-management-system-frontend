import Banner from "@/components/banner/Banner";
import BookCard from "@/components/bookCard/BookCard";
import Loader from "@/components/loader/Loader";
import { Button } from "@/components/ui/button";
import { useGetHighestBookCopiesQuery } from "@/redux/api/baseApi";
import { Helmet } from "react-helmet";
import { Link } from "react-router";

const Home = () => {
  const {
    data: bookCopies,
    isLoading,
    isError,
  } = useGetHighestBookCopiesQuery(undefined);
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
  const highestCopies = bookCopies?.data || [];
  return (
    <div className="w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
      <Helmet>
        <title>Library Management System</title>
        <meta name="description" content="Library Management" />
      </Helmet>
      <Banner></Banner>
      <div>
        <h2 className="text-lg lg:text-2xl font-bold mb-5">
          Highest Copies Book
        </h2>
        {!isLoading && highestCopies.length === 0 ? (
          <p className="text-center text-lg md:text-xl lg:text-3xl font-bold py-6 lg:py-10">
            No books found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highestCopies.map((book) => (
              <BookCard book={book} key={book?._id}></BookCard>
            ))}
          </div>
        )}
        <div className="flex justify-center mt-7">
          <Link to="/books">
            <Button>View All Book</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
