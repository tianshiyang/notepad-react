import { useRoutes, RouteObject } from "react-router-dom"
// import { RouteObject }
import React from "react"
import lazyLoad from '@/utils/lazyLoad';

const rootRouter: RouteObject[] = [
  {
    path: '/',
    element: lazyLoad(React.lazy(() => import('@/views/bill/bill')))
  },
  {
    path: '/user',
    element: lazyLoad(React.lazy(() => import('@/views/user/user')))
  }, {
    path: "/data",
    element: lazyLoad(React.lazy(() => import('@/views/data/data')))
  }, {
    path: "/login",
    element: lazyLoad(React.lazy(() => import('@/views/login/Login')))
  }, {
    path: "/detail/:id",
    element: lazyLoad(React.lazy(() => import("@/views/bill/detail")))
  }
]

const Router = () => {
  const routes = useRoutes(rootRouter)
  return routes
}

export default Router