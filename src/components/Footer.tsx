import { LibraryBig, ListChecks, PlusCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-teal-900 via-emerald-900 to-cyan-900 text-gray-300 py-10 mt-12 shadow-inner">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo / Project Name */}
        <div className="flex items-center gap-2 text-white font-bold text-2xl mb-4 md:mb-0">
          <LibraryBig size={28} className="text-cyan-400" />
          <span>Library Management</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-6 text-sm justify-center">
          <a
            href="/books"
            className="flex items-center gap-1 hover:text-emerald-300 transition-colors"
          >
            <LibraryBig size={20} className="text-cyan-400" />
            All Books
          </a>
          <a
            href="/create-book"
            className="flex items-center gap-1 hover:text-emerald-300 transition-colors"
          >
            <PlusCircle size={20} className="text-emerald-400" /> Add Book
          </a>
          <a
            href="/borrow-summary"
            className="flex items-center gap-1 hover:text-emerald-300 transition-colors"
          >
           <ListChecks size={20} className="text-teal-400" /> Borrow Summary
          </a>
        </div>

        {/* Credits */}
        <div className="text-gray-400 text-sm text-center md:text-right mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} Built with by{" "}
          <span className="text-cyan-300 font-semibold">Sumsul Arifin</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
