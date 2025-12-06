import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-9xl font-bold text-red-500">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="mt-2 text-gray-600">Sorry, the page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
