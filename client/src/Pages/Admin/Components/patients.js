import React from "react";
//import CircularProgress from "@material-ui/core/CircularProgress";

import { useAuth } from "../../../Contexts/authContext";
import ListOfUsers from "../../../Components/ListOfUsers";
export default function Patients() {
  const { patients } = useAuth();
  return (
    <>
      <div className="user-list">
        <h1>List of Patients</h1>
        <ListOfUsers data={patients} />
      </div>
    </>
  );
}
