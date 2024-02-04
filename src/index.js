import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Root";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />
    }
]);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
