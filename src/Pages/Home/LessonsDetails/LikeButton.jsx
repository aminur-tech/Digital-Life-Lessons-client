import React, { useState } from "react";
import { Heart } from "lucide-react";

const LikeButton = ({ initialLiked = false, initialCount = 0, onToggle }) => {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  const toggleLike = () => {
    const newState = !liked;
    setLiked(newState);
    setCount((prev) => prev + (newState ? 1 : -1));
    onToggle?.(newState);
  };

  return (
    <button
      onClick={toggleLike}
      className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-100 transition"
    >
      <Heart className={`w-5 h-5 ${liked ? "text-red-500 fill-red-500" : "text-gray-500"}`} />
      <span>{count}</span>
    </button>
  );
};

export default LikeButton;
