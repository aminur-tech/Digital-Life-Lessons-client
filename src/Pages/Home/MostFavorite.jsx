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

  if (isLoading) return <p className="text-center py-6">Loading...</p>;

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        🔖 Most Saved Lessons
      </h2>

      {lessons.length === 0 && (
        <p className="text-gray-500 text-center py-6">No data available.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {lessons.map((item, idx) => (
          <div
            key={idx}
            className="border rounded-xl p-4 shadow hover:shadow-xl transition-all duration-300 bg-gray-50 hover:bg-white cursor-pointer"
          >
            <div className="relative">
              <img
                src={item.image}
                alt=""
                className="w-full h-44 object-cover rounded-lg"
              />

              <div className="absolute top-2 right-2 bg-white shadow-md px-3 py-1 rounded-full text-sm font-medium">
                 🔖 {item.totalFavorites}
              </div>
            </div>

            <h3 className="mt-4 font-semibold text-lg text-gray-800 line-clamp-2">
              {item.title}
            </h3>

            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {item.description || "No description available."}
            </p>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-md">
                {item.category}
              </span>

              <Link to={`/lessons/${item.lessonId}`} className="text-indigo-600 hover:underline text-sm">
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
