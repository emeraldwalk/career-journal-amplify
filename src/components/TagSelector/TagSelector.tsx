import React from 'react';
import { Tag } from '../../model';

export interface TagSelectorProps {
  onChange: (value: string) => void,
  selected: string,
  tags: Tag[]
};

const TagSelector: React.SFC<TagSelectorProps> = ({
  onChange,
  selected,
  tags
}) => (
  <select
    className="c_tag-selector"
    onChange={event => onChange(event.currentTarget.value)}
    value={selected}>
    <option value="">--</option>
    {
      tags.map(tag => (
        <option key={tag.id} value={tag.id}>{tag.value}</option>
      ))
    }
  </select>
);

export default TagSelector;