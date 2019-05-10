import React from 'react';
import { Entry } from '../../model';
import { RouteLink } from '..';
import { monthAndDay } from '../../util/display';

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