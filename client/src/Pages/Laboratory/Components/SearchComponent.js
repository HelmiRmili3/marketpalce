import React, { useState } from "react";
import "./SearchComponent.css";
import Filters from "./Filters";

const SearchComponent = () => {
  const [searchText, setSearchText] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleCloseFilterPopup = () => {
    setShowFilters(false);
  };
  
  return (
    <div className="search-container">
      <div className="search-field-container">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
        />
        <button onClick={() => {}}>Search</button>
      </div>
      <div className="filters-container">
        <button onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
        {showFilters && (
          <Filters visible={showFilters} onClose={handleCloseFilterPopup} />
          // <div className="text-filters-container">
          //   <input
          //     type="text"
          //     value={filters.textFilter1}
          //     onChange={(e) => handleFilterChange('textFilter1', e.target.value)}
          //     placeholder="Filter 1"
          //   />
          //   <input
          //     type="text"
          //     value={filters.textFilter2}
          //     onChange={(e) => handleFilterChange('textFilter2', e.target.value)}
          //     placeholder="Filter 2"
          //   />
          //   <input
          //     type="text"
          //     value={filters.textFilter3}
          //     onChange={(e) => handleFilterChange('textFilter3', e.target.value)}
          //     placeholder="Filter 3"
          //   />
          // </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
