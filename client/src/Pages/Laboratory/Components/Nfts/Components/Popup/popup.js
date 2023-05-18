import React, { useState } from "react";
import "./popup.css";
import {
  categorizeNfts,
  filterListOfNFTs,
} from "../../../../../../utils/helper";

const Web3 = require("web3");

const web3 = new Web3();
const Popop = ({ filtred, setFiltred, setAllNfts, setOpen }) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const defaultEndDate = `${year}-${month}-${day}`;

  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [minPrice, setMinPrice] = useState(0.0000000001);
  const [maxPrice, setMaxPrice] = useState(1.0);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories((prevCategories) => [...prevCategories, value]);
    } else {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((category) => category !== value)
      );
    }
  };

  const handleFilterApply = () => {
    const filterPerCategorys = filterListOfNFTs(
      categorizeNfts(filtred),
      selectedCategories
    );
    const filterPerDateAndPrice = filterPerCategorys?.filter((nft) => {
      const date = new Date(nft.date * 1000);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      const ethValue = web3.utils.fromWei(nft.price, "ether");
      if (
        startDate !== "" &&
        endDate !== "" &&
        formattedDate >= startDate &&
        formattedDate <= endDate
      ) {
        if (
          minPrice !== "" &&
          ethValue >= minPrice &&
          maxPrice !== "" &&
          ethValue <= maxPrice
        ) {
          return true;
        }
      }

      return false;
    });
    setAllNfts(categorizeNfts(filterPerDateAndPrice));
    // console.log("Applying filters...");
    // console.log("Start Date:", startDate);
    // console.log("End Date:", endDate);
    // console.log("Min Price:", minPrice);
    // console.log("Max Price:", maxPrice);
    //console.log("Selected Categories:", selectedCategories);
    setOpen(false);
  };

  const handleFilterReset = () => {
    setStartDate("2023-01-01");
    setEndDate(defaultEndDate);
    setMinPrice(0.0000000001);
    setMaxPrice(1.0);
    setSelectedCategories([]);
  };

  return (
    <div className="popup">
      <div className="filed">
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="filed">
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="filed">
        <label>Min Price:</label>
        <input
          step="0.0000000001"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </div>
      <div className="filed">
        <label>Max Price:</label>
        <input
          step="0.0000000001"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      <div className="categories">
        <label>Categories:</label>
        <label>
          <input
            type="checkbox"
            value="Electrolytes"
            checked={selectedCategories.includes("Electrolytes")}
            onChange={handleCategoryChange}
          />
          Electrolytes
        </label>
        <label>
          <input
            type="checkbox"
            value="Glucose"
            checked={selectedCategories.includes("Glucose")}
            onChange={handleCategoryChange}
          />
          Glucose
        </label>
        <label>
          <input
            type="checkbox"
            value="Cholesterol"
            checked={selectedCategories.includes("Cholesterol")}
            onChange={handleCategoryChange}
          />
          Cholesterol
        </label>
      </div>
      <div className="filed">
        <button onClick={handleFilterApply}>Apply Filters</button>
        <button onClick={handleFilterReset}>Reset Filters</button>
      </div>
    </div>
  );
};
export default Popop;
