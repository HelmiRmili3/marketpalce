import React, { createContext, useContext, useState } from "react";
import { Auth0, Composable, MedicalDataNFT } from "../utils/contracts";

const AdminContext = createContext();
export function useAdmin() {
  return useContext(AdminContext);
}

export const AdminProvider = ({ children }) => {
  //get patients

  //get laboratorys

  //enable user

  //disable user

  return <AdminContext.Provider value={{}}>{children}</AdminContext.Provider>;
};
