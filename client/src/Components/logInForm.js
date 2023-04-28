import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"
import { useAuth } from "../Contexts/authContext";
import { useWallet } from "../Contexts/walletContext";

function Login(props) {
  const [password, setPassword] = useState("");
  const { logIn, currentUser } = useAuth();
  const { address } = useWallet();
  const navigate = useNavigate();

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    logIn(password);
    setPassword("");
    if (currentUser !== null) {
      if (currentUser.userState === "0") {
        navigate("/users/patient/profile");
      } else {
        if (currentUser.userState === "1") {
          navigate("/users/laboratory/");
        } else {
          if (currentUser.userState === "2") {
            navigate("/users/admin/patients-list");
          }
        }
      }
    } else {
      console.log("no users found");
    }
  };
  function limitString(str, maxLength) {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + "...";
    } else {
      return str;
    }
  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Login</h1>
        </div>
        <div>{props.errors}</div>
        <div className="address-div">
          {address.length > 0 ? limitString(address, 18) : "Connect Wallet"}
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePassword}
          ></input>
        </div>
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
