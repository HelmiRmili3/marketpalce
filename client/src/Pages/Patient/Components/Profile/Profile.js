import React, { useState } from "react";
//import emailjs from "@emailjs/browser";
import "../../../../App.css";
import { usePatient } from "../../../../Contexts/patientContext";
import { generateRandomCode } from "../../../../utils/generateCode";
export default function Profile() {
  const { patient } = usePatient();
  const [code, setCode] = useState();
  console.log(patient);
  const sendEmail = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ code: code, email: patient.email }),
      });
      console.log(response); // Optional: Handle response if needed
    } catch (error) {
      console.error("error", error); // Optional: Handle error if needed
    }
  };
  
  // const sendEmail = (e) => {
  //   e.preventDefault();
  //   const generated = generateRandomCode();
  //   setCode(generated);
  //   const emailParams = {
  //     code: code,
  //   };
  //   emailjs
  //     .send(
  //       "service_rr8fi2f",
  //       "template_rb23r3o",
  //       emailParams,
  //       "dEOjDvxCQoWi0vVXV"
  //     )
  //     .then((result) => {
  //       console.log(result.text);
  //     })
  //     .catch((error) => {
  //       console.log(error.text);
  //     });
  // };

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
              <div className="address-value">{patient?.wallet}</div>
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-row-component">
            <TextFiledComponent
              label={"Password"}
              content={patient?.password}
            />
          </div>
          <div className="form-row-component">
            <TextFiledComponent label={"Email"} content={patient?.email} />
          </div>
        </div>
        <div>
          <button onClick={sendEmail}>sendEmail</button>
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

function ChangePassword() {
  return <></>;
}
