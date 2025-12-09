import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router";

const FeaturedLessons = () => {
  const axiosSecure = useAxiosSecure();

  const { data: featured = [] } = useQuery({
    queryKey: ["featuredLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons/featured");
      return res.data;
    },
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
  });

  return (
    <div className="my-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        🌟 Featured Life Lessons
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {featured.map((l) => (
          <div
            key={l._id}
            className="card bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300"
          >
            {/* Image */}
            <figure className="relative">
              <img
                src={l.image}
                alt="lesson"
                className="h-48 w-full object-cover"
              />

              {/* Category badge */}
              <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                {l.category || "Lesson"}
              </span>
            </figure>

            <div className="card-body space-y-2">
              <h3 className="text-lg font-bold line-clamp-1">{l.title}</h3>

              <p className="text-sm text-gray-600 line-clamp-2">
                {l.description}
              </p>

              {/* Creator */}
              <p className="text-xs text-gray-500">
                By: <span className="font-medium">{l.email}</span>
              </p>

              <div className="pt-2">
                <Link
                  to={`/lessons/${l._id}`}
                  className="btn btn-outline btn-primary w-full"
                >
                  See Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedLessons;
