import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const FeaturedLessons = () => {
  const axiosSecure = useAxiosSecure()
  const { data: featured = [] } = useQuery({
  queryKey: ["featuredLessons"],
  queryFn: async () => {
    const res = await axiosSecure.get("/lessons/featured");
    return res.data;
  },
  refetchInterval: 5000,       // auto refresh
  refetchOnWindowFocus: true,  // auto refresh on focus
});


  return (
    <div className="my-10">
      <h2 className="text-3xl font-bold mb-4">Featured Life Lessons</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map((l) => (
          <div key={l._id} className="card bg-base-100 shadow">
            <figure>
              <img src={l.image} alt="lesson" className="h-40 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="font-bold">{l.title}</h3>
              <p>{l.description?.slice(0, 80)}...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedLessons;
