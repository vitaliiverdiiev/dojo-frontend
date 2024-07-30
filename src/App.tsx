import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';

function App() {
  return (
    <AuthProvider>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<span>Loading...</span>}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;
