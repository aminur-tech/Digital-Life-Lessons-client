import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";

const ReportedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axiosSecure.get("/reported-lessons");
        console.log(res.data);
        setReports(res.data);
      } catch (err) {
        console.error("Failed to fetch reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [axiosSecure]);

  if (loading)
    return (
      <p className="text-center py-10 text-gray-700 dark:text-gray-300">
        Loading reports...
      </p>
    );

  if (reports.length === 0)
    return (
      <p className="text-center py-10 text-gray-700 dark:text-gray-300">
        No reported lessons found.
      </p>
    );

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <title>report</title>
      <h1 className="text-3xl font-bold mb-6">Reported Lessons</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg">
          <thead className="bg-gray-200 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left">Lesson</th>
              <th className="px-4 py-2 text-left">Reported By</th>
              <th className="px-4 py-2 text-left">Reason</th>
              <th className="px-4 py-2 text-left">Details</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr
                key={report._id}
                className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="px-4 py-2">
                  <Link
                    className="text-blue-600 dark:text-blue-400 underline"
                    to={`/lessons/${report.lessonId}`}
                  >
                    Lesson
                  </Link>
                </td>
                <td className="px-4 py-2">{report.reporter}</td>
                <td className="px-4 py-2">{report.reason}</td>
                <td className="px-4 py-2">{report.details || "-"}</td>
                <td className="px-4 py-2">
                  {new Date(report.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedLessons;
