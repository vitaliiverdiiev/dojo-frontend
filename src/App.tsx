import { ReactElement, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  Link,
  NavLinkProps,
  Outlet,
  NavLink as RouterLink,
} from "react-router-dom";
import { Spinner } from "./components";
import { Button } from "./components/ui/button";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { RoutesEnum } from "./models/enums/RoutesEnum";
import { useCounterStore } from "./services/store";
import { cn } from "./utils";

export const NavLink = (props: NavLinkProps) => {
  return (
    <RouterLink
      {...props}
      className={({ isActive }) =>
        cn("text-white", isActive ? "border-b-2" : "", props.className)
      }
    ></RouterLink>
  );
};

export const CounterWidget = (): ReactElement => {
  const { count } = useCounterStore();

  return <span className="text-2xl font-bold">{count}</span>;
};

export const Layout = (): ReactElement => {
  const { logout, user } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#02808f] text-[#ebebeb]">
        <div className="container flex h-[80px] items-center justify-between">
          <Link to="/">
            <span className="text-3xl font-[100] uppercase">Dojo</span>
          </Link>
          <nav>
            <ul className="flex gap-4">
              <li>
                <NavLink to={RoutesEnum.ABOUT}>About</NavLink>
              </li>
              <li>
                <NavLink to={RoutesEnum.RESUME}>Resume</NavLink>
              </li>
              {user && (
                <>
                  {/* <li>
                    <NavLink to={RoutesEnum.BLOG_POSTS}>Blog posts</NavLink>
                  </li> */}
                  {/* <li>
                    <NavLink to={RoutesEnum.COUNTER}>Counter</NavLink>
                  </li> */}
                  <li>
                    <NavLink to={RoutesEnum.TODOS}>Todos</NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
          {user ? (
            <div className="flex items-center gap-4">
              <div>
                <span>{user.email}</span>
              </div>
              <Button
                className="ml-auto text-black"
                variant="outline"
                onClick={logout}
              >
                Sign out
              </Button>
            </div>
          ) : (
            <NavLink to={RoutesEnum.SIGNIN}>Sign in</NavLink>
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
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<Spinner />}>
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;