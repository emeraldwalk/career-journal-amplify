import React, { createContext, useState, useContext } from 'react';

interface RouteContextValue {
  path: string,
  setPath: (path: string) => void
}

interface RouteParser<R> {
  (path: string): R;
}

interface RouteContextProviderProps {
  children: React.ReactNode,
}

/**
 * Context that will provide our route state to components
 * using useRouteContext() hook.
 */
const RouteContext = createContext<RouteContextValue>(null as any);

/**
 * Wrapper on RouteContext.Provider to keep track of path state.
 */
export function RouteContextProvider({
  children,
}: RouteContextProviderProps) {
  const [path, setPathInternal] = useState(window.location.pathname);

  const value = {
    path,
    setPath: (path: string): void => {
      setPathInternal(path);
      window.history.pushState(undefined, '', path);
    }
  };

  return (
    <RouteContext.Provider value={value}>
      {children}
    </RouteContext.Provider>
  );
}

/**
 * Hook to access route context.
 */
export function useRouteContext(
): RouteContextValue;
export function useRouteContext<R>(
  routeParser: RouteParser<R>
): RouteContextValue & { route: R };
export function useRouteContext<R>(
  routeParser?: RouteParser<R>
) {
  const routeContext = useContext(RouteContext);
  return routeParser
    ? {
      ...routeContext,
      route: routeParser(routeContext.path)
    }
    : routeContext;
}