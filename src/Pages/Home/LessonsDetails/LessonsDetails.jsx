import React, { useState, useEffect } from "react";
import AuthorCard from "./AuthorCard";
import LikeButton from "./LikeButton";
import FavoriteButton from "./FavoriteButton";
import Comments from "./Comments";
import ReportModal from "./ReportModal";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useParams } from "react-router";
import { Eye, Clock, Calendar, Lock } from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";

const LessonsDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [similarLessons, setSimilarLessons] = useState([]);
  const [isPremium, setIsPremium] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);

 
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (!id) return;
    // Fetch lesson
    axiosSecure.get(`/lessons/${id}`).then((res) => setLesson(res.data));

    // Fetch similar lessons
    axiosSecure.get(`/lessons/similar/${id}`).then((res) => {
      setSimilarLessons(res.data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Fetch premium status
    if (user?.email) {
      axiosSecure
        .get(`/users/premium/${user.email}`)
        .then((res) => setIsPremium(res.data.isPremium));
    }
  }, [id, user, axiosSecure]);

  if (!lesson)
    return (
      <p className="text-center py-20 text-gray-800 dark:text-gray-200">
        Loading lesson details...
      </p>
    );

  const isPremiumContent =
    lesson.premium === true || lesson.accessLevel === "premium";
  const isBlocked = isPremiumContent && isPremium !== true;

  const lessonInfo = {
    lessonId: id,
    lessonImage: lesson?.image || "",
    lessonTitle: lesson?.title || "",
    lessonDescription: lesson?.description || "",
    category: lesson?.category || "",
  };

  const handleFavoriteToggle = async () => {
    await axiosSecure.post("/favorites/toggle", { ...lessonInfo });
  };

  const report = {
    lessonId: id,
    reporter: user?.email,
    author_Name: lesson?.name,
    author_Email: lesson?.email,
    author_Img: lesson?.image,
  };

  const handleReport = async ({ reason, details }) => {
    await axiosSecure.post("/lessons/report", { ...report, reason, details });
    toast.success("Report submitted successfully!");
    setShowReport(false);
  };

  return (
    <div className="text-gray-800 dark:text-gray-200 p-1">
      <title>lesson details</title>
      <div className="lg:grid lg:grid-cols-3 lg:gap-10">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-12">
          <div className="space-y-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-5xl font-extrabold leading-tight">
              {lesson.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="text-indigo-600 font-medium">{lesson.category}</span>
              <span>|</span>
              <span>Tone: {lesson.tone}</span>
            </div>
          </div>

          {/* FEATURE IMAGE */}
          <div className="relative">
            <img
              src={lesson.image}
              alt={lesson.title}
              className={`w-full max-h-[500px] object-cover rounded-2xl shadow-xl transition duration-500 ${
                isBlocked ? "blur-sm grayscale opacity-70" : ""
              }`}
            />
            {isBlocked && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-gradient-to-t from-gray-900/80 to-transparent rounded-2xl p-6">
                <Lock className="w-12 h-12 mb-3 text-yellow-400" />
                <p className="text-3xl font-bold mb-2">Exclusive Premium Content</p>
                <p className="text-lg text-gray-200 mb-6">
                  Unlock this entire lesson and more with a premium membership.
                </p>
                <Link
                  to="/dashboard/pricing"
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full text-lg font-semibold shadow-lg transition duration-300"
                >
                  Upgrade to Unlock
                </Link>
              </div>
            )}
          </div>

          {/* DESCRIPTION */}
          {!isBlocked && (
            <section className="prose max-w-none text-gray-700 dark:text-gray-300">
              <p className="text-xl leading-relaxed">{lesson.description}</p>
            </section>
          )}

          {/* COMMENTS */}
          <section className="pt-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold mb-6">Discussions</h2>
            <Comments lessonId={lesson._id} />
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <aside className="lg:col-span-1 lg:space-y-8 mt-12 lg:mt-0">
          <div className="sticky top-20 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
            <h3 className="font-semibold text-lg mb-3 border-b pb-2 dark:border-gray-600">
              Quick Actions
            </h3>
            <div className="flex justify-between items-center gap-2">
              <LikeButton
                lessonId={lesson._id}
                initialLiked={lesson.likes?.includes(user?.email)}
                initialCount={lesson.likesCount || lesson.likes?.length || 0}
              />
              <FavoriteButton
                initialSaved={false}
                onToggle={handleFavoriteToggle}
                className="flex-1"
              />
              <button
                onClick={() => setShowReport(true)}
                className="flex items-center justify-center p-3 text-sm text-gray-600 border border-gray-300 rounded-full hover:bg-red-50 hover:text-red-600 transition duration-200"
              >
                🚩
              </button>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-lg mb-3 border-b pb-2 dark:border-gray-600">
              Lesson Creator
            </h3>
            <AuthorCard authorEmail={lesson.email} />
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-lg mb-4 border-b pb-2 dark:border-gray-600">
              Lesson Info
            </h3>
            <div className="text-gray-600 dark:text-gray-400 text-base space-y-3">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-indigo-500" />
                <span>Views: {Math.floor(Math.random() * 10000).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-indigo-500" />
                <span>Created: {lesson.createdAt}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-indigo-500" />
                <span>Last Updated: {lesson.updateAt || lesson.createdAt} </span>
              </div>
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-indigo-500" />
                <span>Visibility:  {lesson.privacy}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* SIMILAR LESSONS */}
      <section className="mt-20 mb-24 pt-10 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          More Lessons You Might Like
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {similarLessons.slice(0, visibleCount).map((s) => (
            <Link
              to={`/lessons/${s._id}`}
              key={s._id}
              className="block group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden"
            >
              <img
                src={s.image}
                alt={s.title}
                className="h-40 w-full object-cover rounded-t-xl group-hover:scale-105 transition duration-500"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 transition duration-200">
                  {s.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.category}</p>
              </div>
            </Link>
          ))}
        </div>

        {visibleCount < similarLessons.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setVisibleCount(prev => prev + 4)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold shadow-md transition"
            >
              Show More
            </button>
          </div>
        )}
      </section>

      {/* REPORT MODAL */}
      <ReportModal
        isOpen={showReport}
        onClose={() => setShowReport(false)}
        lessonId={lesson._id}
        reporter={user?.email}
        author_Name={lesson.name}
        author_Email={lesson.email}
        author_Img={lesson.image}
        onSubmit={handleReport}
      />
    </div>
  );
};

export default LessonsDetails;
