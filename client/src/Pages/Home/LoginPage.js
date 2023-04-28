import "../../App.css";
import React from "react";
import Login from "../../Components/logInForm";
import PatientPage from "../Patient/PateintPage";
import Laboratory from "../Laboratory/LaboratoryPage";
import Admin from "../Admin/AdminPage";
import { useAuth } from "../Contexts/authContext";
import { useWallet } from "../Contexts/walletContext";
export default function LoginPage() {
  const { currentUser, isLoggedIn, logIn, logOut } = useAuth();
  const { errors } = useWallet();
  return isLoggedIn ? (
    currentUser[5] === "0" ? (
      <PatientPage
        data={currentUser}
        onClick={() => {
          logOut();
        }}
      />
    ) : currentUser[5] === "1" ? (
      <Laboratory></Laboratory>
    ) : currentUser[5] === "2" ? (
      <Admin></Admin>
    ) : (
      <></>
    )
  ) : (
    <>
      <Login
        onSubmit={(e) => {
          logIn(e);
        }}
        errors={errors}
      />
    </>
  );
  
}
