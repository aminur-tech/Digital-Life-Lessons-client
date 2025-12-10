import React, { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";

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
      <Bookmark
        className={`w-5 h-5 ${
          saved ? "text-blue-500 fill-blue-500" : "text-gray-500"
        }`}
      />
      <span>{saved ? "Saved" : "Save"}</span>
    </button>
  );
};

export default FavoriteButton;
