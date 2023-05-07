import React from "react";
import { Route, Routes } from "react-router-dom";
import { LaboProvider } from "../Contexts/laboContext";

import RequireAuth from "./RequireAuth";
import Login from "./logInForm";
import SignUpForm from "./signUpForm";

import Home from "../Pages/Home/Home";

import Admin from "../Pages/Admin/AdminPage";
import Patients from "../Pages/Admin/Components/patients";
import Laboratorys from "../Pages/Admin/Components/laboratorys";
import Admins from "../Pages/Admin/Components/admins";

import Collections from "../Pages/Patient/Components/Collections";
import Profile from "../Pages/Patient/Components/Profile";
import PatientPage from "../Pages/Patient/PateintPage";

import Laboratory from "../Pages/Laboratory/LaboratoryPage";
import Purchased from "../Pages/Laboratory/Components/purchased";
import Requests from "../Pages/Laboratory/Components/requests";
import Nfts from "../Pages/Laboratory/Components/nfts";
import Card from "../Pages/Laboratory/Components/profile";
export default function RoutesComponent() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUpForm />}></Route>
        <Route element={<RequireAuth />}>
          <Route path="/users/patient/" element={<PatientPage />}>
            <Route path="profile" element={<Profile />} />
            <Route path="collections" element={<Collections />} />
            <Route path="settings" element={<div>Settings</div>} />
          </Route>
          <Route
            path="/users/laboratory/"
            element={
              <LaboProvider>
                <Laboratory />
              </LaboProvider>
            }
          >
            <Route exact path="" element={<Card/>} />
            <Route path="profile" element={<Card/>} />
            <Route path="nfts" element={<Nfts />} />
            <Route path="purchased" element={<Purchased />} />
            <Route path="requests" element={<Requests />} />
          </Route>
          <Route path="/users/admin/" element={<Admin />}>
            <Route path="patients-list" element={<Patients />} />
            <Route path="laboratorys-list" element={<Laboratorys />} />
            <Route path="admins-list" element={<Admins />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
