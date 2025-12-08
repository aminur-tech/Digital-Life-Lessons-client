import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { Link } from "react-router";
import { Lock, Unlock } from "lucide-react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";

const PublicLessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [lessons, setLessons] = useState([]);
  const [userIsPremium, setUserIsPremium] = useState(false); // boolean

  // Get user premium status
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/users/premium/${user.email}`)
      .then(res => setUserIsPremium(res.data.isPremium))
      .catch(err => console.error(err));
  }, [user, axiosSecure]);

  // Get all public lessons
  useEffect(() => {
    axios
      .get("http://localhost:3000/lessons/public")
      .then(res => setLessons(res.data))
      .catch(err => console.error("Failed to load lessons:", err));
  }, []);

  // Limit lessons for free users
  const displayedLessons = userIsPremium ? lessons : lessons.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Browse Public Life Lessons
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedLessons.map(lesson => {
          const isPremiumLesson = lesson.accessLevel?.toLowerCase() === "premium";
          const isPrivateLesson = lesson.privacy?.toLowerCase() === "private";
          const isCreator = user?.email === lesson.email;

          // Lock condition
          const locked = (isPremiumLesson && !userIsPremium) || (isPrivateLesson && !isCreator);

          return (
            <div
              key={lesson._id}
              className={`p-5 rounded-xl shadow-lg bg-white relative overflow-hidden ${locked ? "opacity-60" : ""}`}
            >
              {locked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                  <div className="bg-black/40 text-white px-4 py-2 rounded-lg flex flex-col items-center gap-2 text-center">
                    <Lock className="w-5 h-5" />
                    {isPrivateLesson ? (
                      "Private Lesson – Only Creator Can View"
                    ) : (
                      <>
                        <span>Premium Lesson – Upgrade to view</span>
                        {!userIsPremium && (
                          <Link
                            to="/pricing"
                            className="mt-2 px-3 py-1 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition"
                          >
                            Upgrade to Premium
                          </Link>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}

              <div className={`${locked ? "blur-sm" : ""}`}>
                <h2 className="text-2xl font-semibold mb-2">{lesson.title}</h2>
                <p className="text-gray-600 mb-3">{lesson.description.slice(0, 80)}...</p>

                <div className="flex justify-between text-sm text-gray-500 mb-3">
                  <span>📂 {lesson.category}</span>
                  <span>💬 {lesson.tone || lesson.emotionalTone}</span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={lesson.image || lesson.creatorPhoto}
                    className="w-10 h-10 rounded-full"
                    alt="Creator"
                  />
                  <div>
                    <p className="font-medium">{lesson.creatorName || lesson.email}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(lesson.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <p className="text-sm mb-3 flex items-center gap-1">
                  {isPremiumLesson ? (
                    <span className="text-red-500 flex items-center gap-1">
                      <Lock className="w-4 h-4" /> Premium
                    </span>
                  ) : (
                    <span className="text-green-600 flex items-center gap-1">
                      <Unlock className="w-4 h-4" /> Free
                    </span>
                  )}
                </p>

                <Link
                  to={locked ? (isPremiumLesson ? "/pricing" : `/lessons/${lesson._id}`) : `/lessons/${lesson._id}`}
                  className="inline-block mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  See Details
                </Link>
              </div>
            </div>
          );
        })}

        {!userIsPremium && lessons.length > 6 && (
          <div className="p-5 rounded-xl shadow-lg bg-white flex flex-col items-center justify-center text-center">
            <p className="mb-3 font-medium">Want to see all lessons?</p>
            <Link
              to="/dashboard/pricing"
              className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition"
            >
              Upgrade to Premium
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicLessons;
