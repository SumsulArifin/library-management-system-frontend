import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formSchema } from "@/interface/book/book.zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import * as z from "zod";
import { useCreateBookMutation } from "@/redux/api/baseApi";
const genres = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
] as const;

type FormData = z.infer<typeof formSchema>;
const AddBook = () => {
  const navigate = useNavigate();
  const [createBook] = useCreateBookMutation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (data: FormData) => {
    try {
      const bookData = {
        ...data,
        copies: Number(data?.copies),
      };
      await createBook(bookData).unwrap();
      toast.success("Book created successfully!");
      navigate("/books");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create book");
    }
  };
  return (
    <Card className="max-w-2xl mx-auto mt-10">
      <Helmet>
        <title>Add New Book</title>
        <meta name="description" content="Add New Book" />
      </Helmet>

      <CardContent className="p-6">
        <h2 className="text-lg lg:text-2xl font-bold mb-6">Add New Book</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Add your title here"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          {/* Author */}
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              placeholder="Add your author here"
              {...register("author")}
            />
            {errors.author && (
              <p className="text-sm text-destructive">
                {errors.author.message}
              </p>
            )}
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              placeholder="Add your image url here"
              {...register("image")}
            />
            {errors.image && (
              <p className="text-sm text-destructive">{errors.image.message}</p>
            )}
          </div>

          {/* Genre Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>
            <Select
              onValueChange={(value) =>
                setValue("genre", value as FormData["genre"])
              }
            >
              <SelectTrigger id="genre" className="w-full">
                <SelectValue placeholder="Select Genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre.replace("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.genre && (
              <p className="text-sm text-destructive">{errors.genre.message}</p>
            )}
          </div>

          {/* ISBN */}
          <div className="space-y-2">
            <Label htmlFor="isbn">ISBN</Label>
            <Input
              id="isbn"
              placeholder="Add your ISBN here"
              {...register("isbn")}
            />
            {errors.isbn && (
              <p className="text-sm text-destructive">{errors.isbn.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={3}
              placeholder="Add your description here"
              {...register("description")}
            />
          </div>

          {/* Copies */}
          <div className="space-y-2">
            <Label htmlFor="copies">Copies</Label>
            <Input
              id="copies"
              type="number"
              placeholder="Add number of copies"
              {...register("copies", { valueAsNumber: true })}
            />
            {errors.copies && (
              <p className="text-sm text-destructive">
                {errors.copies.message}
              </p>
            )}
          </div>

          {/* Submit */}
          {/* <Button type="submit" disabled={isSubmitting} className="w-full mt-4">
            {isSubmitting ? "Creating..." : "Create Book"}
          </Button> */}
          <Button type="submit" className="w-full mt-4">
            Create Book
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddBook;
