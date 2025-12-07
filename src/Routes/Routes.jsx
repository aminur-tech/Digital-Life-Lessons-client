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
import PricingPage from "../Pages/Pricing/PricingPage";
import PaymentSuccess from "../Pages/Pricing/PaymentSuccess";
import PaymentCancel from "../Pages/Pricing/PaymentCancel";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayouts />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayouts />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoutes><DashboardLayout /></PrivateRoutes>,
    children: [
      // User Dashboard
      { index: true, element: <DashboardHome /> },
      { path: "add-lesson", element: <AddLesson /> },
      { path: "my-lessons", element: <MyLessons /> },
      { path: "my-lessons/update/:id", element: <UpdateLesson /> },
      { path: "my-favorites", element: <MyFavorites /> },
      { path: "profile", element: <UserProfile /> },

      // Pricing
      { path: "pricing", element: <PricingPage /> },
      { path: "payment-success", element: <PaymentSuccess /> },
      { path: "payment-cancel", element: <PaymentCancel /> },

      // Admin Dashboard
      { path: "admin", element: <AdminRoute><AdminHome /></AdminRoute> },
      { path: "admin/manage-users", element: <AdminRoute><ManageUsers /></AdminRoute> },
      { path: "admin/manage-lessons", element: <AdminRoute><ManageLessons /></AdminRoute> },
      { path: "admin/reported-lessons", element: <AdminRoute><ReportedLessons /></AdminRoute> },
      { path: "admin/profile", element: <AdminRoute><AdminProfile /></AdminRoute> },
    ],
  },
]);


