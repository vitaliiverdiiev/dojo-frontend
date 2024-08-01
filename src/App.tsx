import { ReactElement, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { Button } from './components/ui/button';

export const Layout = (): ReactElement => {
  const { logout, user } = useAuth();
  return (
    <>
      <header>
        <div className="container h-[80px] flex justify-between items-center">
          <span className="text-2xl font-bold tracking-[8px]">Dojo</span>
          {user && (
            <div className="flex items-center gap-4">
              <div>
                <span>{user.email}</span>
              </div>
              <Button className="ml-auto" variant="outline" onClick={logout}>
                Sign out
              </Button>
            </div>
          )}
        </div>
      </header>
      <main className="h-[calc(100%-80px)]">
        <Outlet />
      </main>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<span>Loading...</span>}>
          <Layout />
        </Suspense>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;
