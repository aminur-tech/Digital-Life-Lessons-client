import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Trash2, MessageCircle } from "lucide-react";

const Comments = ({ lessonId }) => {
  const axiosSecure = useAxiosSecure();

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [replyOpen, setReplyOpen] = useState(null); 
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);

  // Load comments
  const loadComments = () => {
    axiosSecure.get(`/comments/${lessonId}`).then(res => setComments(res.data));
  };

  useEffect(() => {
    loadComments();
  }, [lessonId]);

  // Add comment
  const handleSubmit = async () => {
    if (!text.trim()) return;

    setLoading(true);
    await axiosSecure.post("/comments", { lessonId, comment: text });
    setText("");
    loadComments();
    setLoading(false);
  };

  // Add reply
  const handleReply = async (parentId) => {
    if (!replyText.trim()) return;

    await axiosSecure.post("/comments", {
      lessonId,
      comment: replyText,
      parentId,
    });

    setReplyText("");
    setReplyOpen(null);
    loadComments();
  };

  // Delete comment
  const handleDelete = async (id) => {
    await axiosSecure.delete(`/comments/${id}`);
    loadComments();
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      {/* Comment input */}
      <textarea
        className="border w-full p-3 rounded-lg bg-gray-50"
        rows={3}
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
      >
        {loading ? "Posting..." : "Post Comment"}
      </button>

      {/* List */}
      <div className="mt-6 space-y-4">
        {comments.map((c) => (
          <div key={c._id} className="border p-3 rounded-lg bg-white shadow-sm">
            <div className="flex justify-between">
              <p className="font-semibold text-blue-600">{c.userEmail}</p>

              {/* Delete Button (Only for owner) */}
              {c.isOwner && (
                <button onClick={() => handleDelete(c._id)}>
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              )}
            </div>

            <p className="mt-1">{c.comment}</p>

            <p className="text-gray-500 text-sm mt-1">
              {c.createdAt?.slice(0, 10)}
            </p>

            {/* Reply button */}
            <button
              onClick={() => setReplyOpen(c._id)}
              className="flex items-center text-sm text-blue-600 mt-2"
            >
              <MessageCircle size={16} className="mr-1" /> Reply
            </button>

            {/* Reply input */}
            {replyOpen === c._id && (
              <div className="mt-2 ml-4">
                <textarea
                  className="border w-full p-2 rounded-lg bg-gray-50"
                  rows={2}
                  placeholder="Write a reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <button
                  onClick={() => handleReply(c._id)}
                  className="mt-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm"
                >
                  Reply
                </button>
              </div>
            )}

            {/* Replies */}
            {c.replies?.length > 0 && (
              <div className="mt-3 ml-5 border-l pl-4 space-y-3">
                {c.replies.map((r) => (
                  <div key={r._id} className="bg-gray-50 p-2 rounded-lg">
                    <div className="flex justify-between">
                      <p className="font-semibold text-blue-600">{r.userEmail}</p>

                      {r.isOwner && (
                        <button onClick={() => handleDelete(r._id)}>
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      )}
                    </div>

                    <p>{r.comment}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {r.createdAt?.slice(0, 10)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
