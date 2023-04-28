import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { useMatch, useResolvedPath } from "react-router-dom";

import { useAuth } from "../Contexts/authContext";
//import { useNavigate } from "react-router-dom";
export default function NavBar() {
  const { logOut, setIsLoggedIn } = useAuth();
  //   const navigate = useNavigate();
  const HandeleLogout = () => {
    logOut();
    setIsLoggedIn(false);
  };
  return (
    <nav className="navbar">
      <div to="#" className="navbar__logo">
        Admin
      </div>
      <ul className="navbar__links">
        <CustomLink to="/users/admin/patients-list">Patients</CustomLink>
        <CustomLink to="/users/admin/laboratorys-list">Laboratorys</CustomLink>
        <CustomLink to="/users/admin/admins-list">Admins</CustomLink>
      </ul>
      <button className="navbar__logout" onClick={HandeleLogout}>
        Logout
      </button>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
