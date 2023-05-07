import React, { createContext, useState, useContext, useEffect } from "react";

import Web3 from "web3";
import { useWallet } from "./walletContext";
const web3 = new Web3("http://localhost:7545");
const contractAbi = require("../auth1.json");
const contractAddress = "0x7d48dD8D37ef62cbda4A01Ac2F3dcE61f134274F";
const contract = new web3.eth.Contract(contractAbi.abi, contractAddress);

const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const register = (state) => {
    if (state === "true") {
      return true;
    }
    if (state === "false") {
      return false;
    }
  };
  const log = register(localStorage.getItem("loggedIn"));
  //all varaibles and set varaiables are here
  const { address, setaddress, changed, setChanged } = useWallet();
  const [currentUser, setCurrentUser] = useState(null);
  const [patients, setPatients] = useState([]);
  const [laboratorys, setLaboratorys] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(log);
  // function to logout the user from the app wen he chnage the wallet
  const user = async () => {
    if (changed) {
      logOut();
      setChanged(false);
    }
    if (address != null) {
      try {
        await contract.methods
          .getUser(address)
          .call()
          .then((user) => {
            if (user.password !== "") {
              setCurrentUser(user);
            }
          });
      } catch (error) {}
    }
  };
  useEffect(() => {
    getAdmins();
    getPatients();
    getLaboratorys();
    user();
  }, [address]);

  // Implement authentication functions

  const signUp = async (nom, prenom, email, passwordOne, address, role) => {
    try {
      const result = await contract.methods
        .createUser(nom, prenom, email, passwordOne, address, role)
        .send({ from: address, gas: 209664 });
      console.log("result", result);
    } catch (error) {
      console.log(error);
    }
  };

  const logIn = (password) => {
    if (currentUser != null) {
      if (password === currentUser.password) {
        localStorage.setItem("loggedIn", "true");
        setIsLoggedIn(register(localStorage.getItem("loggedIn")));
        console.log("user logged in successfuly");
      } else {
        console.log("password does not mutch !");
      }
    } else {
      console.log("user not found");
    }
  };

  const logOut = () => {
    localStorage.setItem("loggedIn", "false");
    setIsLoggedIn(register(localStorage.getItem("loggedIn")));
  };

  const getPatients = async () => {
    try {
      const res = await contract.methods.getUsersFor("0").call();
      setPatients(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getLaboratorys = async () => {
    try {
      const res = await contract.methods.getUsersFor("1").call();
      setLaboratorys(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getAdmins = async () => {
    try {
      const res = await contract.methods.getUsersFor("2").call();
      setAdmins(res);
    } catch (error) {
      console.log(error);
    }
  };
  const userDelete = async (add) => {
    try {
      const res = await contract.methods
        .deleteUser(add)
        .send({ from: address, gas: 209664 });
      console.log("res", res);
    } catch (error) {
      console.log(error);
    }
  };

  //console.log("current user :", currentUser);
  return (
    <AuthContext.Provider
      value={{
        userDelete,
        patients,
        laboratorys,
        admins,
        address,
        setaddress,
        currentUser,
        setCurrentUser,
        isLoggedIn,
        setIsLoggedIn,
        signUp,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
