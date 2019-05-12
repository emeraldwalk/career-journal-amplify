import React from 'react';

export interface SearchBoxProps {
  onChange: (value: string) => void,
  value: string
};

const SearchBox: React.SFC<SearchBoxProps> = ({
  onChange,
  value
}) => {

  return (
    <div
      className="c_search-box"
      >
      <input
        onChange={event => onChange(event.currentTarget.value)}
        type="text"
        value={value}
        />
      <button className="material-icons">search</button>
    </div>
  );
};

export default SearchBox;