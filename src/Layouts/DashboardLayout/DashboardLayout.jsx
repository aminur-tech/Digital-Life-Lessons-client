import React from "react";
import { NavLink, Outlet } from "react-router";
import useRole from "../../Hooks/useRole"; 

const DashboardLayout = () => {
  const { role } = useRole(); 
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* PAGE CONTENT */}
      <div className="drawer-content">
        {/* TOP NAVBAR */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost lg:hidden"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <path d="M4 6h16"></path>
              <path d="M4 12h16"></path>
              <path d="M4 18h16"></path>
            </svg>
          </label>
          <div className="px-4 text-xl font-semibold">Dashboard</div>
        </nav>

        {/* Dashboard pages here */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>

        <div className="flex min-h-full flex-col bg-base-200 is-drawer-close:w-16 lg:w-64 w-64 pt-4">

          {/* MENU ITEMS */}
          <ul className="menu w-full grow px-2">
            {/* ---------------- USER MENU ---------------- */}
            <li>
              <NavLink
                to="/dashboard"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Dashboard Home"
              >
                <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="2"
                  viewBox="0 0 24 24">
                  <path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Dashboard Home</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/add-lesson"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Add Lesson"
              >
                <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="2"
                  viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
                <span className="is-drawer-close:hidden">Add Lesson</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/my-lessons"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Lessons"
              >
                <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="2"
                  viewBox="0 0 24 24">
                  <path d="M9 5h12M9 12h12M9 19h12M5 5h.01M5 12h.01M5 19h.01"></path>
                </svg>
                <span className="is-drawer-close:hidden">My Lessons</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/my-favorites"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Favorites"
              >
                <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="2"
                  viewBox="0 0 24 24">
                  <path
                    d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.54 0 3.04.99 3.57 2.36h.87C14.46 4.99 15.96 4 17.5 4 20 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.18z">
                  </path>
                </svg>
                <span className="is-drawer-close:hidden">My Favorites</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/profile"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Profile"
              >
                <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="2"
                  viewBox="0 0 24 24">
                  <circle cx="12" cy="7" r="4"></circle>
                  <path d="M5.5 21a8.38 8.38 0 0 1 13 0"></path>
                </svg>
                <span className="is-drawer-close:hidden">Profile</span>
              </NavLink>
            </li>

            {/* ---------------- ADMIN MENU ---------------- */}
            {role === "admin" && (
              <>
                <div className="divider is-drawer-close:hidden">Admin Panel</div>

                <li>
                  <NavLink
                    to="/dashboard/admin"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Admin Home"
                  >
                    <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="2"
                      viewBox="0 0 24 24">
                      <path d="M12 2l7 4v6c0 5.523-4.477 10-10 10S2 17.523 2 12V6l7-4z"></path>
                    </svg>
                    <span className="is-drawer-close:hidden">Admin Home</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/admin/manage-users"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Users"
                  >
                    <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="2"
                      viewBox="0 0 24 24">
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M17 11v6m3-3h-6"></path>
                    </svg>
                    <span className="is-drawer-close:hidden">Manage Users</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/admin/manage-lessons"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Lessons"
                  >
                    <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="2"
                      viewBox="0 0 24 24">
                      <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                    <span className="is-drawer-close:hidden">Manage Lessons</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/admin/reported-lessons"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Reported Lessons"
                  >
                    <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="2"
                      viewBox="0 0 24 24">
                      <path d="M12 9v4m0 4h.01"></path>
                      <path d="M10 3h4l7 7v4l-7 7h-4l-7-7v-4z"></path>
                    </svg>
                    <span className="is-drawer-close:hidden">Reported Lessons</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/admin/profile"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Admin Profile"
                  >
                    <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="2"
                      viewBox="0 0 24 24">
                      <circle cx="12" cy="7" r="4"></circle>
                      <path d="M5.5 21a8.38 8.38 0 0 1 13 0"></path>
                    </svg>
                    <span className="is-drawer-close:hidden">Admin Profile</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
