import React, { createContext, useState, useContext } from 'react';

/**
 * Context that will provide our route state to components
 * using useRouteContext() hook.
 */
const RouteContext = createContext<{
  path: string,
  setPath: (path: string) => void
}>(null as any);

// interface RouteParser<R> {
//   (path: string): R;
// }

interface RouteContextProviderProps<R> {
  children: React.ReactNode,
  // routeParser: RouteParser<R>
}

/**
 * Wrapper on RouteContext.Provider to initialize the state
 * using useRoutePath() hook.
 */
export const RouteContextProvider: React.SFC<RouteContextProviderProps<any>> = ({
  children
}) => (
  <RouteContext.Provider value={useRoutePath()}>
    {children}
  </RouteContext.Provider>
);

/**
 * Hook to access route context.
 */
export function useRouteContext() {
  return useContext(RouteContext);
}

/**
 * State management for location path.
 */
function useRoutePath() {
  const [path, setPathInternal] = useState(window.location.pathname);
  return {
    path,
    setPath: (path: string): void => {
      setPathInternal(path);
      window.history.pushState(undefined, '', path);
    }
  };
}