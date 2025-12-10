// LikeButton.jsx
import React from "react";

const LikeButton = ({ isLiked, count, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg border ${isLiked ? 'bg-red-50 border-red-300' : ''}`}
    >
      {isLiked ? `❤️ ${count?.toLocaleString()}` : `🤍 ${count?.toLocaleString()}`}
    </button>
  );
};

export default LikeButton;
