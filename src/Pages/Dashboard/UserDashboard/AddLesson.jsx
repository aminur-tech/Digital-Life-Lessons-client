import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import axios from "axios";

const AddLesson = () => {
  const { user, role } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const [image, setImage] = useState(null);

  const onSubmit = async (data) => {
    try {
      let imageUrl = "";

      // If an image is selected, upload it to imgbb
      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        const Img_Api_Url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Img_Upload}`;
        const imgRes = await axios.post(Img_Api_Url, formData);
        imageUrl = imgRes.data.data.url; // get uploaded image URL
      }

      const lessonData = {
        ...data,
        author: user.email,
        image: imageUrl, // send the URL, not the File object
        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/lessons", lessonData);

      if (res.data.success) {
        toast.success("Lesson created successfully!");
        reset();
        setImage(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create lesson");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Life Lesson</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Lesson Title"
          {...register("title", { required: true })}
          className="input input-bordered w-full"
        />

        <textarea
          placeholder="Full Description / Story / Insight"
          {...register("description", { required: true })}
          className="textarea textarea-bordered w-full"
          rows={6}
        />

        <select {...register("category")} className="select select-bordered w-full">
          <option value="">Select Category</option>
          <option value="Personal Growth">Personal Growth</option>
          <option value="Career">Career</option>
          <option value="Relationships">Relationships</option>
          <option value="Mindset">Mindset</option>
          <option value="Mistakes Learned">Mistakes Learned</option>
        </select>

        <select {...register("tone")} className="select select-bordered w-full">
          <option value="">Select Emotional Tone</option>
          <option value="Motivational">Motivational</option>
          <option value="Sad">Sad</option>
          <option value="Realization">Realization</option>
          <option value="Gratitude">Gratitude</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="file-input file-input-bordered w-full"
        />

        <select {...register("privacy")} className="select select-bordered w-full">
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>

        <select
          {...register("accessLevel")}
          className="select select-bordered w-full"
          disabled={role !== "Premium"}
          title={role !== "Premium" ? "Upgrade to Premium to create paid lessons" : ""}
        >
          <option value="Free">Free</option>
          <option value="Premium">Premium</option>
        </select>

        <button type="submit" className="btn btn-primary w-full">
          Create Lesson
        </button>
      </form>
    </div>
  );
};

export default AddLesson;
