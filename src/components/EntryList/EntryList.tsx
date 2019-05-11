import React from 'react';
import { Entry } from '../../model';
import { RouteLink } from '..';
import { monthAndDay } from '../../util/date';

export interface EntryListProps {
  entries: Entry[],
  onAddEntry: () => void
};

const EntryList: React.SFC<EntryListProps> = ({
  entries,
  onAddEntry
}) => {
  entries = entries.slice();
  entries.sort((a, b) => b.date.localeCompare(a.date) || (b.createdAt || '').localeCompare(a.createdAt || ''));

  return (
    <div className="c_entry-list">
      <header className="c_entry-list__header">
        <span>Journal</span>
        <button
          className="action"
          onClick={() => onAddEntry()}
        >+</button>
      </header>
      <ul className="c_entry-list__entries">
        {
          entries.map(entry => (
            <li
              className="c_entry-list__entry"
              key={entry.id}>
              <RouteLink
                path={`/entry/${entry.id}`}>
                <header className="c_entry-list__entry-date">{monthAndDay(entry.date)}</header>
                {entry.title}
              </RouteLink>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default EntryList;