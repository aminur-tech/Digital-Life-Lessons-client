import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";

const AuthorCard = ({ authorEmail }) => {
  const [authorData, setAuthorData] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!authorEmail) return;

    // Fetch author profile by email
    axiosSecure.get(`/author/${authorEmail}`)
      .then(res => {
        setAuthorData(res.data);
        console.log(res.data);
      })
      .catch(err => console.error(err));
  }, [axiosSecure, authorEmail]);

  if (!authorData) return null; // or loader

  return (
    <div className="flex items-center gap-4 border p-4 rounded-xl bg-white shadow">
      <img
        src={authorData.user.photoURL || authorData.user.name || '/default-avatar.png'}
        alt={authorData.user.name}
        className="w-16 h-16 rounded-full object-cover"
      />

      <div>
        <h3 className="text-lg font-semibold">{authorData.user.displayName || authorData.user.name}</h3>
        <p className="text-gray-500 text-sm">
          {authorData.lessons.length} lesson{authorData.lessons.length !== 1 && 's'} created
        </p>

        <Link
          to={`/dashboard/author/${authorEmail}`} // link to author profile page
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          View all lessons by this author →
        </Link>
      </div>
    </div>
  );
};

export default AuthorCard;
