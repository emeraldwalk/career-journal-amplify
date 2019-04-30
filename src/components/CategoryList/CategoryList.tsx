import React, { useState } from 'react';
import { RouteLink } from '..';
import { Tag } from '../../model';

export interface CategoryListProps {
  categoryTags: Tag[],
  onAddCategory: (value: string) => void
};

const CategoryList: React.SFC<CategoryListProps> = ({
  categoryTags,
  onAddCategory
}) => {
  const [newValue, setNewValue] = useState('');
  categoryTags = categoryTags.slice();
  categoryTags.sort((a, b) => a.value.localeCompare(b.value));

  return (
    <div className="c_category-list">
      <header className="c_category-list__header">Categories</header>
      <ul>
        {categoryTags.map(tag => (
          <li key={tag.id}>
            <RouteLink path={`/tag/${tag.id}`}>{tag.value}</RouteLink>
          </li>
        ))}
        <li>
          <button
            className="action"
            onClick={() => {
              onAddCategory(newValue);
              setNewValue('');
            }}>+</button>
          <input
            type="text"
            onChange={event => setNewValue(event.currentTarget.value)}
            value={newValue}
            />
        </li>
      </ul>
    </div>
  );
};

export default CategoryList;