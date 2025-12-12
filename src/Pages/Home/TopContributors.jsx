import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const TopContributors = () => {
  const axiosSecure = useAxiosSecure();

  const { data: contributors = [], isLoading } = useQuery({
    queryKey: ['top-contributors'],
    queryFn: async () => {
      const res = await axiosSecure.get("/top-contributors");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-6 text-gray-500">Loading contributors...</p>;

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 border-b pb-3 text-gray-800">
        ⭐ Top Contributors This Week
      </h2>

      {contributors.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No contributors available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contributors.map((user, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition hover:bg-white"
            >
              <div className="flex-shrink-0">
                <span className="text-lg font-bold text-blue-600 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                  {idx + 1}
                </span>
              </div>

              <img
                src={user.image || "/default-avatar.png"}
                alt={user.name || user.email}
                className="w-14 h-14 rounded-full object-cover border border-gray-200"
              />

              <div className="flex flex-col">
                <p className="font-semibold text-gray-800 text-lg">
                  {user.name || user.email.split("@")[0]}
                </p>
                <p className="text-sm text-gray-500">{user.totalLessons || 0} lessons</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopContributors;
