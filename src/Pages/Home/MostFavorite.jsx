import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MostFavorite = () => {
  const axiosSecure = useAxiosSecure();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["most-favorite-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/most-favorite-lessons");
      return res.data;
    }
  });

  if (isLoading) return <p className="text-center py-6 text-gray-700 dark:text-gray-200">Loading...</p>;

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-2">
        🔖 Most Saved Lessons
      </h2>

      {lessons.length === 0 && (
        <p className="text-gray-500 dark:text-gray-300 text-center py-6">No data available.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {lessons.map((item, idx) => (
          <div
            key={idx}
            className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow hover:shadow-xl transition-all duration-300 bg-gray-50 dark:bg-gray-800 cursor-pointer"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-44 object-cover rounded-lg"
              />

              <div className="absolute top-2 right-2 bg-white dark:bg-gray-700 shadow-md px-3 py-1 rounded-full text-sm font-medium text-gray-800 dark:text-gray-100">
                 🔖 {item.totalFavorites}
              </div>
            </div>

            <h3 className="mt-4 font-semibold text-lg text-gray-800 dark:text-gray-100 line-clamp-2">
              {item.title}
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
              {item.description || "No description available."}
            </p>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs bg-indigo-100 dark:bg-indigo-700 text-indigo-600 dark:text-indigo-200 px-2 py-1 rounded-md">
                {item.category}
              </span>

              <Link to={`/lessons/${item.lessonId}`} className="text-indigo-600 dark:text-indigo-300 hover:underline text-sm">
                View Lesson →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostFavorite;
