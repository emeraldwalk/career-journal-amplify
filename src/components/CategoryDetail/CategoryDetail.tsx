import React, { useState } from 'react';
import { RouteLink } from '..';
import { Tag } from '../../model';

export interface CategoryDetailProps {
  categoryTag: Tag,
  onAddTag: (value: string) => void,
  onEditTag: (tag: Tag) => void,
  tags: Tag[]
};

const CategoryDetail: React.SFC<CategoryDetailProps> = ({
  categoryTag: categoryTagRaw,
  onAddTag,
  onEditTag,
  tags: tagsRaw
}) => {
  tagsRaw = tagsRaw.map(tag => ({
    ...tag
  }));

  tagsRaw.sort((a, b) => a.value.localeCompare(b.value));

  const [categoryTag, setCategoryTag] = useState(categoryTagRaw);
  const [newValue, setNewValue] = useState('');
  const [tags, setTags] = useState(tagsRaw);

  return (
    <div className="c_category-detail">
      <header>
        <input
          onBlur={() => onEditTag(categoryTag)}
          onChange={event => setCategoryTag({
            ...categoryTag,
            value: event.currentTarget.value
          })}
          value={categoryTag.value}
          />
      </header>
      <RouteLink path={`/tag/${categoryTag.id}/edit`}>Edit</RouteLink>
      <ul>
        {
          tags.map(tag => (
            <li key={tag.id}>
              <input
                type="text"
                onBlur={() => {
                  onEditTag(tag)
                }}
                onChange={event => {
                  const i = tags.findIndex(t => t.id === tag.id);
                  setTags([
                    ...tags.slice(0, i),
                    {
                      ...tag,
                      value: event.currentTarget.value
                    },
                    ...tags.slice(i + 1)
                  ]);
                }}
                value={tag.value}
              />
            </li>
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