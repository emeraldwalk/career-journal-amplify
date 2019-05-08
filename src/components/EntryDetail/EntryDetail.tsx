import React, { useEffect, useState } from 'react';
import { Entry } from '../../model';
import { RouteLink } from '..';
import { Block } from '../../@types/portable-text';

export interface EntryDetailProps {
  entry: Entry,
  onDone: (entry: Entry) => void
};

const EntryDetail: React.SFC<EntryDetailProps> = ({
  entry: entryRaw,
  onDone
}) => {
  const [entry, setEntry] = useState<Entry>();

  useEffect(() => {
    setEntry({
      ...entryRaw
    });
  }, [entryRaw]);

  if(!entry) {
    return null;
  }

  return (
    <div className="c_entry-detail">
      {entry.date.substr(5)}
      <input
        onChange={event => setEntry({
          ...entry,
          title: event.currentTarget.value
        })}
        type="text"
        value={entry.title}
        />
      <textarea
        className="c_entry-edit__content"
        onChange={event => setEntry({
          ...entry,
          content: textToBlocks(event.target.value)
        })}
        value={blocksToText(entry.content)}>
      </textarea>
      <div className="c_entry-detail__actions">
        <RouteLink
          className="c_entry-detail__action"
          path="/"
        >Cancel</RouteLink>
        <button
          className="action"
          onClick={() => onDone(entry)}
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