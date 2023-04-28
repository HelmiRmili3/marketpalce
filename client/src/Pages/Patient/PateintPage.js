import "../../App.css";
import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../Contexts/authContext";
import PatientNavBar from "../../Components/pateintBarNav";
export default function PatientPage() {
  const { currentUser } = useAuth();

  return (
    <>
      <div>
        <PatientNavBar data={currentUser}/>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
