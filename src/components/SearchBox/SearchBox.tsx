import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../util/debounce-hook';

export interface SearchBoxProps {
  onChange: (value: string) => void,
  value: string
};

const SearchBox: React.SFC<SearchBoxProps> = ({
  onChange,
  value: valueRaw
}) => {
  const [value, setValue] = useState(valueRaw);
  const debounced = useDebounce(value, 500);

  useEffect(() => {
    if(debounced !== valueRaw) {
      onChange(debounced);
    }
  }, [debounced, onChange, valueRaw]);

  return (
    <div
      className="c_search-box"
      >
      <input
        onChange={event => setValue(event.currentTarget.value)}
        type="text"
        value={value}
        />
      <button className="material-icons">search</button>
    </div>
  );
};

export default SearchBox;