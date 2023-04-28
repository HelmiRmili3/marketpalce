import React from "react";
import { Route, Routes } from "react-router-dom";

 import RequireAuth from "./RequireAuth";
 import Home from "../Pages/Home/Home";
 import PatientPage from "../Pages/Patient/PateintPage";
 import Laboratory from "../Pages/Laboratory/LaboratoryPage";
 import Admin from "../Pages/Admin/AdminPage";
 import Login from "./logInForm";
 import SignUpForm from "./signUpForm";
 import Profile from "../Pages/Patient/Components/Profile";

 import Patients from "../Pages/Admin/Components/patients";
 import Laboratorys from "../Pages/Admin/Components/laboratorys";
 import Admins from "../Pages/Admin/Components/admins";
 import Collections from "../Pages/Patient/Components/Collections";
export default function RoutesComponent() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUpForm/>}></Route>
        <Route element={<RequireAuth />}>
          <Route path="/users/patient/" element={<PatientPage />}>
            <Route path="profile" element={<Profile />} />
            <Route path="collections" element={<Collections/>} />
            <Route path="settings" element={<div>Settings</div>} />
            <Route path="create" element={<div>create nft</div>} />
          </Route>
          <Route path="/users/laboratory/" element={<Laboratory />}>
          </Route>
          <Route path="/users/admin/" element={<Admin />}>
            <Route path="patients-list" element={<Patients />} />
            <Route path="laboratorys-list" element={<Laboratorys/>} />
            <Route path="admins-list" element={<Admins/>} />

          </Route>
        </Route>
      </Routes>
    </>
  );
}
