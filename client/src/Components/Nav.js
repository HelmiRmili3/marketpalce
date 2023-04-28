import React,{ useState } from "react";
import "../App.css";

import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/authContext";

export default function Nav() {
  const { isLoggedIn } = useAuth();
  const [isActive, setisActive] = useState(true);

  const Bottons = () => {
    function ToggoleLogin() {
      setisActive(true);
    }
    function ToggoleSignup() {
      setisActive(false);
    }
    return (
      <>
        <div>
          <button
            className={
              isActive
                ? "is-active switch-button login-left "
                : "switch-button login-left"
            }
            onClick={ToggoleLogin}
          >
            <Link to="/Login"> Login </Link>
          </button>
          <button
            className={
              !isActive
                ? "is-active switch-button signup-right"
                : "switch-button signup-right"
            }
            onClick={ToggoleSignup}
          >
            <Link to="/signup"> Signup </Link>
          </button>
        </div>
      </>
    );
  };
  return !isLoggedIn ? (
    <nav>
      <div className="logo">Marketplace</div>
      <Bottons/>
    </nav>
  ) : (
    <></>
  );
}
