import React from 'react';
import { RouteLink } from '..';

export interface CategoryListEditProps {
};

const CategoryListEdit: React.SFC<CategoryListEditProps> = ({}) => (
  <div className="c_category-list-edit">
    <header className="c_category-list-edit__header">
      <span>Categories Edit</span>
      <RouteLink path={`/tag`}>Done</RouteLink>
    </header>
  </div>
);

export default CategoryListEdit;