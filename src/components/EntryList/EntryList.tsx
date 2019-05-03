import React from 'react';
import { Entry } from '../../model';

export interface EntryListProps {
  entries: Entry[],
  onAddEntry: () => void
};

const EntryList: React.SFC<EntryListProps> = ({
  entries,
  onAddEntry
}) => (
  <div className="c_entry-list">
    <header className="c_entry-list__header">
      <span>Journal</span>
    </header>
    <ul className="c_entry-list__entries">
      {
        entries.map(entry => (
          <li key={entry.id}>{entry.title}</li>
        ))
      }
      <li>
        <button
          className="action"
          onClick={() => onAddEntry()}
        >+</button>
      </li>
    </ul>
  </div>
);

export default EntryList;