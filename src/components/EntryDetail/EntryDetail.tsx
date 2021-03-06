import React, { useEffect, useState } from 'react';
import { Entry, Tag } from '../../model';
import { Dropdown, RouteLink, TagListEditor } from '..';
import { Block } from '../../@types/portable-text';
import { monthAndDay } from '../../util/date';
import { TextEdit } from '../TextEdit';

export interface EntryDetailProps {
  entry: Entry,
  onDone: (entry?: Entry) => void,
  tags: Tag[]
};

const EntryDetail: React.SFC<EntryDetailProps> = ({
  entry: entryRaw,
  onDone,
  tags
}) => {
  const [entry, setEntryBase] = useState<Entry>();
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setEntryBase({
      ...entryRaw
    });
  }, [entryRaw]);

  if(!entry) {
    return null;
  }

  function setEntry(entry: Entry) {
    setEntryBase(entry);
    setIsDirty(true);
  }

  const categoryTags = tags.filter(tag => tag.parentId === '__ROOT__');
  categoryTags.sort((a, b) => a.value.localeCompare(b.value));

  return (
    <div className="c_entry-detail">
      <header className="c_entry-detail__header">
        <TextEdit
          className="c_entry-detail__date"
          display={monthAndDay}
          value={entry.date}
          onChange={date =>
            setEntry({
              ...entry,
              date
            })
          }
        />
      </header>
      <input
        onChange={event => setEntry({
          ...entry,
          title: event.currentTarget.value
        })}
        type="text"
        value={entry.title}
        />
      <textarea
        className="c_entry-detail__content"
        onChange={event => setEntry({
          ...entry,
          content: textToBlocks(event.target.value)
        })}
        value={blocksToText(entry.content)}>
      </textarea>
      <TagListEditor
        onChange={tags => {
          setEntry({
            ...entry,
            tags
          })
        }}
        tags={entry.tags}
      />
      <div className="c_entry-detail__category-list">
      {
        categoryTags.map(category => (
          <Dropdown
            el={React.Fragment}
            items={
              tags
                .filter(tag => tag.parentId === category.id)
                .map(({ id, value }) => ({ display: value, value: id }))
            }
            key={category.value}
            label={category.value}
            onChange={value => {
              setEntry({
                ...entry,
                categoryTags: {
                  ...entry.categoryTags,
                  [category.id]: value
                }
              })
            }}
            selected={entry.categoryTags[category.id]}
            />
        ))
      }
      </div>
      <div className="c_entry-detail__actions">
        <RouteLink
          className="action c_entry-detail__action"
          path="/"
        >Cancel</RouteLink>
        <button
          className="action"
          onClick={() => onDone(isDirty ? entry : undefined)}
        >Done</button>
      </div>
    </div>
  );
};

function blocksToText(
  blocks: Block[]
): string {
  return blocks
    .map(block => block
      .children
      .map(span => span.text == null ? '' : span.text)
      .join(' ')
    )
    .join('\n');
}

function textToBlocks(
  text: string
): Block[] {
  return text
    .split('\n')
    .map(p => ({
      _type: 'block',
      children: [
        {
          _type: 'span',
          marks: [],
          text: p === '' ? null : p
        }
      ],
      markDefs: []
    } as Block));
}

export default EntryDetail;