import React from "react";
import { Route, Routes } from "react-router-dom";

import { LaboProvider } from "../Contexts/laboContext";
import { AdminProvider } from "../Contexts/adminContext";
import { PatientProvider } from "../Contexts/patientContext";

import RequireAuth from "./RequireAuth";
import Login from "./logInForm";
import SignUpForm from "./signUpForm";

import Home from "../Pages/Home/Home";

import Admin from "../Pages/Admin/AdminPage";
import Patients from "../Pages/Admin/Components/patients";
import Laboratorys from "../Pages/Admin/Components/laboratorys";
import Admins from "../Pages/Admin/Components/admins";

import Collections from "../Pages/Patient/Components/Nfts/Collections";
import Profile from "../Pages/Patient/Components/Profile/Profile";
import PatientPage from "../Pages/Patient/PateintPage";
import PatientRequests from "../Pages/Patient/Components/Requests/requests";

import Laboratory from "../Pages/Laboratory/LaboratoryPage";
import Purchased from "../Pages/Laboratory/Components/Purchased/purchased";
import Requests from "../Pages/Laboratory/Components/Requests/requests";
import Nfts from "../Pages/Laboratory/Components/Nfts/nfts";
import Card from "../Pages/Laboratory/Components/Profile/profile";

export default function RoutesComponent() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUpForm />}></Route>
        <Route element={<RequireAuth />}>
          <Route
            path="/users/patient/"
            element={
              <PatientProvider>
                <PatientPage />
              </PatientProvider>
            }
          >
            <Route path="profile" element={<Profile />} />
            <Route path="collections" element={<Collections />} />
            <Route path="requests" element={<PatientRequests />} />
          </Route>
          <Route
            path="/users/laboratory/"
            element={
              <LaboProvider>
                <Laboratory />
              </LaboProvider>
            }
          >
            <Route exact path="" element={<Card />} />
            <Route path="profile" element={<Card />} />
            <Route path="nfts" element={<Nfts />} />
            <Route path="purchased" element={<Purchased />} />
            <Route path="requests" element={<Requests />} />
          </Route>
          <Route
            path="/users/admin/"
            element={
              <AdminProvider>
                <Admin />
              </AdminProvider>
            }
          >
            <Route path="profile" element={<div>Profile</div>} />
            <Route path="patients-list" element={<Patients />} />
            <Route path="laboratorys-list" element={<Laboratorys />} />
            <Route path="admins-list" element={<Admins />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
