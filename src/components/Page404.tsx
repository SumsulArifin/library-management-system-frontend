const Page404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-9xl font-extrabold text-gray-800 dark:text-gray-100 animate-bounce">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mt-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mt-2 text-center max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default Page404;
