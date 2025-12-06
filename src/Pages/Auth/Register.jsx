import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import SocialLogin from './SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [regError, setRegError] = React.useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    setRegError(''); // clear previous error

    const photoImg = data.photo[0];

    // STEP 1: Create Firebase User
    createUser(data.email, data.password)
      .then(result => {
        console.log("User created:", result);

        // STEP 2: Upload Image
        const formData = new FormData();
        formData.append('image', photoImg);

        const Img_Api_Url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Img_Upload}`;

        return axios.post(Img_Api_Url, formData);
      })

      // STEP 3: Image uploaded → Store user in DB
      .then(res => {
        const imageUrl = res.data.data.url;

        const userinfo = {
          displayName: data.name,
          email: data.email,
          photoURL: imageUrl,
        };

        return axiosSecure.post('/users', userinfo).then(() => imageUrl);
      })

      // STEP 4: Update user profile
      .then((imageUrl) => {
        const userProfile = {
          displayName: data.name,
          photoURL: imageUrl,
        };

        return updateUserProfile(userProfile);
      })

      // STEP 5: Navigate after success
      .then(() => {
        navigate(location?.state || '/');
      })

      .catch(error => {
        console.log("Register error:", error);

        // Firebase email error
        if (error.code === 'auth/email-already-in-use') {
          setRegError('Email already registered. Please use another email.');
        } else {
          setRegError(error.message);
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <title>Registration</title>

      <div className="w-full max-w-lg bg-gray-800/50 backdrop-blur-xl border border-gray-700 shadow-2xl rounded-2xl p-8">
        <h3 className="text-3xl font-extrabold text-center text-white">
          Create Your Account
        </h3>

        <p className="text-center text-gray-300 my-3">
          Already have an account?{" "}
          <Link
            state={location.state}
            to="/auth/login"
            className="text-blue-400 hover:underline"
          >
            Login
          </Link>
        </p>

        {/* Global Error */}
        {regError && (
          <p className="text-red-400 text-center font-medium mb-4">
            {regError}
          </p>
        )}

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">

          {/* Name */}
          <div>
            <label className="label text-gray-300">Full Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full bg-gray-700 border-gray-600 text-white"
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="label text-gray-300">Email Address</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="input input-bordered w-full bg-gray-700 border-gray-600 text-white"
              placeholder="Enter Email"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label text-gray-300">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]).+$/,
                  message:
                    "Must include uppercase, number & special character",
                },
              })}
              className="input input-bordered w-full bg-gray-700 border-gray-600 text-white"
              placeholder="Create Password"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Photo */}
          <div>
            <label className="label text-gray-300">Upload Photo</label>
            <input
              type="file"
              {...register("photo", { required: "Photo is required" })}
              className="file-input file-input-bordered w-full bg-gray-700 border-gray-600 text-gray-300"
            />
            {errors.photo && (
              <p className="text-red-400 text-sm mt-1">{errors.photo.message}</p>
            )}
          </div>

          <button className="btn btn-primary w-full mt-2">Register</button>

          <div className="pt-2">
            <SocialLogin />
          </div>
        </form>
      </div>
    </div>
  );

};

export default Register;
