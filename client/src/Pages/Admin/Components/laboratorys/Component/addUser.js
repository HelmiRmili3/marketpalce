import React, { useState } from "react";
import { SHA256 } from "crypto-js";
import { UploadFileToPinata } from "../../../../../api/pinata";
import { useAdmin } from "../../../../../Contexts/adminContext";
import CircularProgress from "@mui/material/CircularProgress";
import "./addUser.css";
const SignUpFormLaboratory = () => {
  const { addlabo } = useAdmin();
  const [isUploading, setIsUploading] = useState(false);
  const [nom, setNom] = useState("");
  const [file, setFile] = useState("");
  const [discription, setDiscription] = useState("");
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTow, setPasswordTow] = useState("");
  const [address, setAddress] = useState("");

  const handleNomChange = (event) => {
    event.preventDefault();
    setNom(event.target.value);
  };
  const handleDiscriptionChange = (event) => {
    event.preventDefault();
    setDiscription(event.target.value);
  };
  const handlePasswordOneChange = (event) => {
    event.preventDefault();
    setPasswordOne(event.target.value);
  };
  const handlePasswordTowChange = (event) => {
    event.preventDefault();
    setPasswordTow(event.target.value);
  };
  const handleEmailChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };
  const handleAddressChange = (event) => {
    event.preventDefault();
    setAddress(event.target.value);
  };
  const resetFileds = () => {
    setAddress("");
    setDiscription("");
    setEmail("");
    setPasswordOne("");
    setPasswordTow("");
    setFile("");
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsUploading(true);
    const hash = SHA256(passwordOne).toString();
    if (passwordOne === passwordTow) {
      try {
        const license = await UploadFileToPinata(file);
        if (license) {
          try {
            await addlabo(nom, email, hash, address, license, discription).then(
              () => {
                setIsUploading(false);
                console.log(license);
                console.log("labo account added");
              }
            );
          } catch (error) {
            setIsUploading(false);
            console.log(error);
          }
        }
      } catch (error) {
        setIsUploading(false);
        console.log(error);
      }
    } else {
      setIsUploading(false);
      console.log("passwords does not match");
    }
    resetFileds();
  };

  return !isUploading ? (
    <>
      <div className="container">
        <form>
          <div>
            <h1>Signup</h1>
          </div>
          <div className="form-group">
            <input
              type="text"
              id="nom"
              placeholder="Nom"
              value={nom}
              onChange={handleNomChange}
            ></input>
          </div>

          <div className="form-group">
            <input
              type="address"
              id="address"
              placeholder="Enter your Address"
              value={address}
              onChange={handleAddressChange}
            ></input>
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              value={email}
              onChange={handleEmailChange}
            ></input>
          </div>
          <div>
            <input type="file" onChange={handleFileChange} />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="prenom"
              placeholder="discription"
              value={discription}
              onChange={handleDiscriptionChange}
            ></input>
          </div>
          <div className="form-group">
            <input
              type="password"
              id="passwordOne"
              placeholder="Enter your password"
              value={passwordOne}
              onChange={handlePasswordOneChange}
            ></input>
          </div>
          <div className="form-group">
            <input
              type="password"
              id="passwordTow"
              placeholder="Confirme your password"
              value={passwordTow}
              onChange={handlePasswordTowChange}
            ></input>
          </div>
          <div className="form-group">
            <button type="submit" onClick={handleSubmit}>
              Signup
            </button>
          </div>
        </form>
      </div>
    </>
  ) : (
    <>
      <div className="loading">
        <CircularProgress />
      </div>
    </>
  );
};
export default SignUpFormLaboratory;
