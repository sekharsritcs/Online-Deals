import React from "react";
import { Link } from "react-router-dom";

/**
 * 404 Not Found page component
 */
const NotFound: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-6xl font-bold text-orange-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
