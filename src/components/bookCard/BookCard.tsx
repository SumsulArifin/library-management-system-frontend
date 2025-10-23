import { cn } from "@/lib/utils";
import { HiViewGridAdd } from "react-icons/hi";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import type { IBook } from "@/interface/book/book.interface";

import toast from "react-hot-toast";
import { UpdateDialog } from "../updateBook/UpdateBook";
import { DeleteDialog } from "../deleteBook/DeleteBook";
import { BorrowDialog } from "../borrowBook/BorrowBook";
import { useDeleteBookMutation } from "@/redux/api/baseApi";

import { Link } from "react-router";
import { Button } from "../ui/button";

interface IPops {
  book: IBook;
}

const BookCard = ({ book }: IPops) => {
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async () => {
    try {
      await deleteBook(book._id!);
      toast.success("Book Deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Book Deleted failed!");
    }
  };
  return (
    <div>
      <Card className="shadow-lg bg-white dark:bg-[#171717] dark:text-white">
        <CardHeader className="">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-80 object-cover rounded-md"
          />
          <CardTitle className="text-xl mt-2">{book.title}</CardTitle>
          <CardDescription>by {book.author}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          <p>
            <strong>Genre:</strong> {book.genre}
          </p>
          <p>
            <strong>ISBN:</strong> {book.isbn}
          </p>
          <p>
            <strong>Copies:</strong> {book.copies}
          </p>
          <p>
            <span
              className={cn({
                "text-green-500": book?.available,
                "text-red-500": !book?.available,
              })}
            >
              {book.available ? "Available" : "Unavailable"}
            </span>
          </p>
        </CardContent>
        <CardFooter className="flex justify-between gap-2 mt-5">
          {/* Borrow Button */}
          <BorrowDialog book={book} />

          <Button className="" variant="outline">
            <Link to={`/books/${book._id} `}>
              <HiViewGridAdd />
            </Link>
          </Button>

          {/* Edit Button */}
          <UpdateDialog book={book} />
          {/* Delete Button */}
          <DeleteDialog onDelete={handleDelete} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookCard;
