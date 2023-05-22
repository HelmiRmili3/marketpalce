import React, { useState } from "react";
import "../App.css";
import { SHA256 } from "crypto-js";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/authContext";
import { useWallet } from "../Contexts/walletContext";

function Login(props) {
  const [password, setPassword] = useState("");
  const { currentUser, isLoggedIn, setIsLoggedIn } = useAuth();
  const { address } = useWallet();
  const navigate = useNavigate();

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  // function hashPassword(password) {
  //   const salt = bcrypt.genSaltSync(10);
  //   const hash = bcrypt.hashSync(password, salt);
  //   return hash;
  // }

  const handleLogin = async () => {
    const hashedPassword = SHA256(password).toString();
    if (currentUser.password == hashedPassword) {
      setIsLoggedIn(true);
      const profileUrl = `/users/${currentUser.role}/profile`;
      navigate(profileUrl);
      localStorage.setItem("loggedIn", "true");
    } else {
      console.log("No users found");
    }
    setPassword("");
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
      <form>
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
          <button onClick={handleLogin}>Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
