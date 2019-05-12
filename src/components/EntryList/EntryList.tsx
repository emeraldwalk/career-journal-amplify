import React, { useState, useEffect } from 'react';
import { Entry, Tag } from '../../model';
import { RouteLink, SearchBox, TagList } from '..';
import { monthAndDay } from '../../util/date';

/**
 * Get category values from category id map on entry.
 */
function getCategoryValues(
  tags: Tag[],
  e: Entry
): string[] {
  return Object
    .values(e.categoryTags)
    .map(
      id => {
        const tag = tags.find(t => t.id === id);
        return tag && tag.value;
      }
    )
    .filter((value): value is string => value != null);
}

export interface EntryListProps {
  entries: Entry[],
  onAddEntry: () => void,
  tags: Tag[]
};

const EntryList: React.SFC<EntryListProps> = ({
  entries: entriesRaw,
  onAddEntry,
  tags
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
        e => {
          const tagValues = [
            ...getCategoryValues(tags, e),
            ...e.tags
          ];

          return filters.some(filter => {
            return tagValues.some(filter);
          })
        }
      );

    entriesTmp.sort((a, b) => b.date.localeCompare(a.date) || (b.createdAt || '').localeCompare(a.createdAt || ''));

    setEntries(entriesTmp);
  }, [entriesRaw, filterValue, tags]);

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
                <span>{entry.title}</span>
                <TagList
                  tags={entry.tags}
                />
              </RouteLink>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default EntryList;