import { useAuth } from '@/hooks/useAuth';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

const AppRoutes = () => {
  const routes: RouteObject[] = [];
  const { user } = useAuth();

  if (user) {
    routes.push(...protectedRoutes);
  } else {
    routes.push(...publicRoutes);
  }

  const router = createBrowserRouter([...routes]);
  return { router };
};

export default AppRoutes;
