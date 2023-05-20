import React from "react";
import "../App.css";

import { useMatch, useResolvedPath, Link } from "react-router-dom";
import { useAuth } from "../Contexts/authContext";
import LogoutIcon from "@mui/icons-material/Logout";
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
        <CustomLink to="/users/laboratory">Profile</CustomLink>
        <CustomLink to="/users/laboratory/nfts">NFTs</CustomLink>
        <CustomLink to="/users/laboratory/purchased">Purchased</CustomLink>
        <CustomLink to="/users/laboratory/requests">Orders</CustomLink>
      </ul>
      <button className="navbar__logout" onClick={HandeleLogout}>
        <LogoutIcon />
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
