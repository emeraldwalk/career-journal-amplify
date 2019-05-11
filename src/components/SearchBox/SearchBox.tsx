import React from 'react';

export interface SearchBoxProps {
};

const SearchBox: React.SFC<SearchBoxProps> = ({}) => (
  <div
    className="c_search-box"
    >
    <input type="text"/>
    <button className="material-icons">search</button>
  </div>
);

export default SearchBox;