import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
import { UnknowType } from '@/models/types/UnknownType';
import { IUser } from '@/models/interfaces/IUser';

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  login: (data: UnknowType, token: string) => Promise<void>;
  logout: () => void;
  getToken: () => string | null;
}

// Create the context with a default value of the correct type
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useLocalStorage('user', null);
  const [token, setToken] = useLocalStorage('token', null);
  const navigate = useNavigate();

  // Call this function when you want to authenticate the user
  const login = useCallback(
    async (data: UnknowType, token: string) => {
      setUser(data as IUser);
      setToken(token);
      navigate('/blog-posts');
    },
    [navigate, setUser, setToken],
  );

  // Call this function to sign out the logged-in user
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    navigate('/', { replace: true });
  }, [navigate, setUser, setToken]);

  const getToken = useCallback(() => token, [token]);

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      getToken,
    }),
    [user, token, login, logout, getToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
