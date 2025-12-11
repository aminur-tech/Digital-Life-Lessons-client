import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';


const Navbar = () => {
    const { user, logOut } = useAuth();
    const axiosSecure = useAxiosSecure()
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [role, setRole]= useState(null)

    const handleLogOut = () => logOut().catch(() => { });

    // Fetch users ONLY once
    useEffect(() => {
        if (!user?.email) return;

        axiosSecure.get(`/users/premium/${user.email}`)
            .then(res => {
                console.log(res.data);
                setUserInfo(res.data);
            })
            .catch(err => console.error(err));

          axiosSecure.get(`/users/role/${user.email}`) 
          .then(res=> setRole(res.data.role) ) 
    }, [user, axiosSecure]);


    // Active route style
    const linkStyle = ({ isActive }) =>
        isActive
            ? 'text-blue-500 font-semibold border-b-2 border-blue-500 pb-1 drop-shadow-sm'
            : 'text-gray-800 hover:text-blue-500 drop-shadow-sm transition-colors duration-200';

    const navLinks = (
        <>
            <li><NavLink to="/" className={linkStyle}>Home</NavLink></li>
            <li><NavLink to="/public-lessons" className={linkStyle}>Public Lessons</NavLink></li>

            {user && (
                <>
                    <li><NavLink to="/dashboard/add-lesson" className={linkStyle}>Add Lesson</NavLink></li>
                    <li><NavLink to="/dashboard/my-lessons" className={linkStyle}>My Lessons</NavLink></li>

                    <li>
                        {userInfo?.isPremium ? (
                            <span className="ml-2 font-semibold text-yellow-500">Premium ⭐</span>
                        ) : (
                            <NavLink
                                to="/dashboard/pricing"
                                className="relative inline-block px-5 py-2 font-semibold text-black rounded-lg shadow-md text-center
                                bg-yellow-500 hover:bg-yellow-600 overflow-hidden"
                            >
                                {/* Animated background behind button */}
                                <span className="absolute inset-0 bg-yellow-400 rounded-lg opacity-50 animate-pulse -z-10"></span>

                                Upgrade
                            </NavLink>

                        )}
                    </li>
                </>
            )}
        </>
    );

    return (
        <div className="navbar sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">

            {/* LEFT SIDE */}
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white/70 backdrop-blur-md rounded-box z-10 mt-3 w-52 p-2 shadow">
                        {navLinks}
                        {!user && (
                            <>
                                <li><Link to="/auth/login">Login</Link></li>
                                <li><Link to="/auth/register">Signup</Link></li>
                            </>
                        )}
                    </ul>
                </div>

                <Link to="/">
                    <img
                        src="https://i.ibb.co.com/5WQymhQv/images-removebg-preview.png"
                        alt=""
                        className="w-16 rounded-full"
                    />
                </Link>
            </div>

            {/* CENTER */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{navLinks}</ul>
            </div>

            {/* RIGHT SIDE */}
            <div className="navbar-end">
                {!user && (
                    <>
                        <Link to="/auth/login" className="btn btn-outline rounded-xl mr-2">Login</Link>
                        <Link to="/auth/register" className="btn btn-primary rounded-xl">Signup</Link>
                    </>
                )}

                {user && (
                    <div className="relative">
                        <img
                            src={user?.photoURL || "https://i.ibb.co/MBtjqXQ/no-img.png"}
                            alt="User"
                            className="w-10 h-10 rounded-full cursor-pointer border"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        />

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-3 w-48 bg-white/80 backdrop-blur-lg shadow-lg rounded-xl p-3 z-20">
                                <p className="font-semibold">{user?.displayName}</p>
                                <div className="divider my-1"></div>

                                {
                                    role==="admin"?
                                    <Link className="block py-1 btn" to="dashboard/admin/profile">Profile</Link> 
                                    :
                                    <Link className="block py-1 btn" to="dashboard/profile">Profile</Link>
                                }
                                <Link className="block py-1 btn" to="/dashboard">Dashboard</Link>

                                <button
                                    onClick={handleLogOut}
                                    className="btn btn-sm btn-outline w-full mt-2"
                                >
                                    Log Out
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
