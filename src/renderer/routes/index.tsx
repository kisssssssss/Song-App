import { Navigate, RouteObject } from 'react-router-dom';

// TODO: 懒加载时切换路由，页面会闪烁
// const Songs = React.lazy(() => import("../page/songs"));
// const Lists = React.lazy(() => import("../page/lists"));
// const Album = React.lazy(() => import("../page/album"));

import Songs from 'page/songs_recommended';
import Lists_Recommended from 'page/lists_recommended';
import Album from 'page/album_recommended';
import List_Detail from 'page/list_detail';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={'/songs'} />,
  },
  {
    path: '/songs',
    element: <Songs />,
  },
  {
    path: '/list',
    children: [
      { path: 'recommended', element: <Lists_Recommended /> },
      { path: ':id', element: <List_Detail /> },
    ],
  },
  {
    path: '/album',
    element: <Album />,
  },
];

export default routes;
