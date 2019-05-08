import React from 'react';
import { Tag } from '../../model';

export interface EntryTagListProps {
  entryTags: Tag[]
};

const EntryTagList: React.SFC<EntryTagListProps> = ({
  entryTags
}) => (
  <div className="c_entry-tag-list">
    {entryTags.map(tag =>
      <span key={tag.id} className="c_entry-tag-list__tag">{tag.value}</span>
    )}
  </div>
);

export default EntryTagList;