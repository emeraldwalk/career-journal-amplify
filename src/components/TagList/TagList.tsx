import React from 'react';

export interface TagListProps {
  tags: string[]
};

const TagList: React.SFC<TagListProps> = ({
  tags
}) => (
  <div className="c_tag-list">
    {
      tags.map(tag => (
        <span
          className="c_tag-list__tag"
          key={tag}
        >{tag}</span>
      ))
    }
  </div>
);

export default TagList;