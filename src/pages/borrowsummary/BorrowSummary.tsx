import Loader from "@/components/loader/Loader";
import { Card, CardContent } from "@/components/ui/card";
import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";

import { Helmet } from "react-helmet";

type TBorrowSummary = {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
};
const BorrowSummary = () => {
  const {
    data: borrowData,
    isError,
    isLoading,
  } = useGetBorrowSummaryQuery(undefined);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (isError)
    return (
      <p className="text-center text-destructive">
        Failed to load borrow summary.
      </p>
    );

  const borrowSummerys: TBorrowSummary[] = borrowData?.data || [];

  return (
    <div className="w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto mt-3">
      <Helmet>
        <title>Borrow Summary</title>
        <meta name="description" content="Borrow Summary" />
      </Helmet>
      <h2 className="text-lg lg:text-2xl font-bold">Borrow Summary</h2>
      <Card className="mt-6">
        <CardContent>
          {!isLoading && borrowSummerys?.length === 0 && (
            <p className="text-center text-lg md:text-xl lg:text-3xl font-bold mb-10">
              No borrowed books found.
            </p>
          )}

          <div className="space-y-4">
            {borrowSummerys?.map((item, index: number) => (
              <div
                key={index}
                className="border rounded-lg p-4 shadow-sm bg-muted hover:bg-muted/70 transition"
              >
                <h3 className="text-lg font-semibold">
                  Book Title: {item.book.title}
                </h3>
                <p className="">
                  <strong className="text-lg font-semibold">ISBN:</strong>{" "}
                  <span className="text-sm font-bold text-muted-foreground">
                    {item.book.isbn}
                  </span>
                </p>
                <p className="">
                  <strong className="text-lg font-semibold ">
                    Total Quantity:
                  </strong>{" "}
                  <span className="text-lg font-medium ">
                    {item.totalQuantity}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BorrowSummary;

{
  /* Submit */
}
{
  /* <Button type="submit" disabled={isSubmitting} className="w-full mt-4">
            {isSubmitting ? "Creating..." : "Create Book"}
          </Button> */
}
