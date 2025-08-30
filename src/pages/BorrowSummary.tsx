import { useGetBorrowSummaryQuery } from "@/redux/api/bookApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loader from "@/components/Loader";

export default function BorrowSummary() {
  const { data: summary, isLoading } = useGetBorrowSummaryQuery(undefined);

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Borrow Summary</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Book Title</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Total Quantity Borrowed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {summary?.data?.map((item: any) => (
            <TableRow key={item.book.isbn}>
              <TableCell>{item.book.title}</TableCell>
              <TableCell>{item.book.isbn}</TableCell>
              <TableCell>{item.totalQuantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
