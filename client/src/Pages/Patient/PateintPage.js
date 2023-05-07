import "../../App.css";
import React,{useEffect} from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../Contexts/authContext";
import PatientNavBar from "../../Components/pateintNavBar";
export default function PatientPage() {
  const { currentUser } = useAuth();
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
      <PatientNavBar data={currentUser} />
      <Outlet />
    </>
  );
}
