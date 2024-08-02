import { RoutesEnum } from '@/models/enums/RoutesEnum';
import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const About = lazy(() => import('@/pages/about/Page'));
const Signin = lazy(() => import('@/pages/sign-in/SignIn'));
const Signup = lazy(() => import('@/pages/sign-up/SignUp'));

export const publicRoutes: RouteObject[] = [
  {
    path: RoutesEnum.ABOUT,
    element: <About />,
  },
  {
    path: RoutesEnum.SIGNIN,
    element: <Signin />,
  },
  {
    path: RoutesEnum.SIGNUP,
    element: <Signup />,
  },
  {
    path: '*',
    element: <Navigate to={RoutesEnum.SIGNIN} />,
  },
];
