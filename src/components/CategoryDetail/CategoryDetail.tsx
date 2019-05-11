import React, { useState, useEffect } from 'react';
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
  const [categoryTag, setCategoryTag] = useState<Tag>();
  const [newValue, setNewValue] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    tagsRaw = tagsRaw.map(tag => ({ // eslint-disable-line
      ...tag
    }));
    tagsRaw.sort((a, b) => a.value.localeCompare(b.value));
    setCategoryTag(categoryTagRaw);
    setTags(tagsRaw);
  }, [categoryTagRaw, tagsRaw]);

  if(!categoryTag) {
    return null;
  }

  return (
    <div className="c_category-detail">
      <header className="c_category-detail__header">
        <RouteLink path="/tag">Categories</RouteLink>
        <i className="material-icons">chevron_right</i>
        <span>
          <input
            onBlur={() => onEditTag(categoryTag)}
            onChange={event => setCategoryTag({
              ...categoryTag,
              value: event.currentTarget.value
            })}
            value={categoryTag.value}
            />
        </span>
      </header>
      <ul className="c_category-detail__tag-list">
        {
          tags.map(tag => (
            <li
              className="c_category-detail__tag"
              key={tag.id}>
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
        <li
          className="c_category-detail__new-tag"
          >
          <input
            type="text"
            onChange={event => setNewValue(event.currentTarget.value)}
            value={newValue}
            />
          <button
            className="action"
            disabled={newValue.length === 0}
            onClick={() => {
              onAddTag(newValue);
              setNewValue('');
            }}>+</button>
        </li>
      </ul>
    </div>
  );
};

export default CategoryDetail;