import React, { useState } from "react";
import { Camera, ShieldCheck } from "lucide-react";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState(user?.displayName || "");
  const [photoPreview, setPhotoPreview] = useState(user?.photoURL);

  // Update Name
  const handleEditName = async () => {
    if (!newName.trim()) return toast.error("Name cannot be empty!");
    try {
      setLoading(true);
      await updateProfile(user, { displayName: newName });
      await axiosSecure.patch(`/users/update-name`, { name: newName });
      toast.success("Name updated successfully!");
      window.location.reload();
    } catch {
      toast.error("Failed to update name");
    } finally {
      setLoading(false);
    }
  };

  // Upload Profile Photo
  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", file);

      const uploadRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Img_Upload}`,
        formData
      );

      const photoURL = uploadRes.data.data.url;
      await updateProfile(user, { photoURL });
      await axiosSecure.patch(`/users/update-photo`, { photoURL });

      toast.success("Profile photo updated!");
      window.location.reload();
    } catch {
      toast.error("Failed to update photo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">Admin Profile</h1>

      {/* Profile Info */}
      <div className="flex items-center gap-6">
        {/* Profile Photo */}
        <div className="relative">
          <img
            src={photoPreview}
            alt="Admin"
            className="w-28 h-28 rounded-full object-cover border dark:border-gray-700"
          />

          <label className="absolute bottom-1 right-1 bg-gray-800 text-white p-2 rounded-full cursor-pointer hover:bg-black">
            <Camera size={14} />
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Name + Email */}
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            {user?.displayName}
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md text-xs flex items-center gap-1">
              <ShieldCheck size={14} /> Admin
            </span>
          </h2>

          <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>
        </div>
      </div>

      {/* Edit Name */}
      <div className="mt-6">
        <label className="font-medium">Update Display Name</label>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="w-full mt-2 p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleEditName}
          disabled={loading}
          className="mt-3 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 disabled:bg-gray-400"
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </div>

      {/* Admin Activity Summary */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-2">Admin Activity</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border rounded-xl bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
            <p className="text-gray-500 dark:text-gray-300 text-sm">Lessons Moderated</p>
            <h3 className="text-xl font-bold">12</h3>
          </div>
          <div className="p-4 border rounded-xl bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
            <p className="text-gray-500 dark:text-gray-300 text-sm">Actions Taken</p>
            <h3 className="text-xl font-bold">34</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
