import React, { useState, useEffect } from 'react';
import { Entry } from '../../model';
import { RouteLink, SearchBox } from '..';
import { monthAndDay } from '../../util/date';

export interface EntryListProps {
  entries: Entry[],
  onAddEntry: () => void
};

const EntryList: React.SFC<EntryListProps> = ({
  entries: entriesRaw,
  onAddEntry
}) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const filters = filterValue
      .split(',')
      .map(f => f.trim())
      .filter(f => f.length > 0)
      .map((tag, i, a) => {
        const regEx = new RegExp(tag, 'i');
        return regEx.test.bind(regEx);
      });

    const entriesTmp = filters.length === 0
      ? entriesRaw.slice()
      : entriesRaw.filter(
        e => filters.some(f => e.tags.some(f))
      );

    entriesTmp.sort((a, b) => b.date.localeCompare(a.date) || (b.createdAt || '').localeCompare(a.createdAt || ''));

    setEntries(entriesTmp);
  }, [entriesRaw, filterValue]);

  return (
    <div className="c_entry-list">
      <header className="c_entry-list__header">
        <span>Journal</span>
        <button
          className="action"
          onClick={() => onAddEntry()}
        >+</button>
      </header>
      <SearchBox
        onChange={setFilterValue}
        value={filterValue}
      />
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