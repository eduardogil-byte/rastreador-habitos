import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Graficos from "./Graficos.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/graficos",
    element: <Graficos />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
