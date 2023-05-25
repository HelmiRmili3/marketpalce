import React, { useEffect, useState } from "react";
import "./user.css";
import { useAdmin } from "../../../../Contexts/adminContext";
const User = ({ user, role }) => {
  const {
    fetchStatePatients,
    disablePatient,
    enablePatient,
    fetchStateLab,
    disableLab,
    enableLab,
  } = useAdmin();
  const [userState, setUserstate] = useState(false);
  const handleEnableDisable = async () => {
    if (role === "laboratory") {
      if (userState) {
        await disableLab(user.wallet);
        fetchStateLab(user.wallet).then(
          (result) => setUserstate(result)
          // Update the state with the resolved value
        );
      } else {
        await enableLab(user.wallet);
        fetchStateLab(user.wallet).then(
          (result) => setUserstate(result)
          // Update the state with the resolved value
        );
      }
    }
    if (role === "patient") {
      if (userState) {
        await disablePatient(user.wallet);
        fetchStatePatients(user.wallet).then(
          (result) => setUserstate(result) // Update the state with the resolved value
        );
      } else {
        await enablePatient(user.wallet);
        fetchStatePatients(user.wallet).then(
          (result) => setUserstate(result) // Update the state with the resolved value
        );
      }
    }
  };
  useEffect(() => {
    if (role === "patient") {
      fetchStatePatients(user.wallet).then((result) => setUserstate(result));
    }
    if (role === "laboratory") {
      fetchStateLab(user.wallet).then((result) => setUserstate(result));
    }
  });
  return (
    <>
      <div className="user">
        <div className="property">Nom:</div>
        <div className="value">{user.nom}</div>
      </div>
      <div className="user">
        <div className="property">Prenom:</div>
        <div className="value">{user.prenom}</div>
      </div>
      <div className="user">
        <div className="property">Email:</div>
        <div className="value">{user.email}</div>
      </div>
      <div className="user">
        <div className="property">Address:</div>
        <div className="value">{user.wallet}</div>
      </div>
      <div className="user">
        <div className="property">Status:</div>
        <div className="value">
          {!userState ? (
            <div className="online"></div>
          ) : (
            <div className="offline"></div>
          )}
        </div>
      </div>
      <div className="user">
        <button className="state-button" onClick={handleEnableDisable}>
          {userState ? "Enable" : "Disable"}
        </button>
      </div>
    </>
  );
};
export default User;
