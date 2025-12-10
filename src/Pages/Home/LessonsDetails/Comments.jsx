import React, { useState, useEffect } from "react";
import { Trash2, MessageCircle, Heart } from "lucide-react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const Comments = ({ lessonId }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [replyOpen, setReplyOpen] = useState(null);
  const [replyText, setReplyText] = useState("");

  // Load all comments
  const loadComments = async () => {
    try {
      const res = await axiosSecure.get(`/comments/${lessonId}`);
      setComments(res.data);
    } catch (err) {
      console.error("Failed to load comments:", err);
    }
  };

  useEffect(() => {
    loadComments();
  }, [lessonId]);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    await axiosSecure.post("/comments", { lessonId, comment: text });
    setText("");
    loadComments();
  };

  const handleReply = async (parentId) => {
    if (!replyText.trim()) return;
    await axiosSecure.post("/comments", { lessonId, comment: replyText, parentId });
    setReplyText("");
    setReplyOpen(null);
    loadComments();
  };

  const handleDelete = async (id, authorId) => {
    if (user?._id !== authorId) return; // Only allow author to delete
    await axiosSecure.delete(`/comments/${id}`);
    loadComments();
  };

  const toggleLike = async (id, isReply = false) => {
    await axiosSecure.post("/comments/like", { commentId: id, isReply });
    loadComments();
  };

  return (
    <div className="space-y-6">
      {/* Add Comment */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="border border-gray-300 rounded-lg p-3 w-full resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
          rows={3}
        />
        <button
          onClick={handleSubmit}
          className="mt-3 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Post Comment
        </button>
      </div>

      {/* Comment List */}
      <div className="space-y-4">
        {comments.map((c) => (
          <div key={c._id} className="bg-gray-50 p-4 rounded-xl shadow-sm">
            {/* Direct Comment */}
            <div className="flex items-start gap-3">
              <img
                src={c.userAvatar || `https://ui-avatars.com/api/?name=${c.userName}`}
                alt={c.userName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-800">{c.userName}</p>
                  {user?._id === c.userId && (
                    <button
                      onClick={() => handleDelete(c._id, c.userId)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <p className="text-gray-700 mt-1">{c.comment}</p>

                {/* Like / Reply Buttons */}
                <div className="flex gap-3 mt-2 items-center">
                  <button
                    onClick={() => toggleLike(c._id)}
                    className={`flex items-center gap-1 text-sm ${
                      c.likes?.includes(user?._id) ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    <Heart className="w-4 h-4" />
                    {c.likes?.length || 0}
                  </button>

                  <button
                    onClick={() => setReplyOpen(c._id)}
                    className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    <MessageCircle className="w-4 h-4" /> Reply
                  </button>
                </div>

                {/* Reply input */}
                {replyOpen === c._id && (
                  <div className="mt-2 flex flex-col space-y-2 ml-12">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write your reply..."
                      className="border border-gray-300 rounded-lg p-2 w-full resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      rows={2}
                    />
                    <button
                      onClick={() => handleReply(c._id)}
                      className="px-4 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
                    >
                      Reply
                    </button>
                  </div>
                )}

                {/* Replies */}
                {c.replies?.map((r) => (
                  <div
                    key={r._id}
                    className="flex items-start gap-3 mt-2 ml-12 bg-white p-3 rounded-lg border border-gray-200"
                  >
                    <img
                      src={r.userAvatar || `https://ui-avatars.com/api/?name=${r.userName}`}
                      alt={r.userName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-800">{r.userName}</p>
                        {user?._id === r.userId && (
                          <button
                            onClick={() => handleDelete(r._id, r.userId)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <p className="text-gray-700 mt-1">{r.comment}</p>
                      <button
                        onClick={() => toggleLike(r._id, true)}
                        className={`flex items-center gap-1 text-sm ${
                          r.likes?.includes(user?._id) ? "text-red-500" : "text-gray-500"
                        }`}
                      >
                        <Heart className="w-4 h-4" />
                        {r.likes?.length || 0}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
