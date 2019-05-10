import React from 'react';
import { TextEdit } from '../TextEdit';

export interface TagListEditorProps {
  onChange: (tags: string[]) => void,
  tags: string[]
};

const TagListEditor: React.SFC<TagListEditorProps> = ({
  onChange,
  tags
}) => {
  tags = tags.filter(tag => tag !== '');
  const value = tags.join(', ');

  return (
    <div className="c_tag-list-editor">
      <label>Tags</label>
      <TextEdit
        className="c_tag-list-editor__tag-list"
        display={value => value === '' ? '' : value.split(',').map(value => (
          <span
            className="c_tag-list-editor__tag"
            key={value}
          >{value.trim()}</span>
        ))}
        onChange={value =>
          onChange(value.split(',').map(tag => tag.trim()))
        }
        value={value}
      />
    </div>
  );
};

export default TagListEditor;