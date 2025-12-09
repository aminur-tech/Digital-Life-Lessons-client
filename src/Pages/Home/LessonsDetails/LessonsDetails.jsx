import React, { useState, useEffect } from "react";
import AuthorCard from "./AuthorCard";
import LikeButton from "./LikeButton";
import FavoriteButton from "./FavoriteButton";
import Comments from "./Comments";
import ReportModal from "./ReportModal";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useParams } from "react-router";
import { Eye, Clock, Calendar, Lock } from "lucide-react"; // Added more icons
import { Link } from "react-router"; // Assuming you use react-router-dom Link

const LessonsDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [similarLessons, setSimilarLessons] = useState([]);
  const [isPremium, setIsPremium] = useState(null);

  useEffect(() => {
    if (!id) return;
    // Fetch lesson
    axiosSecure.get(`/lessons/${id}`).then((res) => {
      setLesson(res.data);
    });

    // Fetch similar lessons
    axiosSecure.get(`/lessons/similar/${id}`).then((res) => {
      setSimilarLessons(res.data);
    });

    // Fetch premium status
    if (user?.email) {
      axiosSecure.get(`/users/premium/${user.email}`).then(res => setIsPremium(res.data.isPremium));
    }
  }, [id, user, axiosSecure]);

  if (!lesson) return <p className="text-center py-20">Loading lesson details...</p>;

  // Logic for blocking content
  const isPremiumContent = lesson.premium === true || lesson.accessLevel === 'premium'; // Check for premium flag
  const isBlocked = isPremiumContent && isPremium !== true; // Block if premium content AND user is NOT premium

  return (
    <div>
      {/* MAIN CONTENT LAYOUT */}
      <div className="lg:grid lg:grid-cols-3 lg:gap-10">

        {/* LEFT COLUMN: Lesson Content (2/3 width) */}
        <div className="lg:col-span-2 space-y-12">

          {/* HEADER & METADATA */}
          <div className="space-y-4 pb-4 border-b border-gray-100">
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">{lesson.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="text-indigo-600 font-medium">{lesson.category}</span>
              <span>|</span>
              <span>Tone: {lesson.emotionalTone}</span>
            </div>
          </div>
          {/* FEATURE IMAGE */}
          <div className="relative">
            <img
              src={lesson.image}
              alt={lesson.title}
              className={`w-full max-h-[500px] object-cover rounded-2xl shadow-xl transition duration-500 ${isBlocked ? "blur-sm grayscale opacity-70" : ""}`}
            />

            {/* PREMIUM BLOCKER OVERLAY - More prominent design */}
            {isBlocked && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-gradient-to-t from-gray-900/80 to-transparent rounded-2xl p-6">
                <Lock className="w-12 h-12 mb-3 text-yellow-400" />
                <p className="text-3xl font-bold mb-2">Exclusive Premium Content</p>
                <p className="text-lg text-gray-200 mb-6">Unlock this entire lesson and more with a premium membership.</p>
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
            <section className="prose max-w-none text-gray-700">
              <p className="text-xl leading-relaxed">{lesson.description}</p>
            </section>
          )}

          {/* COMMENTS SECTION */}
          <section className="pt-8 border-t border-gray-200">
            <h2 className="text-3xl font-bold mb-6">Discussions</h2>
            <Comments lessonId={lesson._id} />
          </section>
        </div>

        {/* RIGHT COLUMN: Author, Stats, Metadata, Similar Lessons (1/3 width) */}
        <aside className="lg:col-span-1 lg:space-y-8 mt-12 lg:mt-0">

          {/* STICKY ACTION BAR - Floats for easy access */}
          <div className="sticky top-20 bg-white p-4 rounded-xl shadow-lg border border-gray-100 mb-8">
            <h3 className="font-semibold text-lg mb-3 border-b pb-2">Quick Actions</h3>
            <div className="flex justify-between items-center gap-2">
              {/* LIKES & FAVORITES */}
              <LikeButton
                initialLiked={lesson.isLiked}
                initialCount={lesson.likes}
                onToggle={() => { }}
                className="flex-1"
              />
              <FavoriteButton
                initialSaved={lesson.isSaved}
                onToggle={() => { }}
                className="flex-1"
              />

              {/* REPORT BUTTON */}
              <button
                onClick={() => setShowReport(true)}
                className="flex items-center justify-center p-3 text-sm text-gray-600 border border-gray-300 rounded-full hover:bg-red-50 hover:text-red-600 transition duration-200"
                title="Report Content"
              >
                🚩
              </button>
            </div>
          </div>

          {/* AUTHOR CARD */}
          <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <h3 className="font-semibold text-lg mb-3 border-b pb-2">Lesson Creator</h3>
            <AuthorCard author={lesson.author} />
          </div>

          {/* LESSON STATS & METADATA */}
          <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <h3 className="font-semibold text-lg mb-4 border-b pb-2">Lesson Info</h3>
            <div className="text-gray-600 text-base space-y-3">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-indigo-500" />
                <span>**Views:** {Math.floor(Math.random() * 10000).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-indigo-500" />
                <span>**Created:** {lesson.createdAt}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-indigo-500" />
                <span>**Last Updated:** {lesson.updatedAt}</span>
              </div>
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-indigo-500" />
                <span>**Visibility:** {lesson.visibility}</span>
              </div>
            </div>
          </div>

        </aside>
      </div>

      {/* SIMILAR LESSONS SECTION (Full width below main content) */}
      <section className="mt-20 pt-10 border-t border-gray-200">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">More Lessons You Might Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {similarLessons.map((s) => (
            <Link to={`/lessons/${s._id}`} key={s._id} className="block group bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden">
              <img src={s.image} alt={s.title} className="h-40 w-full object-cover rounded-t-xl group-hover:scale-105 transition duration-500" />
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-indigo-600 transition duration-200">{s.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{s.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* REPORT MODAL */}
      <ReportModal
        isOpen={showReport}
        onClose={() => setShowReport(false)}
        onSubmit={(reason) => console.log("Report:", reason)}
      />
    </div>
  );
};

export default LessonsDetails;