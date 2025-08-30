import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "@/redux/api/bookApi";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "@/components/Loader";

type BookData = {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
};

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book, isLoading } = useGetBookByIdQuery(id);
  const [updateBook] = useUpdateBookMutation();
  const [bookData, setBookData] = useState<BookData>({
    title: "",
    author: "",
    genre: "FICTION",
    isbn: "",
    description: "",
    copies: 0,
  });

  useEffect(() => {
    if (book?.data) {
      setBookData({
        title: book.data.title,
        author: book.data.author,
        genre: book.data.genre,
        isbn: book.data.isbn,
        description: book.data.description,
        copies: book.data.copies,
      });
    }
  }, [book]);

  if (isLoading) return <Loader />;
  if (!book) return <div>Book not found</div>;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string
  ) => {
    const { value } = e.target;
    setBookData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await updateBook({
        id,
        ...bookData,
        copies: parseInt(bookData.copies.toString()),
      }).unwrap();
      toast("Book updated successfully");
      navigate("/books");
    } catch (error) {
      toast("Failed to update book");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Edit Book</h1>
      <div className="grid gap-4 max-w-md mx-auto">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={bookData.title}
            onChange={(e) => handleInputChange(e, "title")}
          />
        </div>
        <div>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={bookData.author}
            onChange={(e) => handleInputChange(e, "author")}
          />
        </div>
        <div>
          <Label htmlFor="genre">Genre</Label>
          <select
            id="genre"
            value={bookData.genre}
            onChange={(e) => handleInputChange(e, "genre")}
            className="w-full p-2 border rounded-md bg-white text-gray-900
             dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
          >
            <option value="FICTION">Fiction</option>
            <option value="NON_FICTION">Non-Fiction</option>
            <option value="SCIENCE">Science</option>
            <option value="HISTORY">History</option>
            <option value="BIOGRAPHY">Biography</option>
            <option value="FANTASY">Fantasy</option>
          </select>
        </div>
        <div>
          <Label htmlFor="isbn">ISBN</Label>
          <Input
            id="isbn"
            value={bookData.isbn}
            onChange={(e) => handleInputChange(e, "isbn")}
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={bookData.description}
            onChange={(e) => handleInputChange(e, "description")}
          />
        </div>
        <div>
          <Label htmlFor="copies">Copies</Label>
          <Input
            id="copies"
            type="number"
            value={bookData.copies}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value < 0) {
                toast("Copies cannot be negative");
                return;
              }
              handleInputChange(e, "copies");
            }}
          />
        </div>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Book"}
        </Button>
      </div>
    </div>
  );
}
