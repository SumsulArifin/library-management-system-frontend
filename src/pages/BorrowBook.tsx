import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBorrowBookMutation } from "@/redux/api/bookApi";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

type BorrowData = {
  book: string;
  quantity: number;
  dueDate: string;
};

export default function BorrowBook() {
  const { bookId } = useParams();
  const [borrowBook, { isLoading }] = useBorrowBookMutation();
  const navigate = useNavigate();
  const [borrowData, setBorrowData] = useState<BorrowData>({
    book: bookId || "",
    quantity: 1,
    dueDate: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { value } = e.target;
    setBorrowData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await borrowBook({
        ...borrowData,
        quantity: parseInt(borrowData.quantity.toString()),
      }).unwrap();
      toast("Book borrowed successfully");
      navigate("/borrow-summary");
    } catch (error) {
      toast("Failed to borrow book");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Borrow Book</h1>
      <div className="grid gap-4 max-w-md mx-auto">
        <div className="flex flex-col gap-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            placeholder="Enter number of copies"
            value={borrowData.quantity === 1 ? "" : borrowData.quantity}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value < 1) {
                toast("You must borrow at least 1 book");
                return;
              }
              handleInputChange(e, "quantity");
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            type="date"
            min={(() => {
              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              return tomorrow.toISOString().split("T")[0];
            })()}
            value={borrowData.dueDate}
            onChange={(e) => {
              const selectedDate = new Date(e.target.value);
              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(0, 0, 0, 0);

              if (selectedDate < tomorrow) {
                toast(
                  "Due date must be a future date (starting from tomorrow)"
                );
                return;
              }

              handleInputChange(e, "dueDate");
            }}
          />
        </div>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Borrowing..." : "Borrow Book"}
        </Button>
      </div>
    </div>
  );
}
