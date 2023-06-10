import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Auth0Contract,
  ComposableContract,
  MedicalDataNFTContract,
} from "../utils/contracts";
import { parsePatient, parseNFTS, parseRequests } from "../utils/helper";
import { useWallet } from "./walletContext";

const PatientContext = createContext();
export function usePatient() {
  return useContext(PatientContext);
}

export const PatientProvider = ({ children }) => {
  const { address } = useWallet();
  const [patient, setPatient] = useState(null);
  const [nfts, setNfts] = useState(null);
  const [requests, setRequests] = useState([]);
  // get patient
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await Auth0Contract.methods.getPatient(address).call();
        setPatient(parsePatient(response));
      } catch (error) {
        console.log(error);
      }
    };
    if (address) {
      fetchPatient();
    }
  }, [address]);

  // get nfts
  const fetchNfts = async () => {
    try {
      const response = await MedicalDataNFTContract.methods
        .getPatientNftsList()
        .call({ from: address });
      const parsedNfts = parseNFTS(response);
      setNfts(parsedNfts);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   if (address) {
  //     fetchNfts();
  //   }
  // }, [address]);

  // get requests
  const fetchRequests = async () => {
    try {
      const response = await ComposableContract.methods
        .getRequests()
        .call({ from: address });
      const parsedRequests = parseRequests(response);
      setRequests(parsedRequests);
    } catch (error) {
      console.log(error);
    }
  };

  // add nfts
  const createNft = async (_name, _price, _data, _birthday, _sexe) => {
    try {
      // let gasEstimate = await MedicalDataNFTContract.methods.mint.estimateGas(
      //   _name,
      //   _price,
      //   _data,
      //   _birthday,
      //   _sexe,
      //   { from: address }
      // );
      // console.log("gas for mint : ", gasEstimate);
      let result =  await MedicalDataNFTContract.methods
        .mint(_name, _price, _data, _birthday, _sexe)
        .send({ from: address, gas: 900000 });
        console.log(result);
      fetchNfts();
    } catch (error) {
      console.log(error);
    }
  };

  // accept or reject requests
  const acceptAndRejectRequests = async (_id, _accept) => {
    try {
      await ComposableContract.methods
        .rejectAndAcceptRequest(_id, _accept)
        .send({ from: address })
        .then((result) => {
          fetchRequests();
          console.log(result);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (address) {
      fetchNfts();
      fetchRequests();
    }
  }, [address]);
  const value = {
    nfts,
    requests,
    patient,
    createNft,
    acceptAndRejectRequests,
  };
  return (
    <PatientContext.Provider value={value}>{children}</PatientContext.Provider>
  );
};
