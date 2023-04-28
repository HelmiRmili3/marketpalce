// import "./RangeFilterBar.css";
// import React, { useState } from "react";

// export default function RangeFilter({ items, onChange }) {
//   const [dateRange, setDateRange] = useState({
//     startDate: "",
//     endDate: "",
//   });
//   const [priceRange, setPriceRange] = useState({
//     minPrice: 0,
//     maxPrice: 100,
//   });
//   const [a,setA] = useState(false);
//   const [b,setB] = useState(false);
//   const [c,setC] = useState(false);

//   const handleDateChange = (event) => {
//     const { name, value } = event.target;
//     setDateRange((prevState) => ({ ...prevState, [name]: value }));
//     updateItems();
//   };
//   const handlePriceChange = (event) => {
//     const { name, value } = event.target;
//     setPriceRange((prevState) => ({ ...prevState, [name]: parseInt(value) }));
//     updateItems();
//   };
//   const handleFirstChange = (event) => {
//     const { name, value } = event.target;
//     setA(!a);
//     updateItems();
//   };
//   const handleSecondeChange = (event) => {
//     const { name, value } = event.target;
//     setA(!b);
//     updateItems();
//   };
//   const handleThirdChange = (event) => {
//     const { name, value } = event.target;
//     setA(!c);
//     updateItems();
//   };

//   const handleReset = () => {
//     setDateRange({ startDate: "", endDate: "" });
//     setPriceRange({ minPrice: 0, maxPrice: 100 });
//     updateItems({});
//   };

//   const updateItems = () => {
//     const filteredItems = items.filter((item) => {
//       // Filter by date range
//       const itemDate = new Date(item.date);
//       const startDate = new Date(dateRange.startDate);
//       const endDate = new Date(dateRange.endDate);

//       if (
//         dateRange.startDate &&
//         dateRange.endDate &&
//         (itemDate < startDate || itemDate > endDate)
//       ) {
//         return false;
//       }

//       // Filter by price range
//       if (item.price < priceRange.minPrice || item.price > priceRange.maxPrice) {
//         return false;
//       }

//       return true;
//     });
//     const updateCat = () =>{
//       const filteredCat = cats.filter((cat)=>{
//       });
//     }

//     onChange(filteredItems);
//   };

//   return (
//     <div className="range-filter">
//       <div className="date-range">
//         <label htmlFor="start-date">Start date:</label>
//         <input
//           type="date"
//           id="start-date"
//           name="startDate"
//           value={dateRange.startDate}
//           onChange={handleDateChange}
//         />
//         <label htmlFor="end-date">End date:</label>
//         <input
//           type="date"
//           id="end-date"
//           name="endDate"
//           value={dateRange.endDate}
//           onChange={handleDateChange}
//           className="date-range-end"
//         />
//       </div>

//       <div className="name-range">
//         <label htmlFor="start-name">Start name:</label>
//         <input
//           type="text"
//           id="start-name"
//           name="startName"
//           value={nameRange.startName}
//           onChange={handleNameChange}
//         />
//         <label htmlFor="end-name">End name:</label>
//         <input
//           type="text"
//           id="end-name"
//           name="endName"
//           value={nameRange.endName}
//           onChange={handleNameChange}
        
//           />
//         </div>
  
//         <div className="price-range">
//           <label htmlFor="min-price">Min price:</label>
//           <input
//             type="number"
//             id="min-price"
//             name="minPrice"
//             value={priceRange.minPrice}
//             onChange={handlePriceChange}
//           />
//           <label htmlFor="max-price">Max price:</label>
//           <input
//             type="number"
//             id="max-price"
//             name="maxPrice"
//             value={priceRange.maxPrice}
//             onChange={handlePriceChange}
//           />
//         </div>
  
//         <button className="reset-button" onClick={handleReset}>
//           Reset
//         </button>
//       </div>
//     );
//   }
  
