import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AuthorProfile = () => {
  const { email } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [favoriteData, setFavoriteData] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!email) return;

    axiosSecure.get(`/author/${email}`)
      .then(res => setAuthorData(res.data))
      .catch(err => console.error(err));

    axiosSecure.get(`/favorites/${email}`)
      .then(res => {
        setFavoriteData(res.data)
         console.log(res.data)})
      .catch(err => console.error(err));

  }, [axiosSecure, email]);

  if (!authorData) return (
    <div className="flex justify-center items-center h-screen text-gray-500">
      Loading author profile...
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Author info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
        <img
          src={authorData.user.photoURL || '/default-avatar.png'}
          alt=''
          className="w-28 h-28 rounded-full object-cover border-2 border-indigo-500"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{authorData.user.name || authorData.user.displayName}</h1>
          <p className="text-gray-500 mt-2"><span className='text-blue-500'>{authorData.lessons.length}</span> lesson{authorData.lessons.length !== 1 && 's'} created</p>
          <p className="text-gray-500 mt-1">Total Favorites: <span className='text-blue-500'>{favoriteData.length}</span></p>
        </div>
      </div>

      {/* Author lessons */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Lessons by <span className='text-blue-500'>{authorData.user.name || authorData.user.displayName}</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authorData.lessons.map(lesson => (
            <Link to={`/lessons/${lesson._id}`}
              key={lesson._id}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
               <img src={lesson.image} alt="" /> 
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{lesson.title}</h3>
              <p className="text-gray-500 text-sm mb-3 line-clamp-3">{lesson.description}</p>
              <p className="text-xs text-gray-400">Category: {lesson.category}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;
