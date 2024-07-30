import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './globals.css';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const BlogPosts = lazy(() => import('./pages/blog-posts/BlogPosts.tsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/blog-posts',
    element: <BlogPosts />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
