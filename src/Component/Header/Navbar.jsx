import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../Hooks/useAuth';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogOut = () => {
        logOut().catch(() => { });
    };

    const navLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>

            {/* Public route */}
            <li>
                <NavLink to="/public-lessons">Public Lessons</NavLink>
            </li>

            {/* Private routes - show only when logged in */}
            {user && (
                <>
                    <li>
                        <NavLink to="/dashboard/add-lesson">
                            Add Lesson
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/my-lessons">
                            My Lessons
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/pricing">Pricing / Upgrade</NavLink>
                    </li>
                </>
            )}
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                {/* Mobile Menu */}
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>

                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                        {navLinks}

                        {!user && (
                            <>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/signup">Signup</Link></li>
                            </>
                        )}
                    </ul>
                </div>

                <Link to="/" className="btn btn-ghost text-xl">EduLearn</Link>
            </div>

            {/* Desktop menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{navLinks}</ul>
            </div>

            <div className="navbar-end">

                {/* User Logged Out State */}
                {!user && (
                    <>
                        <Link to="/auth/login" className="btn btn-outline rounded-xl mr-2">Login</Link>
                        <Link to="/auth/register" className="btn btn-primary rounded-xl">Signup</Link>
                    </>
                )}

                {/* User Logged In State */}
                {user && (
                    <div className="relative">
                        <img
                            src={user?.photoURL || "https://i.ibb.co/MBtjqXQ/no-img.png"}
                            alt="User"
                            className="w-10 h-10 rounded-full cursor-pointer border"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        />

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-3 w-48 bg-base-100 shadow-lg rounded-xl p-3 z-20">

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
