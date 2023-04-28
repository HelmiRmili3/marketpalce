import "../App.css";
 import { useMatch, useResolvedPath, Link } from "react-router-dom";
import { useAuth } from "../Contexts/authContext";
import React, { useState } from 'react';


export default function LaboratoryNavBar() {
  const { logOut, setIsLoggedIn } = useAuth();

  const HandeleLogout = () => {
    logOut();
    setIsLoggedIn(false);
  };
  return (
    <nav className="navbar">
      <div to="#" className="navbar__logo">
        Laboratory
      </div>
      <ul className="navbar__links">
        <CustomLink to="#">All NFTs</CustomLink>
        <CustomLink to="#">My NFTs</CustomLink>
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
