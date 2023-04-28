import "../../App.css";
import React from "react";
import { useEffect, useState } from "react";
import Web3 from "web3";

export default function SignUpPage() {
  const web3 = new Web3("http://localhost:7545");
  // Load the ABI of MyContract

  const contractAbi = require("../auth1.json");
  const contractAddress = "0x71261f43690fB51A11e877aB3EB386C9cd33AfB5";
  const users = new web3.eth.Contract(contractAbi.abi, contractAddress);

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [wallet, setWallet] = useState("");
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTow, setPasswordTow] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      // Create a Web3 instance using the injected provider from MetaMask
      const web3 = new Web3(window.ethereum);
      // Request account access from the user
      window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then(() => {
          // Get the list of accounts from MetaMask
          web3.eth
            .getAccounts()
            .then((accounts) => {
              // Set the wallet address of the first account in the list
              setWallet(accounts[0]);
            })
            .catch(console.error);
        })
        .catch(console.error);
    } else {
      console.error("MetaMask not detected");
    }
  });

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
  const handleSubmit = async (event) => {
    event.preventDefault();
    await createUser();
  };
  const createUser = async () => {
    if (passwordOne === passwordTow) {
      try {
        await users.methods
          .createUser(nom, prenom, email, passwordOne, wallet, 0)
          .send({ from: wallet, gas: 209664 });
        //console.log("result", result);
        setIsCreated(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("password dose not mutch");
    }
  };
  return isCreated ? (
    <>
      <h1>welcom {nom}, your account has been created</h1>
    </>
  ) : (
    <>
      <div className="container">
        <form>
          <div>
            <h1>Add account</h1>
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
              type="text"
              id="prenom"
              placeholder="Prenom"
              value={prenom}
              onChange={handlePrenomChange}
            ></input>
          </div>
          <div className="address_div">
            {wallet.length > 0
              ? wallet.slice(0, 19) + (wallet.length > 19 ? "..." : "")
              : "Connect Wallet"}
          </div>
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
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
