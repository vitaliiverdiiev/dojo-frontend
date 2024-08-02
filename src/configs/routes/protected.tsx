import { ProtectedRoute } from "@/components/common/ProtectedRoutes";
import { RoutesEnum } from "@/models/enums/RoutesEnum";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const BlogPosts = lazy(() => import("@/pages/blog-posts/BlogPosts"));
const Todos = lazy(() => import("@/pages/todos/Page"));
const Counter = lazy(() => import("@/pages/counter/Page"));

export const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: RoutesEnum.BLOG_POSTS,
        element: <BlogPosts />,
      },
      {
        path: RoutesEnum.COUNTER,
        element: <Counter />,
      },
      {
        path: RoutesEnum.TODOS,
        element: <Todos />,
      },
    ],
  },
];
