import React, { useEffect, useState } from 'react';
import { Entry } from '../../model';
import { RouteLink } from '..';

export interface EntryEditProps {
  entry: Entry,
  onDone: (entry: Entry) => void
};

const EntryEdit: React.SFC<EntryEditProps> = ({
  entry: entryRaw,
  onDone
}) => {
  const [entry, setEntry] = useState<Entry>();

  useEffect(() => {
    setEntry({
      ...entryRaw
    });
  }, [entryRaw]);

  if(!entry || !entry.date) {
    return null;
  }

  return (
    <div className="c_entry-edit">
      {entry.date.substr(5)}
      <input
        onChange={event => setEntry({
          ...entry,
          title: event.currentTarget.value
        })}
        type="text"
        value={entry.title}
        />
      <div className="c_entry-edit__actions">
        <RouteLink
          className="c_entry-edit__action"
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

export default EntryEdit;