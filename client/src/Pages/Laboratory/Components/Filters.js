import React, { useState } from "react";
import "../../Patient/Components/Popup.css";
import "./filters.css";
const Filters = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <div>
      <div className="popup">
        <div className="popup-inner">
          <RangeFilter onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default Filters;

function RangeFilter({ items, onChange ,onClose}) {
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [name, setName] = useState();

  const [priceRange, setPriceRange] = useState({
    minPrice: 0,
    maxPrice: 100,
  });

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setDateRange((prevState) => ({ ...prevState, [name]: value }));
    updateItems();
  };

  const handleNameChange = (event) => {
    const name = event.target;
    setName(name);
    updateItems();
  };

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setPriceRange((prevState) => ({ ...prevState, [name]: parseInt(value) }));
    updateItems();
  };

  const handleReset = () => {
    setDateRange({ startDate: "", endDate: "" });
    setName("");
    setPriceRange({ minPrice: 0, maxPrice: 100 });
    updateItems({});
  };

  const updateItems = () => {
    const filteredItems = items.filter((item) => {
      // Filter by date range
      const itemDate = new Date(item.date);
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);

      if (
        dateRange.startDate &&
        dateRange.endDate &&
        (itemDate < startDate || itemDate > endDate)
      ) {
        return false;
      }

      // Filter by name range
      if (name != "" && item.name === name) {
        return false;
      }

      // Filter by price range
      if (
        item.price < priceRange.minPrice ||
        item.price > priceRange.maxPrice
      ) {
        return false;
      }

      return true;
    });

    onChange(filteredItems);
  };

  return (
    <div className="range-filter">
      <div className="name-range">
        <label htmlFor="end-name">Test name:</label>
        <input
          type="text"
          id="end-name"
          name="endName"
          placeholder="test"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div className="date-range">
        <label htmlFor="start-date">Start date:</label>
        <input
          type="date"
          id="start-date"
          name="startDate"
          value={dateRange.startDate}
          onChange={handleDateChange}
        />
        <label htmlFor="end-date">End date:</label>
        <input
          type="date"
          id="end-date"
          name="endDate"
          value={dateRange.endDate}
          onChange={handleDateChange}
          className="date-range-end"
        />
      </div>

      <div className="price-range">
        <label htmlFor="min-price">Min price:</label>
        <input
          type="number"
          id="min-price"
          name="minPrice"
          value={priceRange.minPrice}
          onChange={handlePriceChange}
        />
        <label htmlFor="max-price">Max price:</label>
        <input
          type="number"
          id="max-price"
          name="maxPrice"
          value={priceRange.maxPrice}
          onChange={handlePriceChange}
        />
      </div>
       <button onClick={onClose}>Apply filters</button>
     {/* <button onClick={() => {}}>Reset filters</button> */}
      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}
