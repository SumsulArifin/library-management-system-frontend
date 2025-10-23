import { useState } from "react";
import { Link } from "react-router";
import { ModeToggle } from "../mode-toggle/mode-toggle";
import bookIcon from "../../../src/assets/icons8-book-50.png";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="sticky top-0  bg-white/50 dark:bg-neutral-950/50 backdrop-blur-2xl z-10">
      <div className="px-4 py-5 md:px-24 lg:px-8 w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
        <div className="relative flex items-center justify-between">
          <Link to="/">
            <div
              aria-label="Company"
              title="Company"
              className="inline-flex items-center"
            >
              <img
                src={bookIcon}
                alt="Book Icon"
                className="h-8 w-8 dark:invert"
              />
              <span className="ml-2 text-xl font-bold tracking-wide uppercase">
                Library
              </span>
            </div>
          </Link>
          <ul className="flex items-center hidden space-x-8 lg:flex">
            <Link to="/books">
              <div className="font-medium tracking-wide transition-colors duration-200 hover:text-teal-400">
                All Books
              </div>
            </Link>
            <Link to="/create-book">
              <div className="font-medium tracking-wide  transition-colors duration-200 hover:text-teal-400">
                Add Book
              </div>
            </Link>
            <Link to="/borrow-summary">
              <div className="font-medium tracking-wide  transition-colors duration-200 hover:text-teal-400">
                Borrow Summary
              </div>
            </Link>
          </ul>
          <ul className="flex items-center hidden space-x-8 lg:flex">
            <li>
              <ModeToggle></ModeToggle>
            </li>
          </ul>
          <div className="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg
                className="w-5 dark:text-white text-gray-800"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full z-50 ">
                <div className="p-5 dark:bg-[#0A0A0A] bg-white border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <Link to="/">
                      <div className="inline-flex items-center">
                        <div
                          aria-label="Company"
                          title="Company"
                          className="inline-flex items-center"
                        >
                          <img
                            src={bookIcon}
                            alt="Book Icon"
                            className="h-8 w-8 dark:invert"
                          />
                          <span className="ml-2 text-xl font-bold tracking-wide uppercase">
                            Library
                          </span>
                        </div>
                      </div>
                    </Link>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-400 focus:bg-gray-400 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg
                        className="w-5 dark:text-white text-gray-800"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3-6.3,6.3c-0.4,0.4-0.4,1,0,1.4
                          C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3 6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L13.4,12
                          l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      <Link to="/books">
                        <div className="font-medium tracking-wide  transition-colors duration-200 hover:text-purple-600">
                          All Books
                        </div>
                      </Link>
                      <Link to="/create-book">
                        <div className="font-medium tracking-wide transition-colors duration-200 hover:text-purple-600">
                          Add Book
                        </div>
                      </Link>
                      <Link to="/borrow-summary">
                        <div className="font-medium tracking-wide  transition-colors duration-200 hover:text-purple-600">
                          Borrow Summary
                        </div>
                      </Link>
                      <div className="mt-2">
                        <ModeToggle></ModeToggle>
                      </div>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
