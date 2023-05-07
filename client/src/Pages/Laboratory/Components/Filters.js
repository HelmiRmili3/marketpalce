import React, { useState } from "react";
import "../../Patient/Components/Popup.css";
import "./filters.css";
import { useLabo } from "../../../Contexts/laboContext";
import Web3 from "web3";
const web3 = new Web3("http://localhost:7545");
export default function Filters({ visible, onClose }) {
  const minPrice = parseFloat(0);
  const maxPrice = parseFloat(1);
  const { notOwnedList, setFiltred, Category } = useLabo();
  const today = new Date().toISOString().substr(0, 10);

  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: today,
  });
  const [priceRange, setPriceRange] = useState({
    minPrice: minPrice,
    maxPrice: maxPrice,
  });

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);

  const handleCheckbox1 = (event) => {
    const isChecked = event.target.checked;
    setIsChecked1(isChecked);
  };
  const handleCheckbox2 = (event) => {
    const isChecked = event.target.checked;
    setIsChecked2(isChecked);
  };
  const handleCheckbox3 = (event) => {
    const isChecked = event.target.checked;
    setIsChecked3(isChecked);
  };
  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setDateRange((prevState) => ({ ...prevState, [name]: value }));
  };
  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setPriceRange((prevState) => ({ ...prevState, [name]: parseFloat(value) }));
  };
  const handleReset = () => {
    setIsChecked1(false);
    setIsChecked2(false);
    setIsChecked3(false);
    setDateRange({ startDate: "", endDate: today });
    setPriceRange({ minPrice: minPrice, maxPrice: maxPrice });
  };
  const updateItems = () => {
    // Filter the owners based on the selected fields
    // console.log(filterdBycategory);
    // if (filterdBycategory) {
    //   setFilteredOwners(
    //     Object.keys(filterdBycategory).filter((owner) => {
    //       // Check if all selected fields have at least one value in the owner object
    //       let valid1 = false;
    //       let valid2 = false;
    //       let valid3 = false;
    //       if (isChecked1 && filterdBycategory[owner].Electrolytes.length > 0) {
    //         valid1 = true;
    //       }
    //       if (isChecked2 && filterdBycategory[owner].Glucose.length > 0) {
    //         valid2 = true;
    //       }
    //       if (isChecked3 && filterdBycategory[owner].Cholesterol.length > 0) {
    //         valid3 = true;
    //       }
    //       if (
    //         isChecked1 === valid1 &&
    //         isChecked2 === valid2 &&
    //         isChecked3 === valid3
    //       ) {
    //         return true;
    //       }
    //       return false;
    //     })
    //   );
    // }

    // // let f = notOwnedList.filter((nft) => filteredOwners.includes(nft.owner));
    // // setFiltrednfts(f);
    // // console.log(f);
    const filtrednfts = notOwnedList?.filter((item) => {
      const itemDate = new Date(item.date * 1000);
      const itemPrice = web3.utils.fromWei(item.price, "ether");
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);
      // Filter by date
      if (
        dateRange.startDate &&
        dateRange.endDate &&
        (itemDate < startDate || itemDate > endDate)
      ) {
        return false;
      }
      //Filter by price range
      if (itemPrice < priceRange.minPrice || itemPrice > priceRange.maxPrice) {
        return false;
      }
      return true;
    });
    setFiltred(filtrednfts);
    Category(filtrednfts);
  };

  if (!visible) return null;
  return (
    <div>
      <div className="popup">
        <div className="popup-inner">
          <div className="range-filter">
            <div className="date-range">
              <label>Pick tests : </label>
            </div>
            <div className="date-range">
              <label>
                <input
                  type="checkbox"
                  name="checkbox1"
                  value="Electrolytes"
                  checked={isChecked1}
                  onChange={handleCheckbox1}
                />
                Electrolytes
              </label>
              <label>
                <input
                  type="checkbox"
                  name="checkbox2"
                  value="Glucose"
                  checked={isChecked2}
                  onChange={handleCheckbox2}
                />
                Glucose
              </label>

              <label>
                <input
                  type="checkbox"
                  name="checkbox3"
                  value="Cholesterol"
                  checked={isChecked3}
                  onChange={handleCheckbox3}
                />
                Cholesterol
              </label>
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
                value={dateRange.endDate ? dateRange.endDate : today}
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
                step="0.0001"
                value={parseFloat(priceRange.minPrice)}
                onChange={handlePriceChange}
              />
              <label htmlFor="max-price">Max price:</label>
              <input
                type="number"
                id="max-price"
                name="maxPrice"
                step="0.0001"
                value={parseFloat(priceRange.maxPrice)}
                onChange={handlePriceChange}
              />
            </div>
            <button
              className="reset-button"
              onClick={() => {
                updateItems();
                onClose();
              }}
            >
              Apply
            </button>
            <button className="reset-button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
