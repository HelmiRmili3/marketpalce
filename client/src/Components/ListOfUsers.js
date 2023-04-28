import React from "react";
export default function ListOfUsers(props) {
  return (
    <>
      <ul>
        {props.data.map((user) => (
          <li key={user.userAddress}>
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
              <div className="value">{user.userAddress}</div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
