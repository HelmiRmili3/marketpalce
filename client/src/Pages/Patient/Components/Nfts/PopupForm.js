import React, { useState } from "react";
import "./PopupForm.css";

import { useNftDatabase } from "../../../../Contexts/NFTdatabase";
import { usePatient } from "../../../../Contexts/patientContext";
import AddIcon from '@mui/icons-material/Add';
const PopupForm = () => {
  const { createNft, patient } = usePatient();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("Electrolytes");
  const [price, setPrice] = useState("");
  const [data, setData] = useState("");
  const [period, setPeriod] = useState("100000000");

  const handleOpenForm = () => {
    setIsOpen(true);
  };
  const handleCloseForm = () => {
    setIsOpen(false);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    createNft(name, price, data, patient.birthday, patient.sexe);
    setIsOpen(false);
    setPrice("");
    setData("");

  };

  return (
    <>
      <button className="open-form-button" onClick={handleOpenForm}>
        <AddIcon/> NFT
      </button>

      {isOpen && (
        <div className="form-container">
          <form>
            <h2>Select a Name:</h2>
            <select
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            >
              <option value="Electrolytes">Electrolytes</option>
              <option value="Glucose">Glucose</option>
              <option value="Cholesterol">Cholesterol</option>
            </select>
            <h2>Enter a Price:</h2>
            <input
              type="text"
              name="price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
            <h2>Enter the Data:</h2>
            <input
              type="text"
              name="data"
              value={data}
              onChange={(event) => setData(event.target.value)}
            />
            <h2>Select a Period:</h2>
            <select
              name="name"
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
            >
              <option value="100000000">5 Days</option>
              <option value="1000000000">7 Days</option>
              <option value="10000000000">1 Month</option>
            </select>
            <label htmlFor="file">File:</label>
            <input type="file" id="file" name="file" onChange={() => {}} />
            <button type="submit" onClick={handleFormSubmit}>
              Submit
            </button>
          </form>

          <button className="close-form-button" onClick={handleCloseForm}>
            Close Form
          </button>
        </div>
      )}
    </>
  );
};

export default PopupForm;
