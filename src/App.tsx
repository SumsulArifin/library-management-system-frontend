import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Books from "./pages/Books";
import CreateBook from "./pages/CreateBook";
import BookDetails from "./pages/BookDetails";
import EditBook from "./pages/EditBook";
import BorrowBook from "./pages/BorrowBook";
import BorrowSummary from "./pages/BorrowSummary";
import { Toaster } from "@/components/ui/sonner";
import "./index.css";
import Page404 from "./components/Page404";
import Navbar from "./components/Navbar";




function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <Routes>
          <Route path="/books" element={<Books />} />
          <Route path="/create-book" element={<CreateBook />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
          <Route path="/borrow/:bookId" element={<BorrowBook />} />
          <Route path="/borrow-summary" element={<BorrowSummary />} />
          <Route path="/" element={<Books />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </main>
      <Toaster />
      <Footer />
    </div>
  );
}

export default App;
