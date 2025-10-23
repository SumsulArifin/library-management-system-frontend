import toast from "react-hot-toast";
import { Button } from "../ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { IBook } from "@/interface/book/book.interface";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";

import { useNavigate } from "react-router";
import { useCreateBorrowMutation } from "@/redux/api/baseApi";

interface BorrowDialogProps {
  book: IBook;
}

export function BorrowDialog({ book }: BorrowDialogProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const [createBorrow] = useCreateBorrowMutation();

  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (!book || quantity < 1 || !dueDate) {
      toast.error("All fields is required");
      return;
    }
    try {
      const borrowData = {
        book: book._id,
        quantity,
        dueDate,
      };
      await createBorrow(borrowData).unwrap();

      toast.success("Book borrow successfully!");
      navigate("/borrow-summary");
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to book borrow");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black dark:bg-white text-white  dark:text-black font-bold">
          Borrow Book
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Borrow Book</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Copies */}
          <div className="space-y-2">
            <Label htmlFor="copies">Quantity </Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => {
                const num = Number(e.target.value);
                setQuantity(num > 0 ? num : 1);
              }}
              placeholder="Add number of copies"
            />
            {/* Date Picker */}
            <div className="space-y-1">
              <Label className="mb-2">Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? (
                      format(dueDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate ?? undefined}
                    onSelect={(date: Date | undefined) => {
                      if (date) setDueDate(date);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit}>
              Confirm Borrow
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
