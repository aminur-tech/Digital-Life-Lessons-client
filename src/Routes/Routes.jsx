import { createBrowserRouter } from "react-router";
import HomeLayouts from "../Layouts/HomeLayouts/HomeLayouts";
import Home from "../Pages/Home/Home";
import AuthLayouts from "../Layouts/AuthLayouts/AuthLayouts";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Error from "../Component/Error"

export const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayouts,
        errorElement:<Error></Error>,
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
    }
])