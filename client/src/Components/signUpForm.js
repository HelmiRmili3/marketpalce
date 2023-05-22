import "../App.css";
import React from "react";
import { SHA256 } from "crypto-js";

import { useState } from "react";
import { useWallet } from "../Contexts/walletContext";
import { useAuth } from "../Contexts/authContext";
import { useNavigate } from "react-router-dom";
//const bcrypt = require('bcrypt');

const SignUpForm = () => {
  const { address } = useWallet();
  const { signUp } = useAuth();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTow, setPasswordTow] = useState("");
  const [sexe, setSexe] = useState("male");
  const [birthday, setBirthday] = useState(915197998);
  const navigate = useNavigate();

  const handleNomChange = (event) => {
    setNom(event.target.value);
  };
  const handlePrenomChange = (event) => {
    setPrenom(event.target.value);
  };
  const handlePasswordOneChange = (event) => {
    setPasswordOne(event.target.value);
  };
  const handlePasswordTowChange = (event) => {
    setPasswordTow(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  function limitString(str, maxLength) {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + "...";
    } else {
      return str;
    }
  }

  const handleSubmit = async () => {
    if (passwordOne === passwordTow) {
      const hashedPassword = SHA256(passwordOne).toString();
      console.log(hashedPassword);
      try {
        signUp(nom, prenom, email, hashedPassword, sexe, birthday);
        navigate("/login");
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
          <div className="sign-up-row">
            <div className="form-group-row">
              <input
                type="text"
                id="nom"
                placeholder="Nom"
                value={nom}
                onChange={handleNomChange}
              ></input>
            </div>
            <div className="form-group-row">
              <input
                type="text"
                id="prenom"
                placeholder="Prenom"
                value={prenom}
                onChange={handlePrenomChange}
              ></input>
            </div>
          </div>

          <div className="address-div">{limitString(address, 18)}</div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              value={email}
              onChange={handleEmail}
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

export default SignUpForm;
