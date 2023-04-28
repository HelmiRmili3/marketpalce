import React from "react";
import {} from "react";
import "../App.css";
export default function TextFiledComponent({ label, content }) {
  return (
    <>
      <div className="name-value-container">
        <label className="name-label">{label}</label>
        <div className="name-value">{content}</div>
      </div>
    </>
  );
}
