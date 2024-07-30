import { useAuth } from '@/hooks/useAuth';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();

  if (!user) {
    // user is not authenticated
    return <Navigate to="/sign-in" />;
  }

  return children;
};
