import React from "react";
import "../../../../App.css";
import { usePatient } from "../../../../Contexts/patientContext";
export default function Profile() {
  const {patient} = usePatient();
  return (
    <>
      <div className="patient-Profile-container">
        <div className="form-row">
          <div className="form-row-component">
            <TextFiledComponent label={"Name"} content={patient?.nom} />
          </div>
          <div className="form-row-component">
            <TextFiledComponent label={"Prenom"} content={patient?.prenom} />
          </div>
        </div>
        <div className="form-column">
          <div className="form-row-component">
            <div className="name-value-container">
              <label className="name-label">Wallet :</label>
              <div className="address-value">
                {patient?.wallet}
              </div>
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-row-component">
            <TextFiledComponent label={"Password"} content={patient?.password} />
          </div>
          <div className="form-row-component">
            <TextFiledComponent
              label={"Email"}
              content={patient?.email}
            />
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
