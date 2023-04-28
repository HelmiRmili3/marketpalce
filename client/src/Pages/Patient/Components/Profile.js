import React from "react";
import "../../../App.css";
export default function Profile() {
  return (
    <>
      <div className="patient-Profile-container">
        <div className="form-row">
          <div className="form-row-component">
            <TextFiledComponent label={"Name"} content={"Helmi "} />
          </div>
          <div className="form-row-component">
            <TextFiledComponent label={"Prenom"} content={"Rmili "} />
          </div>
        </div>
        <div className="form-column">
          <div className="form-row-component">
            <div className="name-value-container">
              <label className="name-label">{"Address"}</label>
              <div className="address-value">
                {"0x01493b31E93EebdB7758B7Ea0d4f9049B0dF4880"}
              </div>
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-row-component">
            <TextFiledComponent label={"Password"} content={"helmirmili1566"} />
          </div>
          <div className="form-row-component">
            <TextFiledComponent label={"Email"} content={"rmilihelmi@gmail.com"} />
          </div>
        </div>
      </div>
    </>
  );
}

function TextFiledComponent({ label, content }) {
    return (
      <>
        <div className="name-value-container">
          <label className="name-label">{label}</label>
          <div className="name-value">{content}</div>
        </div>
      </>
    );
  }