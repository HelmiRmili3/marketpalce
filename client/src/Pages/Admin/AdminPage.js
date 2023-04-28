import React from "react";
import NavBar from "../../Components/NavBar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
export default function Admin() {
  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, []);

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    window.history.pushState(null, null, window.location.pathname);
    window.location.href = document.referrer;
  };
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
