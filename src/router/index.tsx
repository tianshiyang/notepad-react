import { useRoutes, RouteObject } from "react-router-dom"
// import { RouteObject }
import React from "react"
import lazyLoad from '@/utils/lazyLoad';

const rootRouter: RouteObject[] = [
  {
    path: '/about',
    element: lazyLoad(React.lazy(() => import('@/views/about')))
  }, {
    path: "/home",
    element: lazyLoad(React.lazy(() => import("@/views/home")))
  }
]

const Router = () => {
  const routes = useRoutes(rootRouter)
  return routes
}

export default Router