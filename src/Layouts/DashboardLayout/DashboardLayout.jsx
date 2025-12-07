import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import useRole from "../../Hooks/useRole";
import useAuth from "../../Hooks/useAuth";

// React Icons
import { FiMenu, FiHome, FiPlusCircle, FiHeart, FiUser } from "react-icons/fi";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { TbLayoutNavbarFilled } from "react-icons/tb";

const DashboardLayout = () => {
    const { user } = useAuth();
    const { role } = useRole();

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label
                        htmlFor="my-drawer-4"
                        aria-label="open sidebar"
                        className="btn btn-square btn-ghost"
                    >
                        {/* Toggle Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                </label>

                <div className="flex justify-between items-center w-full px-4">
                    <div className="text-xl font-semibold">Digital Life Lessons</div>

                    <div className="tooltip tooltip-left" data-tip={user?.displayName}>
                        <img
                            src={user?.photoURL}
                            alt="User"
                            className="w-10 h-10 rounded-full object-cover cursor-pointer"
                            referrerPolicy="no-referrer"
                        />
                    </div>
                </div>
            </nav>

            <div>
                <Outlet />
            </div>
        </div>

            {/* Sidebar */ }
    <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            <ul className="menu w-full grow px-2">
                <Link to="/">
                    <img
                        src="https://i.ibb.co.com/5WQymhQv/images-removebg-preview.png"
                        alt=""
                    />
                </Link>

                {/* USER MENU */}
                {role === "user" && (
                    <>
                        <li>
                            <NavLink
                                to="/dashboard"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="Dashboard Home"
                            >
                                <FiHome className="text-lg" />
                                <span className="is-drawer-close:hidden">Dashboard Home</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/add-lesson"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="Add Lesson"
                            >
                                <FiPlusCircle className="text-lg" />
                                <span className="is-drawer-close:hidden">Add Lesson</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/my-lessons"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="My Lessons"
                            >
                                <MdOutlineLibraryBooks className="text-xl" />
                                <span className="is-drawer-close:hidden">My Lessons</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/my-favorites"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="Favorites"
                            >
                                <FiHeart className="text-lg" />
                                <span className="is-drawer-close:hidden">My Favorites</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/profile"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="Profile"
                            >
                                <FiUser className="text-lg" />
                                <span className="is-drawer-close:hidden">Profile</span>
                            </NavLink>
                        </li>
                    </>
                )}

                {/* ADMIN MENU */}
                {role === "admin" && (
                    <>
                        <div className="divider is-drawer-close:hidden">Admin Panel</div>

                        <li>
                            <NavLink
                                to="/dashboard/admin"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="Admin Home"
                            >
                                <FiHome className="text-lg" />
                                <span className="is-drawer-close:hidden">Admin Home</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/admin/manage-users"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="Manage Users"
                            >
                                <AiOutlineUsergroupAdd className="text-xl" />
                                <span className="is-drawer-close:hidden">Manage Users</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/admin/manage-lessons"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="Manage Lessons"
                            >
                                <MdOutlineLibraryBooks className="text-xl" />
                                <span className="is-drawer-close:hidden">Manage Lessons</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/admin/reported-lessons"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="Reported Lessons"
                            >
                                <HiOutlineExclamationTriangle className="text-xl" />
                                <span className="is-drawer-close:hidden">Reported Lessons</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/admin/profile"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="Admin Profile"
                            >
                                <FiUser className="text-lg" />
                                <span className="is-drawer-close:hidden">Admin Profile</span>
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </div>
    </div>
        </div >
    );
};

export default DashboardLayout;
