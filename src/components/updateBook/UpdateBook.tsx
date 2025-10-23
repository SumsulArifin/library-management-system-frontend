import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { formSchema } from "@/interface/book/book.zod.schema";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type FormData = z.infer<typeof formSchema>;
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { IBook } from "@/interface/book/book.interface";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { FaRegEdit } from "react-icons/fa";
import { useUpdateBookMutation } from "@/redux/api/baseApi";
interface UpdateDialogProps {
  book: IBook;
}

export function UpdateDialog({ book }: UpdateDialogProps) {
  const [open, setOpen] = useState(false);
  const [updateBook] = useUpdateBookMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (open) {
      reset({
        title: book.title,
        author: book.author,
        image: book.image,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description,
        copies: book.copies,
      });
    }
  }, [open, book, reset]);
  const onSubmit = async (data: FormData) => {
    try {
      await updateBook({ id: book._id!, data: data });

      setOpen(false);
      toast.success("Book update successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update book");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FaRegEdit />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="mb-1 text-xl">Update Book</DialogTitle>
        </DialogHeader>

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

          {/* Genre */}
          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>
            <Input
              id="genre"
              placeholder="Add your genre here"
              {...register("genre")}
            />
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
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
