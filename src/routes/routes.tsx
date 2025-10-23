import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import AllBooks from "../pages/allbooks/AllBooks";
import AddBook from "../pages/addbook/AddBook";
import BorrowSummary from "../pages/borrowsummary/BorrowSummary";
import Home from "@/pages/home/Home";
import BookDetails from "@/components/bookDetails/BookDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "books",
        Component: AllBooks,
      },
      {
        path: "books/:id",
        Component: BookDetails,
      },
      {
        path: "create-book",
        Component: AddBook,
      },
      {
        path: "borrow-summary",
        Component: BorrowSummary,
      },
    ],
  },
]);

export default router;
