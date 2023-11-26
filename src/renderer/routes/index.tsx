import React from "react";
import { Navigate, RouteObject } from "react-router-dom";

const Home = React.lazy(() => import("../page/home"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/home",
    element: <Home />,
  }
];

export default routes;
