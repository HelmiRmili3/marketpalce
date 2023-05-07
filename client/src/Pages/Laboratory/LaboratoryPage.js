import "../../App.css";

import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import LaboratoryNavBar from "../../Components/LaboratoryNavBar";
export default function Laboratory () {
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
      <LaboratoryNavBar />
      <Outlet />
    </>
  );
};
