import React from "react";
import User from "../user/user";
const Users = ({ users, role }) => {
  return (
    <>
      <ul>
        {users?.map((user, index) => (
          <li key={index}>
            <User key={index} user={user} role={role} />
          </li>
        ))}
      </ul>
    </>
  );
};
export default Users;
