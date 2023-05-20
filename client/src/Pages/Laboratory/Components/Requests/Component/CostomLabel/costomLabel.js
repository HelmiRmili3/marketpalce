import React from "react";
import "./costomLabel.css";
const CustomLabel = ({ label }) => {
  return (
    <div className="custom-label">
      <div className="bar"></div>
      <div className="label">{label}</div>
      <div className="bar"></div>
    </div>
  );
};
export default CustomLabel;
