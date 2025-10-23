import { Link } from "react-router";
import bookIcon from "../../../src/assets/icons8-book-50.png";
const Footer = () => {
  return (
    <div className="w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto py-10 ">
      <div className="flex flex-col items-center text-center">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <Link to="/" className="inline-flex items-center mb-1">
            <div className="ml-2 text-lg lg:text-xl font-bold tracking-wide uppercase flex items-center gap-2">
              <img
                src={bookIcon}
                alt="Book Icon"
                className="h-8 w-8 dark:invert"
              />
              <span>Library</span>
            </div>
          </Link>
        </div>

        {/* Links Section */}

        <div className="flex justify-center text-sm  py-5">
          {/* Book Navigation */}
          <div>
            <ul className=" flex items-center gap-6 text-base">
              <li>
                <Link to="/books" className="hover:text-purple-600">
                  All Books
                </Link>
              </li>
              <li>
                <Link to="/create-book" className="hover:text-purple-600">
                  Add Book
                </Link>
              </li>
              <li>
                <Link to="/borrow-summary" className="hover:text-purple-600">
                  Borrow Summary
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="w-full border-t pt-5 text-sm text-center font-semibold">
          © Copyright 2025 <strong>Library</strong>. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
