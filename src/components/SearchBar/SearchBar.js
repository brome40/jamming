import React, { useState } from "react";
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  }

  const handleEnterKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm);
    }
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="SearchBar">
      <input
        placeholder="Enter A Song, Album, or Artist"
        onChange={handleSearchTermChange}
        onKeyDown={handleEnterKeyDown}
      />
      <button className="SearchButton" onClick={handleSearch}>SEARCH</button>
    </div>
  );
};

export default SearchBar;
