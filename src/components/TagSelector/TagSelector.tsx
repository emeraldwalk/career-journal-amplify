import React from 'react';
import { Tag } from '../../model';

export interface TagSelectorProps {
  el: React.ComponentType,
  label: string,
  onChange: (value: string) => void,
  selected: string,
  tags: Tag[]
};

const TagSelector: React.SFC<TagSelectorProps> = ({
  el: El,
  label,
  onChange,
  selected,
  tags
}) => (
  <El>
    <label>{label}</label>
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
  </El>
);

export default TagSelector;