import { useEffect, useState, useRef } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Edit3, Star, Pencil } from "lucide-react";
import { updateProfile } from "firebase/auth";
import axios from "axios";
import { Link, useParams } from "react-router";

const UserProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { id } = useParams()
    const [profile, setProfile] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [savedCount, setSavedCount] = useState(0);
    const [editName, setEditName] = useState("");
    const [premium, setPremium] = useState(null);

    const photoInputRef = useRef(null);

    // Load profile data
    useEffect(() => {
        if (!user?.email) return;

        const loadProfile = async () => {
            try {
                const userRes = await axiosSecure.get(`/users/role/${user.email}`);
                const savedRes = await axiosSecure.get(`/favorites/${user.email}`);
                const myLessonsRes = await axiosSecure.get(`/lessons/my/${user.email}`);
                const premiumRes = await axiosSecure.get(`/users/premium/${user.email}`);

                setProfile(userRes.data);
                setSavedCount(savedRes.data.length);
                setLessons(myLessonsRes.data);
                setEditName(user?.displayName || "");
                setPremium(premiumRes.data);
            } catch (err) {
                console.log(err);
            }
        };

        loadProfile();
    }, [user, axiosSecure, setProfile]);

    if (!user) return <p className="text-center py-10">Loading...</p>;

    // ------------------------------------
    // PHOTO UPLOAD
    // ------------------------------------
    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        const uploadRes = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Img_Upload}`,
            formData
        );

        const photoURL = uploadRes.data.data.url;

        // Update Firebase photo
        await updateProfile(user, { photoURL });

        // Update backend
        await axiosSecure.patch(`/users/update-photo`, { photoURL });

        window.location.reload(); // Refresh UI
    };

    // ------------------------------------
    // UPDATE NAME
    // ------------------------------------
    const handleEditName = async () => {
        if (!editName.trim()) return;

        // Update Firebase
        await updateProfile(user, { displayName: editName });

        // Update backend
        await axiosSecure.patch(`/users/update-name`, { name: editName });

        window.location.reload(); // optional but clean
    };

    return (
        <div className="max-w-5xl mx-auto p-6">

            {/* Profile Header */}
            <div className="flex items-center gap-6 bg-white p-6 rounded-xl shadow relative">

                {/* Photo + Pencil */}
                <div className="relative">
                    <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border"
                    />

                    <button
                        className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow cursor-pointer"
                        onClick={() => photoInputRef.current.click()}
                    >
                        <Pencil size={18} className="text-gray-600" />
                    </button>

                    <input
                        type="file"
                        accept="image/*"
                        ref={photoInputRef}
                        className="hidden"
                        onChange={handlePhotoChange}
                    />
                </div>

                <div>
                    <h1 className="text-2xl font-semibold flex items-center gap-2">
                        {user.displayName || "No Name"}

                        {premium?.isPremium && (
                            <span className="text-yellow-500 flex items-center gap-1 text-sm">
                                <Star size={18} /> Premium
                            </span>
                        )}
                    </h1>

                    <p className="text-gray-600">{user.email}</p>

                    <div className="mt-2 flex gap-4">
                        <p>
                            <span className="font-bold text-blue-500">{lessons.length}</span> lessons created
                        </p>
                        <p>
                            <span className="font-bold text-blue-500">{savedCount}</span> saved lessons
                        </p>
                    </div>
                </div>
            </div>

            {/* Update Name */}
            <div className="mt-6 bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-3">Update Profile</h2>

                <label className="font-medium">Display Name</label>

                <div className="flex gap-2 mt-2">
                    <input
                        className="border p-2 rounded w-full"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                    />

                    <button
                        onClick={handleEditName}
                        className="px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-1"
                    >
                        <Edit3 size={18} /> Save
                    </button>
                </div>
            </div>

            {/* User Lessons */}
            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Lessons Created by You</h2>

                {lessons.length === 0 ? (
                    <p>No lessons created yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {lessons.map((lesson) => (
                            <Link key={lesson._id} to={`/lessons/${lesson._id}`}>
                                <div className="bg-white shadow rounded-xl p-4 cursor-pointer hover:shadow-lg transition">
                                    <img
                                        src={lesson.image}
                                        className="w-full h-40 object-cover rounded-lg"
                                    />
                                    <h3 className="text-lg font-semibold mt-3">{lesson.title}</h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {lesson.description.slice(0, 100)}...
                                    </p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        {new Date(lesson.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                )}
            </div>

        </div>
    );
};

export default UserProfile;
