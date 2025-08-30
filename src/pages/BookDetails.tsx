import { useGetBookByIdQuery } from "@/redux/api/bookApi";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/components/Loader";

export default function BookDetails() {
  const { id } = useParams();
  const { data: book, isLoading } = useGetBookByIdQuery(id);

  if (isLoading) return <Loader />;
  if (!book)
    return (
      <div className="text-center text-gray-500 mt-10">Book not found</div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="border border-gray-300 rounded-lg shadow-sm">
        <CardHeader className="bg-gray-100 dark:bg-gray-800 rounded-t-lg p-4">
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {book.data.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-3 text-gray-700 dark:text-gray-300">
          <p>
            <span className="font-medium">Author:</span> {book.data.author}
          </p>
          <p>
            <span className="font-medium">Genre:</span> {book.data.genre}
          </p>
          <p>
            <span className="font-medium">ISBN:</span> {book.data.isbn}
          </p>
          <p>
            <span className="font-medium">Description:</span>{" "}
            {book.data.description || "N/A"}
          </p>
          <p>
            <span className="font-medium">Copies:</span> {book.data.copies}
          </p>
          <p>
            <span className="font-medium">Available:</span>
            <span
              className={
                book.data.available
                  ? "text-green-600 dark:text-green-400 font-semibold"
                  : "text-red-600 dark:text-red-400 font-semibold"
              }
            >
              {book.data.available ? "Yes" : "No"}
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
