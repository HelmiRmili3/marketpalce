import React from "react";

import { useAdmin } from "../../../../Contexts/adminContext";
import Users from "../users/users";
export default function Patients() {
  const { patients } = useAdmin();
  return (
    <>
      <div className="user-list">
        <h1>Patients</h1>
        <Users users={patients} role={"patient"} />
      </div>
    </>
  );
}
