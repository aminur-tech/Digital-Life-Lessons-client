import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyFavorites = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/favorites/${user.email}`)
        .then((res) => setFavorites(res.data))
        .catch((err) => console.log(err));
    }
  }, [user, axiosSecure]);

  return (
    <div className="max-w-5xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5 text-base-content">
        My Favorite Lessons
      </h1>

      {favorites.length === 0 && (
        <p className="text-base-content/70 text-center">
          No favorites added yet.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {favorites.map((fav) => (
          <div
            key={fav._id}
            className="border p-4 rounded-xl shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700 transition"
          >
            {/* Lesson Details */}
            <img
              src={fav.lessonImage}
              alt="Lesson"
              className="w-full h-40 object-cover rounded-lg mb-3"
            />

            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {fav.lessonTitle}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
              {fav.lessonDescription?.slice(0, 80)}...
            </p>

            <div className="mt-3 flex justify-between items-center">
              <span className="text-sm bg-blue-100 dark:bg-blue-700 dark:text-white text-blue-700 px-3 py-1 rounded-full">
                {fav.category}
              </span>

              <Link
                to={`/lessons/${fav.lessonId}`}
                className="text-blue-600 dark:text-blue-300 hover:underline text-sm"
              >
                View Lesson →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFavorites;
