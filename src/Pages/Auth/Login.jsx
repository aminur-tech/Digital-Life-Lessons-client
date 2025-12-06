import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import SocialLogin from './SocialLogin';

const Login = () => {
    const {signInUser} = useAuth()
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
        .catch(error=> console.log(error.message))
    };
    return (
        <div className='shadow-2xl mt-8 p-10'>
            <title>Login</title>
            <div>
                <h3 className="text-3xl font-bold text-center">Welcome Back to Zab Shift</h3>
                <p className="my-6 text-center">New to our website? Please {' '} <Link state={location.state} to='/auth/register' className='text-blue-500 underline'>Register</Link></p>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <fieldset className="fieldset ">

                        {/* Email */}
                        <label className="label">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            className="input w-full"
                            placeholder="Email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}

                        {/* Password */}
                        <label className="label mt-4">Password</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                                pattern: {
                                    // at least one uppercase, one digit, one special char
                                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]).+$/,
                                    message:
                                        'Password must include 1 uppercase letter, 1 number and 1 special character',
                                },
                            })}
                            className="input w-full"
                            placeholder="Password"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                        <div><a className="link link-hover">Forgot password?</a></div>

                        <button className="btn btn-neutral mt-4">Login</button>
                    </fieldset>
                    <SocialLogin></SocialLogin>
                </form>
            </div>
        </div>
    );
};

export default Login;