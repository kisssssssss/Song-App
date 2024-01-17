import React from "react";
import { Navigate, RouteObject } from "react-router-dom";

import { SONGS, LISTS, ALBUM } from "./url";

// TODO: 懒加载时切换路由，页面会闪烁
// const Songs = React.lazy(() => import("../page/songs"));
// const Lists = React.lazy(() => import("../page/lists"));
// const Album = React.lazy(() => import("../page/album"));

import Songs from "../page/songs";
import Lists from "../page/lists";
import Album from "../page/album";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to={SONGS} />,
  },
  {
    path: SONGS,
    element: <Songs />,
  },
  {
    path: LISTS,
    element: <Lists />,
  },
  {
    path: ALBUM,
    element: <Album />,
  },
];

export default routes;
