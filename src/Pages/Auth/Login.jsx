import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import SocialLogin from './SocialLogin';

const Login = () => {
    const { signInUser } = useAuth()
    const location = useLocation()
    // console.log(location)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleLogin = (data) => {
        // console.log('Login payload:', data);
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                navigate(location?.state || '/')
            })
            .catch(error => console.log(error.message))
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
            <title>Login</title>

            <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-gray-700">
                <h3 className="text-3xl font-extrabold text-center text-white">
                    Welcome Back 👋
                </h3>
                <p className="my-4 text-center text-gray-300">
                    New here?{" "}
                    <Link
                        state={location.state}
                        to="/auth/register"
                        className="text-blue-400 hover:underline"
                    >
                        Create an Account
                    </Link>
                </p>

                <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="label text-gray-300">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="input input-bordered w-full bg-gray-700 text-white border-gray-600"
                            placeholder="Enter your email"
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
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                                pattern: {
                                    value:
                                        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]).+$/,
                                    message:
                                        "Must have 1 uppercase, 1 number & 1 special character",
                                },
                            })}
                            className="input input-bordered w-full bg-gray-700 text-white border-gray-600"
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div className="text-right">
                        <a className="text-blue-400 hover:underline text-sm cursor-pointer">
                            Forgot password?
                        </a>
                    </div>

                    <button className="btn btn-primary w-full mt-2">Login</button>

                    <div className="mt-3">
                        <SocialLogin />
                    </div>
                </form>
            </div>
        </div>
    );

};

export default Login;