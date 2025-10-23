
import { FaBookOpen, FaUsersCog, FaClipboardList } from "react-icons/fa";
import { Button } from "../ui/button";
import { Link } from "react-router";

const Banner = () => {
  return (
    <section className="relative mb-24 via-white to-transparent dark:from-gray-900 dark:via-gray-950 dark:to-transparent transition-colors duration-500">
      <div className="px-6 py-20 mx-auto text-center sm:max-w-xl md:max-w-3xl lg:max-w-5xl">
        {/* Tagline */}
        <p className="inline-block px-4 py-1 mb-6 text-sm font-semibold tracking-widest text-indigo-700 uppercase rounded-full bg-indigo-100 dark:text-indigo-300 dark:bg-indigo-800/30">
          Digital Library Platform
        </p>

        {/* Heading */}
        <h1 className="text-4xl font-extrabold leading-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl mb-6">
          Manage Your <span className="text-indigo-600 dark:text-indigo-400">Library</span> Smartly
        </h1>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300 mb-8">
          Organize books, track borrowers, and simplify library operations — all from one beautiful dashboard.
        </p>

        {/* Buttons */}
        <div className="flex justify-center items-center gap-4">
          <Link to="/books">
            <Button size="lg">
              Get Started
            </Button>
          </Link>

          <Button variant="outline" size="lg" className="border-indigo-600 text-indigo-700 hover:bg-indigo-100 dark:border-indigo-400 dark:text-indigo-300 dark:hover:bg-indigo-900/50">
            Learn More
          </Button>

        </div>
      </div>

      {/* Features */}
      <div className="relative mt-20">
        <div className="grid grid-cols-1 gap-8 px-6 sm:grid-cols-3 sm:px-12 md:px-20 lg:px-32">
          {/* Feature 1 */}
          <div className="p-8 text-center bg-white dark:bg-[#171717] dark:text-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-100 dark:bg-indigo-800">
              <FaBookOpen className="text-3xl text-gray-900 dark:text-indigo-100" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Track Borrowed Books</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              View who borrowed which book, due dates, and history with ease.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 text-center bg-white dark:bg-[#171717] dark:text-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-100 dark:bg-indigo-800">
              <FaClipboardList className="text-3xl text-gray-900 dark:text-indigo-100" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Organize Book Catalog</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Keep your entire library database neatly categorized and searchable.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 text-center bg-white dark:bg-[#171717] dark:text-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-100 dark:bg-indigo-800">
              <FaUsersCog className="text-3xl text-gray-900 dark:text-indigo-100" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Simplify User Management</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Assign roles, manage members, and control access easily.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
