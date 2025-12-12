import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";

const AuthorCard = ({ authorEmail }) => {
  const [authorData, setAuthorData] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!authorEmail) return;

    // Fetch author profile by email
    axiosSecure
      .get(`/author/${authorEmail}`)
      .then((res) => setAuthorData(res.data))
      .catch((err) => console.error(err));
  }, [axiosSecure, authorEmail]);

  if (!authorData) return null; // or loader

  return (
    <div className="flex items-center gap-4 border p-4 rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow transition-colors">
      <img
        src={authorData.user.photoURL || '/default-avatar.png'}
        alt={authorData.user.displayName || authorData.user.name}
        className="w-16 h-16 rounded-full object-cover"
      />

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {authorData.user.displayName || authorData.user.name}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {authorData.lessons.length} lesson{authorData.lessons.length !== 1 && 's'} created
        </p>

        <Link
          to={`/dashboard/author/${authorEmail}`}
          className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
        >
          View all lessons by this author →
        </Link>
      </div>
    </div>
  );
};

export default AuthorCard;
