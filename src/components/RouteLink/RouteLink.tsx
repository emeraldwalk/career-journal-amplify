import React from 'react';
import { useRouteContext } from '../../util/route';

export interface RouteLinkProps {
  children: React.ReactNode,
  path: string
};

const RouteLink: React.SFC<RouteLinkProps> = ({
  children,
  path
}) => {
  const routeContext = useRouteContext();

  return (
    <a
      href={path}
      onClick={event => {
        event.preventDefault();
        routeContext.setPath(path);
      }}
    >{children}</a>
  );
};

export default RouteLink;