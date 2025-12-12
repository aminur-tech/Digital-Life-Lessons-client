import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router";
import { Lock, Unlock } from "lucide-react";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";

const FeaturedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userIsPremium, setUserIsPremium] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);

  // Fetch featured lessons
  const { data: featured = [] } = useQuery({
    queryKey: ["featuredLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons/featured");
      return res.data;
    },
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
  });

  // Get user premium status
  useEffect(() => {
    if (!user?.email) return;
    axiosSecure
      .get(`/users/premium/${user.email}`)
      .then(res => setUserIsPremium(res.data.isPremium))
      .catch(err => console.error(err));
  }, [user, axiosSecure]);

  const displayedLessons = featured.slice(0, visibleCount);

  const handleSeeMore = () => {
    if (!userIsPremium) {
      navigate("/dashboard/pricing");
    } else {
      setVisibleCount(prev => prev + 4);
    }
  };

  return (
    <div className="my-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-base-content">
        🌟 Featured Life Lessons
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedLessons.map(lesson => {
          const isPremiumLesson = lesson.accessLevel?.toLowerCase() === "premium";
          const locked = isPremiumLesson && !userIsPremium;

          return (
            <div
              key={lesson._id}
              className={`relative rounded-xl shadow-md  transition overflow-hidden hover:shadow-xl
                          ${locked ? "opacity-80" : ""}
                           bg-white dark:bg-gray-800
                           text-gray-900 dark:text-gray-100`}
            >
              {/* LOCK OVERLAY */}
              {locked && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 text-white text-center p-4 rounded-xl">
                  <Lock className="w-6 h-6 mb-2" />
                  <p className="text-sm font-medium">Premium Lesson – Upgrade to View</p>
                  <Link
                    to="/dashboard/pricing"
                    className="mt-3 px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition"
                  >
                    Upgrade
                  </Link>
                </div>
              )}

              {/* CATEGORY */}
              <div className="absolute top-2 left-2 z-10">
                <span className="bg-blue-400 dark:bg-blue-600 text-white px-2 py-1 rounded-2xl text-xs font-semibold">
                  {lesson.category || "Lesson"}
                </span>
              </div>

              {/* IMAGE */}
              <div className="h-44 w-full overflow-hidden relative">
                <img
                  src={lesson.image}
                  alt={lesson.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* CONTENT */}
              <div className={`p-4 ${locked ? "blur-sm" : ""}`}>
                <h3 className="text-lg font-semibold mb-1 line-clamp-2 text-gray-800 dark:text-gray-100">
                  {lesson.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                  {lesson.description.slice(0, 100)}...
                </p>

                {/* CREATOR INFO */}
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={lesson.author_Img}
                    alt={lesson.author_Name}
                    className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-gray-600"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                      {lesson.author_Name}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-400">
                      {new Date(lesson.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* ACCESS LEVEL */}
                <div className="mb-3">
                  {isPremiumLesson ? (
                    <span className="flex items-center gap-1 text-red-500 text-sm font-semibold">
                      <Lock className="w-4 h-4" /> Premium
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-semibold">
                      <Unlock className="w-4 h-4" /> Free
                    </span>
                  )}
                </div>

                {/* SEE DETAILS BUTTON */}
                <Link
                  to={locked ? "/dashboard/pricing" : `/lessons/${lesson._id}`}
                  className="block w-full text-center bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold py-2 rounded transition"
                >
                  See Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* SEE MORE BUTTON */}
      {featured.length > visibleCount && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSeeMore}
            className="px-6 py-2 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold rounded transition"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default FeaturedLessons;
