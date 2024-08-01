import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './globals.css';
import './index.css';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProtectedRoute } from './components/common/ProtectedRoutes.tsx';

const queryClient = new QueryClient();

const BlogPosts = lazy(() => import('./pages/blog-posts/BlogPosts.tsx'));
const BlogPost = lazy(() => import('./pages/blog-post/BlogPost.tsx'));
const SignUp = lazy(() => import('./pages/sign-up/SignUp.tsx'));
const SignIn = lazy(() => import('./pages/sign-in/SignIn.tsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/blog-posts" />,
      },
      {
        path: '/blog-posts',
        element: (
          <ProtectedRoute>
            <BlogPosts />
          </ProtectedRoute>
        ),
      },
      {
        path: '/blog-posts/:postId',
        element: (
          <ProtectedRoute>
            <BlogPost />
          </ProtectedRoute>
        ),
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
      {
        path: '/sign-in',
        element: <SignIn />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
