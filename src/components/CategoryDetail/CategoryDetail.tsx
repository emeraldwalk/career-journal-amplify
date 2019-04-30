import React from 'react';
import { RouteLink } from '..';
import { Tag } from '../../model';

export interface CategoryDetailProps {
  categoryTag: Tag
};

const CategoryDetail: React.SFC<CategoryDetailProps> = ({
  categoryTag
}) => (
  <div className="c_category-detail">
    <header>{categoryTag.value}</header>
    <RouteLink path={`/tag/${categoryTag.id}/edit`}>Edit</RouteLink>
  </div>
);

export default CategoryDetail;