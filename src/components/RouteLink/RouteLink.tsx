import React from 'react';
import { useRouteContext } from '../../util/route-hooks';

export interface RouteLinkProps {
  children: React.ReactNode,
  className?: string,
  path: string
};

const RouteLink: React.SFC<RouteLinkProps> = ({
  children,
  className,
  path
}) => {
  const routeContext = useRouteContext();

  return (
    <a
      className={className}
      href={path}
      onClick={event => {
        event.preventDefault();
        routeContext.setPath(path);
      }}
    >{children}</a>
  );
};

export default RouteLink;