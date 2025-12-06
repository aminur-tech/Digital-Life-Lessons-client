import React from 'react';
import { Link, NavLink } from 'react-router';
import { BsArrowUpRightCircleFill } from 'react-icons/bs';
import useAuth from '../../Hooks/useAuth';

const Navbar = () => {
    const { user, logOut } = useAuth()
    const handleLogOut = () => {
        logOut()
            .then()
            .catch()
    }
    const links =
        <>
            <li>
                <NavLink
                    to="/services"
                    className={({ isActive }) =>
                        isActive ? "bg-primary text-white rounded-2xl px-4 py-2" : ""
                    }
                >
                    Services
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="/coverage"
                    className={({ isActive }) =>
                        isActive ? "bg-primary text-white rounded-2xl px-4 py-2" : ""
                    }
                >
                    Coverage
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        isActive ? "bg-primary text-white rounded-2xl px-4 py-2" : ""
                    }
                >
                    About Us
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="/rider"
                    className={({ isActive }) =>
                        isActive ? "bg-primary text-white rounded-2xl px-4 py-2" : ""
                    }
                >
                    Be A Rider
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="/addParcel"
                    className={({ isActive }) =>
                        isActive ? "bg-primary text-white rounded-2xl px-4 py-2" : ""
                    }
                >
                    Add Parcel
                </NavLink>
            </li>


            {
                user&&
                <>
                <li>
                <NavLink
                    to="/dashboard/my-parcels"
                    className={({ isActive }) =>
                        isActive ? "bg-primary text-white rounded-2xl px-4 py-2" : ""
                    }
                >
                   My Parcels
                </NavLink>
            </li>
                <li>
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive ? "bg-primary text-white rounded-2xl px-4 py-2" : ""
                    }
                >
                  Dashboard
                </NavLink>
            </li>
                </>
            }

        </>
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <span className="btn btn-ghost text-xl">
                       dfdff
                    </span>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end space-x-1">
                    {
                        user ?
                            <a onClick={handleLogOut} className="btn rounded-2xl">Log out</a> :
                            <Link to='/login' className='btn'>Login</Link>
                    }

                    <Link to='/rider' className='btn bg-primary rounded-2xl'>Be a rider</Link><BsArrowUpRightCircleFill size={30} />
                </div>
            </div>

        </div>
    );
};

export default Navbar;