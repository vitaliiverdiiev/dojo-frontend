import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "./App.tsx";
import { ProtectedRoute } from "./components/common/ProtectedRoutes.tsx";
import { Spinner } from "./components/index.ts";
import "./globals.css";
import "./index.css";
import { RoutesEnum } from "./models/enums/RoutesEnum.ts";

export const queryClient = new QueryClient();

// public
const About = lazy(() => import("./pages/about/Page.tsx"));
const Resume = lazy(() => import("./pages/resume/Page.tsx"));
const SignUp = lazy(() => import("./pages/sign-up/SignUp.tsx"));
const SignIn = lazy(() => import("./pages/sign-in/SignIn.tsx"));
// private
// const BlogPost = lazy(() => import("./pages/blog-post/BlogPost.tsx"));
// const BlogPosts = lazy(() => import("./pages/blog-posts/BlogPosts.tsx"));
// const Counter = lazy(() => import("./pages/counter/Page.tsx"));
const Todos = lazy(() => import("./pages/todos/TodosPage.tsx"));

const router = createBrowserRouter(
  [
    {
      element: <App />,
      loader: () => <Spinner />,
      errorElement: <h1>Oops, 404 goes...</h1>,

      children: [
        {
          path: "/",
          element: <Navigate to={RoutesEnum.TODOS} replace={true} />,
        },
        {
          path: RoutesEnum.ABOUT,
          element: <About />,
        },
        {
          path: RoutesEnum.RESUME,
          element: <Resume />,
        },
        {
          path: RoutesEnum.SIGNIN,
          element: <SignIn />,
        },
        {
          path: RoutesEnum.SIGNUP,
          element: <SignUp />,
        },
        {
          path: "/",
          element: <ProtectedRoute />,
          children: [
            // {
            //   path: RoutesEnum.BLOG_POSTS,
            //   element: <BlogPosts />,
            // },
            // {
            //   path: RoutesEnum.BLOG_POSTS + "/:postId",
            //   element: <BlogPost />,
            // },
            // {
            //   path: RoutesEnum.COUNTER,
            //   element: <Counter />,
            // },
            {
              path: RoutesEnum.TODOS,
              element: <Todos />,
            },
          ],
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
