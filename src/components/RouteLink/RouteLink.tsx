import React from 'react';
import { useRouteContext } from '../../util/route-hooks';
import { classes } from '../../util/common';

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
      className={classes('route-link', className)}
      href={path}
      onClick={event => {
        event.preventDefault();
        routeContext.setPath(path);
      }}
    >{children}</a>
  );
};

export default RouteLink;