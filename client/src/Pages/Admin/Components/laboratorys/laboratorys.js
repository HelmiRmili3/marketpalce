import React from "react";
import { useAdmin } from "../../../../Contexts/adminContext";
import Users from "../users/users";
import SignUpFormLaboratory from "./Component/addUser";
export default function Laboratorys() {
  const { laboratorys, fetchLaboratorys } = useAdmin();
  return (
    <>
      <div className="labo-div">
        <div className="user-list">
          <h1>Laboratorys</h1>
          <Users users={laboratorys} role={"laboratory"} />
        </div>
        <SignUpFormLaboratory />
      </div>
    </>
  );
}

