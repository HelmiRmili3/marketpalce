import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Auth0Contract,
  ComposableContract,
  MedicalDataNFTContract,
} from "../utils/contracts";
import { parseLaboratorys, parsePatients } from "../utils/helper";
import { useAuth } from "./authContext";
const AdminContext = createContext();
export function useAdmin() {
  return useContext(AdminContext);
}

export const AdminProvider = ({ children }) => {
  const { address } = useAuth();
  const [patients, setPatients] = useState();
  const [laboratorys, setLaboratorys] = useState();
  //add laboratory
  const addlabo = async (
    _name,
    _email,
    _hash,
    _wallet,
    _license,
    _discription
  ) => {
    if (address) {
      try {
        // let gasEstimate =
        //   await Auth0Contract.methods.createLaboratory.estimateGas(
        //     _name,
        //     _email,
        //     _hash,
        //     _wallet,
        //     _license,
        //     _discription,
        //     { from: address }
        //   );
        // console.log("gas for createLaboratory : ", gasEstimate);
        let result  = await Auth0Contract.methods
          .createLaboratory(
            _name,
            _email,
            _hash,
            _wallet,
            _license,
            _discription
          )
          .send({ from: address, gas: 900000 });
          console.log(result);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("address not found");
    }
  };
  //lab state
  const fetchStateLab = async (_address) =>
    await ComposableContract.methods.labs(_address).call({ from: address });

  const fetchStatePatients = async (_address) =>
    await MedicalDataNFTContract.methods.patients(_address).call();

  //get patients
  const fetchPatients = async () => {
    if (address) {
      try {
        const result = await Auth0Contract.methods
          .getPatients()
          .call({ from: address });
        setPatients(parsePatients(result));
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("...");
    }
  };
  //get laboratorys
  const fetchLaboratorys = async () => {
    if (address) {
      try {
        const result = await Auth0Contract.methods
          .getLaboratorys()
          .call({ from: address });
        setLaboratorys(parseLaboratorys(result));
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("...");
    }
  };
  //enable/disable lab
  const disableLab = async (_address) => {
    if (_address || address) {
      try {
        const result = await ComposableContract.methods
          .toggleFalse(_address)
          .send({ from: address, gas: 900000 });
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("lab address is null");
    }
  };
  const enableLab = async (_address) => {
    if (_address || address) {
      try {
        const result = await ComposableContract.methods
          .toggleTrue(_address)
          .send({ from: address, gas: 900000 });
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("lab address is null");
    }
  };
  //enable/disable pateints
  const disablePatient = async (_address) => {
    if (_address || address) {
      try {
        const result = await MedicalDataNFTContract.methods
          .toggleFalse(_address)
          .send({ from: address });
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Patient address is null");
    }
  };
  const enablePatient = async (_address) => {
    if (_address || address) {
      try {
        const result = await MedicalDataNFTContract.methods
          .toggleTrue(_address)
          .send({ from: address });
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Patient address is null");
    }
  };
  useEffect(() => {
    if (address) {
      fetchLaboratorys();
      fetchPatients();
    }
  }, [address]);
  return (
    <AdminContext.Provider
      value={{
        patients,
        laboratorys,
        fetchStatePatients,
        fetchStateLab,
        fetchLaboratorys,
        fetchPatients,
        setLaboratorys,
        setPatients,
        disablePatient,
        enablePatient,
        disableLab,
        enableLab,
        addlabo,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
