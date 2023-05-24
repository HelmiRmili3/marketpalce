import React from "react";
import "./costomTextFiled.module.css";
const CustomTextFiled = ({
  handlePeriodChange,
  handleCollectionNameChange,
}) => {
  return (
    <>
      <div className="costom-container">
        <div className="text-field">
          <label type="number"> Period of Purchase : </label>
          <input type="number" onChange={handlePeriodChange}></input>
        </div>
        <div className="text-field">
          <label type="text"> Collection Name :</label>
          <input type="text" onChange={handleCollectionNameChange}></input>
        </div>
      </div>
    </>
  );
};
export default CustomTextFiled;
