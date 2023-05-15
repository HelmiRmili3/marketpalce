import "../../App.css";

import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import LaboratoryNavBar from "../../Components/LaboratoryNavBar";

import { useLabo } from "../../Contexts/laboContext";
import { useWallet } from "../../Contexts/walletContext";
export default function Laboratory() {
  const { address } = useWallet();
  //const { getUser, getAllNfts, getUserNfts, collections } = useLabo();
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
  //collections(address);
  return (
    <>
      <LaboratoryNavBar />
      <Outlet />
    </>
  );
}
