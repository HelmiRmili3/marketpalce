import React, { useState } from "react";
import "./SearchComponent.css";
import Filters from "./filters";
import { useLabo } from "../../../Contexts/laboContext";
const SearchComponent = ({ toggalMode, mode }) => {
  const { setFiltred, Category, notOwnedList } = useLabo();
  const [searchText, setSearchText] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleCloseFilterPopup = () => {
    setShowFilters(false);
  };
  const handleShowFilterPopup = () => {
    setShowFilters(true);
  };

  const updateItems = () => {
    const filteredItems = notOwnedList.filter((item) => {
      if (searchText != "" && searchText != item.owner) {
        return false;
      }
      return true;
    });
    setFiltred(filteredItems);
    Category(filteredItems);
  };
  return (
    <div className="search-container">
      <div className="search-field-container">
        <input
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            console.log(searchText);
          }}
          placeholder="Patient"
        />
        <button onClick={updateItems}>Search</button>
      </div>
      <div className="search-container"></div>
      <div className="filters-container">
        <button onClick={toggalMode}>{mode ? "By NFT" : "By Patient"}</button>
        <button onClick={handleShowFilterPopup}>Show Filters</button>
        <Filters visible={showFilters} onClose={handleCloseFilterPopup} />
      </div>
    </div>
  );
};

export default SearchComponent;
