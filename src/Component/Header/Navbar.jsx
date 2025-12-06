import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../Hooks/useAuth';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogOut = () => logOut().catch(() => { });

    // Active route + drop shadow for readability
    const linkStyle = ({ isActive }) =>
        isActive
            ? "text-blue-500 font-semibold border-b-2 border-blue-500 pb-1 drop-shadow-sm"
            : "text-gray-800 hover:text-blue-500 drop-shadow-sm transition-colors duration-200";

    const navLinks = (
        <>
            <li><NavLink to="/" className={linkStyle}>Home</NavLink></li>
            <li><NavLink to="/public-lessons" className={linkStyle}>Public Lessons</NavLink></li>
            {user && (
                <>
                    <li><NavLink to="/dashboard/add-lesson" className={linkStyle}>Add Lesson</NavLink></li>
                    <li><NavLink to="/dashboard/my-lessons" className={linkStyle}>My Lessons</NavLink></li>
                </>
            )}
            {user && !user.isPremium && (
                <li><NavLink to="/pricing" className={linkStyle}>Pricing / Upgrade</NavLink></li>
            )}
            {user?.isPremium && (
                <span className="ml-2 font-semibold text-yellow-500">Premium ⭐</span>
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
                <Link to="/" className="btn btn-ghost text-xl">EduLearn</Link>
            </div>

            {/* CENTER (Desktop menu) */}
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
                                <Link className="block py-1" to="/profile">Profile</Link>
                                <Link className="block py-1" to="/dashboard">Dashboard</Link>
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
