import React from "react";
import { Navigate, RouteObject } from "react-router-dom";

const Home = React.lazy(() => import("../page/home"));
const Download = React.lazy(() => import("../page/download"))
const Set = React.lazy(() => import("../page/set"))
const Songs = React.lazy(() => import("../page/songs"))
const Album = React.lazy(() => import("../page/album"))
const List = React.lazy(() => import("../page/list"))

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/download",
    element: <Download />,
  },
  {
    path: "/set",
    element: <Set />,
  }
  ,
  {
    path: "/songs",
    element: <Songs />,
  }
  ,
  {
    path: "/album",
    element: <Album />,
  }
  ,
  {
    path: "/list",
    element: <List />,
  }
];

export default routes;
