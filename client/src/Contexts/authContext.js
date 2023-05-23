import React, { createContext, useState, useContext, useEffect } from "react";
import { parseAdmin, parsePatient, parseLaboratory } from "../utils/helper";
import {
  Auth0Contract,
  ComposableContract,
  MedicalDataNFTContract,
} from "../utils/contracts";
import { useWallet } from "./walletContext";
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
  const { address, setaddress, changed, setChanged } = useWallet();
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    register(localStorage.getItem("loggedIn"))
  );
  const setUser = async () => {
    if (address) {
      try {
        const userType = await Auth0Contract.methods
          .getUserType(address)
          .call();
        switch (userType) {
          case "admin":
            Auth0Contract.methods
              .admin()
              .call()
              .then((response) => setCurrentUser(parseAdmin(response)));
            break;
          case "patient":
            Auth0Contract.methods
              .getPatient(address)
              .call()
              .then((response) => {
                setCurrentUser(parsePatient(response));
              });
            break;
          case "laboratory":
            Auth0Contract.methods
              .getLaboratory(address)
              .call()
              .then((response) => {
                setCurrentUser(parseLaboratory(response));
              });
            break;
          default:
            setCurrentUser({});
            break;
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const logOut = () => {
    localStorage.setItem("loggedIn", "false");
    setIsLoggedIn(register(localStorage.getItem("loggedIn")));
  };
  const signUp = async (nom, prenom, email, hashedPassword, sexe, birthday) => {
    try {
      const result = await Auth0Contract.methods
        .createPatient(nom, prenom, email, hashedPassword, sexe, birthday)
        .send({ from: address, gas: 900000 });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUser();
  }, [address]);
  return (
    <AuthContext.Provider
      value={{
        // patients,
        // laboratorys,
        // admins,
        // getUser,
         address,
        // setaddress,
        currentUser,
        // setCurrentUser,
        isLoggedIn,
        setIsLoggedIn,
        signUp,
        //logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
