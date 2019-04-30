import React from 'react';
import { RouteLink } from '..';
import { Tag } from '../../model';

export interface CategoryEditProps {
  categoryTag: Tag
};

const CategoryEdit: React.SFC<CategoryEditProps> = ({
  categoryTag
}) => (
  <div className="c_category-edit">
    <header>{categoryTag.value}</header>
    <RouteLink path={`/tag/${categoryTag.id}`}>Done</RouteLink>
  </div>
);

export default CategoryEdit;