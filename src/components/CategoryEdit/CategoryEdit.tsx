import React from 'react';
import { RouteLink } from '..';
import { Tag } from '../../model';

export interface CategoryEditProps {
  categoryTag: Tag,
  tags: Tag[]
};

const CategoryEdit: React.SFC<CategoryEditProps> = ({
  categoryTag,
  tags
}) => {
  tags = tags.slice();
  tags.sort((a, b) => a.value.localeCompare(b.value));

  return (
    <div className="c_category-edit">
      <header>
        <span>{categoryTag.value}</span>
        <RouteLink path={`/tag/${categoryTag.id}`}>Done</RouteLink>
      </header>
      <ul>
        {
          tags.map(tag => (
            <li key={tag.id}>{tag.value}</li>
          ))
        }
      </ul>
    </div>
  );
};

export default CategoryEdit;