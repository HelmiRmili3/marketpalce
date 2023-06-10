import React, { useState, useEffect } from "react";
import "./PopupForm.css";
import { usePatient } from "../../../../Contexts/patientContext";
import QrScanner from "react-qr-scanner";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
const PopupForm = () => {
  const { createNft, patient } = usePatient();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("Electrolytes");
  const [price, setPrice] = useState("");
  const [data, setData] = useState("");
  const [period, setPeriod] = useState("86400");
  const [cameraStream, setCameraStream] = useState(null);
  const [openCamera, setOpenCamera] = useState(false);
  const handleOpenForm = () => {
    setIsOpen(true);
  };
  const handleCloseForm = () => {
    setIsOpen(false);
  };
  const handleInputChange = (event) => {
    setData(event.target.value.text);
  };

  const handleFormSubmit = (event) => {
    console.log(name, price, data, patient.birthday, patient.sexe);
    event.preventDefault();
    const text = toString(data.text);
    createNft(name, price, text, patient.birthday, patient.sexe);
    setIsOpen(false);
    setPrice("");
    setData("");
  };
  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    startScanning();
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const fetchData = async () =>{
      try {
          const response = await axios.get('http://172.16.14.28:5000/send');
          setData(response.data);
          console.log(data);
      } catch (error) {
          console.error(error);
      }
  }
  fetchData();
  });

  return (
    <>
      <button className="open-form-button" onClick={handleOpenForm}>
        <AddIcon /> NFT
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
            {openCamera ? (
              <QrScanner
                delay={600}
                onError={(error) => console.log(error)}
                onScan={(e) => {
                  setData(e);
                }}
                style={{ width: "50%" }}
                facingmode="environment"
              />
            ) : (
              <>
                <button onClick={() => setOpenCamera(!openCamera)}>
                  openCamera
                </button>
              </>
            )}

            <input type="text" value={data?.text} readOnly />
            <h2>Select a Period:</h2>
            <select
              name="name"
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
            >
              <option value="86400">1 Days</option>
              <option value="604800">7 Days</option>
              <option value="2592000">30 Days</option>
            </select>
            <div className="button-container">
              <button className="close-form-button" onClick={handleFormSubmit}>
                Add NFT
              </button>
              <button className="close-form-button" onClick={handleCloseForm}>
                Close
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default PopupForm;
