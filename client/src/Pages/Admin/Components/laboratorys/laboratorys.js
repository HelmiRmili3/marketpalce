import React, { useState } from "react";
//import { useAuth } from "../../../../Contexts/authContext";
import { SHA256 } from "crypto-js";
import { useAdmin } from "../../../../Contexts/adminContext";
import Users from "../users/users";

export default function Laboratorys() {
  const { laboratorys, fetchLaboratorys } = useAdmin();
  //console.log(laboratorys);
  return (
    <>
      <div className="labo-div">
        <div className="user-list">
          <h1>List of Laboratorys</h1>
          <Users users={laboratorys} role={"laboratory"} />
        </div>
        <SignUpFormLaboratory />
      </div>
    </>
  );
}

const SignUpFormLaboratory = () => {
  const { addlabo } = useAdmin();
  const [nom, setNom] = useState("");
  const [license, setLicense] = useState("");
  const [discription, setDiscription] = useState("");
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTow, setPasswordTow] = useState("");
  const [address, setAddress] = useState("");

  const handleNomChange = (event) => {
    setNom(event.target.value);
  };
  const handleLicenseChange = (event) => {
    setLicense(event.target.value);
  };
  const handleDiscriptionChange = (event) => {
    setDiscription(event.target.value);
  };
  const handlePasswordOneChange = (event) => {
    setPasswordOne(event.target.value);
  };
  const handlePasswordTowChange = (event) => {
    setPasswordTow(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleSubmit = async () => {
    const hash = SHA256(passwordOne).toString();
    if (passwordOne === passwordTow) {
      try {
        await addlabo(nom, email, hash, address, license, discription);
        console.log("labo account added");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("passwords does not match");
    }
  };
  return (
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
          <div className="form-group">
            <input
              type="text"
              id="prenom"
              placeholder="License"
              value={license}
              onChange={handleLicenseChange}
            ></input>
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
  );
};
