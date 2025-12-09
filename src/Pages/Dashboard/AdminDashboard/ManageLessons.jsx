import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const ManageLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    axiosSecure.get("/lessons/public").then(res => {
      setLessons(res.data);
    });
  }, [axiosSecure]);

  const toggleFeatured = async (id, currentStatus) => {
    try {
      await axiosSecure.patch(`/lessons/feature/${id}`, {
        featured: !currentStatus,
      });

      toast.success(`Lesson ${!currentStatus ? "added to" : "removed from"} featured`);

      setLessons(prev =>
        prev.map(l =>
          l._id === id ? { ...l, featured: !currentStatus } : l
        )
      );
    } catch {
      toast.error("Failed to update featured");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Lessons</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Creator</th>
              <th>Featured</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {lessons.map(lesson => (
              <tr key={lesson._id}>
                <td>{lesson.title}</td>
                <td>{lesson.email}</td>
                <td>{lesson.featured ? "Yes" : "No"}</td>
                <td>
                  <button
                    onClick={() => toggleFeatured(lesson._id, lesson.featured)}
                    className={`btn ${lesson.featured ? "btn-error" : "btn-success"} btn-sm`}
                  >
                    {lesson.featured ? "Remove" : "Make Featured"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ManageLessons;
