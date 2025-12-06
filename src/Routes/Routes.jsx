import { createBrowserRouter } from "react-router";
import HomeLayouts from "../Layouts/HomeLayouts/HomeLayouts";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayouts,
        children: [
            {

            }
        ]}
        ])