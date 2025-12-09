import React from "react";

const AuthorCard = ({ author }) => {
  return (
    <div className="flex items-center gap-4 border p-4 rounded-xl bg-white shadow">
      <img
        src={author.image}
        alt={author.name}
        className="w-16 h-16 rounded-full object-cover"
      />

      <div>
        <h3 className="text-lg font-semibold">{author.name}</h3>
        <p className="text-gray-500 text-sm">
          {author.totalLessons} lessons created
        </p>

        <a
          href={`/author/${author.id}`}
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          View all lessons by this author →
        </a>
      </div>
    </div>
  );
};

export default AuthorCard;
