import { createBrowserRouter } from "react-router";
import HomeLayouts from "../Layouts/HomeLayouts/HomeLayouts";
import Home from "../Pages/Home/Home";
import AuthLayouts from "../Layouts/AuthLayouts/AuthLayouts";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Error from "../Component/Error"
import Dashboard from "../Layouts/DashboardLayout/DashboardLayout";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/UserDashboard/DashboardHome";
import AddLesson from "../Pages/Dashboard/UserDashboard/AddLesson";
import MyLessons from "../Pages/Dashboard/UserDashboard/MyLessons";
import UpdateLesson from "../Pages/Dashboard/UserDashboard/UpdateLesson";
import MyFavorites from "../Pages/Dashboard/UserDashboard/MyFavorites";
import UserProfile from "../Pages/Dashboard/UserDashboard/UserProfile";
import AdminHome from "../Pages/Dashboard/AdminDashboard/AdminHome";
import AdminProfile from "../Pages/Dashboard/AdminDashboard/AdminProfile";
import ReportedLessons from "../Pages/Dashboard/AdminDashboard/ReportedLessons";
import ManageLessons from "../Pages/Dashboard/AdminDashboard/ManageLessons";
import ManageUsers from "../Pages/Dashboard/AdminDashboard/ManageUsers";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayouts,
        errorElement: <Error></Error>,
        children: [
            {
                index: true,
                path: '/',
                Component: Home
            }
        ]
    },
    {
        path: '/auth',
        Component: AuthLayouts,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
    {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      // USER DASHBOARD
      { index:true, element: <DashboardHome /> },
      { path: "add-lesson", element: <AddLesson /> },
      { path: "my-lessons", element: <MyLessons /> },
      { path: "my-lessons/update/:id", element: <UpdateLesson /> },
      { path: "my-favorites", element: <MyFavorites /> },
      { path: "profile", element: <UserProfile /> },

      // ADMIN DASHBOARD
      {
        path: "admin",
        element: (
            <AdminHome />
        ),
      },
      {
        path: "admin/manage-users",
        element: (
            <ManageUsers />
        ),
      },
      {
        path: "admin/manage-lessons",
        element: (
            <ManageLessons />
          
        ),
      },
      {
        path: "admin/reported-lessons",
        element: (
            <ReportedLessons />
        ),
      },
      {
        path: "admin/profile",
        element: (
            <AdminProfile />
        ),
      },
    ],
  },
]);

