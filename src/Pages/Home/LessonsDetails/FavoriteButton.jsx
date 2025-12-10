import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";


const FavoriteButton = ({ initialSaved = false, onToggle }) => {
  const [saved, setSaved] = useState(initialSaved);

  // Sync with updated parent props (after refetch)
  useEffect(() => {
    setSaved(initialSaved);
  }, [initialSaved]);

  const toggleSave = () => {
    onToggle?.(); // call mutation
    setSaved(prev => !prev);
  };

  return (
    <button
      onClick={toggleSave}
      className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-100 transition"
    >
      <Heart
        className={`w-5 h-5 ${
          saved ? "text-red-500 fill-red-500" : "text-gray-500"
        }`}
      />
      <span>{saved ? "Favorited" : "Favorite"}</span>
    </button>
  );
};

export default FavoriteButton;
