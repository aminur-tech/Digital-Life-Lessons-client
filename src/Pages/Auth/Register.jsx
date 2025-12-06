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
    <div className='shadow-2xl mt-8 p-10'>
      <title>Registration</title>
      <h3 className="text-3xl text-center font-bold">Welcome to Zab Shift Registration</h3>
      <p className="text-center my-2">
        Already have an account? Please{' '}
        <Link state={location.state} to="/login" className='text-blue-500 underline'>
          Login
        </Link>
      </p>

      {/* 🔴 Show Global Error */}
      {regError && (
        <p className="text-red-500 text-center mb-4">{regError}</p>
      )}

      <form onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="fieldset">

          {/* Name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="input w-full"
            placeholder="Your Name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}

          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="input w-full"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

          {/* Password */}
          <label className="label mt-4">Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]).+$/,
                message: 'Password must include 1 uppercase letter, 1 number and 1 special character'
              }
            })}
            className="input w-full"
            placeholder="Password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}

          {/* Photo */}
          <label className="label">Your Photo</label>
          <input
            type="file"
            {...register('photo', { required: 'Photo is required' })}
            className="input w-full file-input"
          />
          {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>}

          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>

        <SocialLogin />
      </form>
    </div>
  );
};

export default Register;
