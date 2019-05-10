import React from 'react';
import { RouteLink } from '..';

export interface NavProps {
};

const Nav: React.SFC<NavProps> = () => (
  <nav className="c_nav">
    <RouteLink className="c_nav__link" path="/">Entries</RouteLink>
    <RouteLink className="c_nav__link" path="/tag">Categories</RouteLink>
  </nav>
);

export default Nav;