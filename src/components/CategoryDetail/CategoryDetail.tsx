import React, { useState } from 'react';
import { RouteLink } from '..';
import { Tag } from '../../model';

export interface CategoryDetailProps {
  categoryTag: Tag,
  onAddTag: (value: string) => void,
  tags: Tag[]
};

const CategoryDetail: React.SFC<CategoryDetailProps> = ({
  categoryTag,
  onAddTag,
  tags
}) => {
  const [newValue, setNewValue] = useState('');

  tags = tags.slice();
  tags.sort((a, b) => a.value.localeCompare(b.value));

  return (
    <div className="c_category-detail">
      <header>{categoryTag.value}</header>
      <RouteLink path={`/tag/${categoryTag.id}/edit`}>Edit</RouteLink>
      <ul>
        {
          tags.map(tag => (
            <li key={tag.id}>{tag.value}</li>
          ))
        }
        <li>
        <button
          className="action"
          disabled={newValue.length === 0}
          onClick={() => {
            onAddTag(newValue);
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

export default CategoryDetail;