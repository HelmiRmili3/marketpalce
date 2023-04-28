import React, { useState } from "react";

function FilterBar({ handleFilters }) {
  const [nftName, setNftName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minReturnTime, setMinReturnTime] = useState("");
  const [maxReturnTime, setMaxReturnTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFilters({
      nftName,
      startDate,
      endDate,
      minPrice,
      maxPrice,
      minReturnTime,
      maxReturnTime,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nftName">NFT Name</label>
      <input
        type="text"
        id="nftName"
        value={nftName}
        onChange={(e) => setNftName(e.target.value)}
      />

      <label htmlFor="startDate">Start Date</label>
      <input
        type="date"
        id="startDate"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <label htmlFor="endDate">End Date</label>
      <input
        type="date"
        id="endDate"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <label htmlFor="minPrice">Min Price</label>
      <input
        type="number"
        id="minPrice"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />

      <label htmlFor="maxPrice">Max Price</label>
      <input
        type="number"
        id="maxPrice"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <label htmlFor="minReturnTime">Min Return Time</label>
      <input
        type="date"
        id="minReturnTime"
        value={minReturnTime}
        onChange={(e) => setMinReturnTime(e.target.value)}
      />

      <label htmlFor="maxReturnTime">Max Return Time</label>
      <input
        type="date"
        id="maxReturnTime"
        value={maxReturnTime}
        onChange={(e) => setMaxReturnTime(e.target.value)}
      />

      <button type="submit">Filter</button>
    </form>
  );
}
