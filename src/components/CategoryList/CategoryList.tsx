import React from 'react';
import { RouteLink } from '..';
import { Tag } from '../../model';

export interface CategoryListProps {
  categoryTags: Tag[]
};

const CategoryList: React.SFC<CategoryListProps> = ({
  categoryTags
}) => (
  <div className="c_category-list">
    <header className="c_category-list__header">Categories</header>
    <ul>
      {categoryTags.map(tag => (
        <li key={tag.id}>
          <RouteLink path={`/tag/${tag.id}`}>{tag.value}</RouteLink>
        </li>
      ))}
    </ul>
  </div>
);

export default CategoryList;