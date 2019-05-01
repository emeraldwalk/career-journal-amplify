import React from 'react';
import { RouteLink } from '..';

export interface NavProps {
};

const Nav: React.SFC<NavProps> = () => (
  <nav className="c_nav">
    <RouteLink path="/">Entries</RouteLink>
    <RouteLink path="/tag">Tags</RouteLink>
  </nav>
);

export default Nav;