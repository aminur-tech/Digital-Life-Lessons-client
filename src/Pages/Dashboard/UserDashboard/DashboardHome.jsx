import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalLessons: 0,
    totalFavorites: 0,
    recentLessons: [],
    weeklyContributions: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [lessonsRes, favoritesRes] = await Promise.all([
          axiosSecure.get("/lessons/my/me"), 
          axiosSecure.get("/favorites/me"),  
        ]);

        const lessons = lessonsRes.data;
        const favorites = favoritesRes.data;

        // Recent 5 lessons
        const recentLessons = lessons
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        // Weekly contributions (last 7 days)
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split("T")[0];
          return dateStr;
        }).reverse();

        const weeklyContributions = last7Days.map((day) => ({
          date: day,
          lessons: lessons.filter(
            (l) => new Date(l.createdAt).toISOString().split("T")[0] === day
          ).length,
        }));

        setStats({
          totalLessons: lessons.length,
          totalFavorites: favorites.length,
          recentLessons,
          weeklyContributions,
        });
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    };

    fetchDashboardData();
  }, [axiosSecure]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Lessons" value={stats.totalLessons} color="bg-blue-500" />
        <StatCard title="Total Favorites" value={stats.totalFavorites} color="bg-green-500" />
        <StatCard title="Recent Lessons" value={stats.recentLessons.length} color="bg-yellow-500" />
        <StatCard title="Quick Actions" value="..." color="bg-purple-500" />
      </div>

      {/* Recent Lessons */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Recently Added Lessons</h2>
        <ul className="bg-white shadow rounded p-4">
          {stats.recentLessons.map((lesson) => (
            <li key={lesson._id} className="py-2 border-b last:border-b-0">
              <span className="font-medium">{lesson.title}</span> - {new Date(lesson.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>

      {/* Weekly Contributions Chart */}
      <div className="p-4 bg-white shadow rounded">
        <h2 className="text-2xl font-semibold mb-3">Weekly Contributions</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={stats.weeklyContributions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="lessons" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className={`p-6 rounded shadow text-white ${color}`}>
    <h3 className="text-lg font-medium">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

export default DashboardHome;
