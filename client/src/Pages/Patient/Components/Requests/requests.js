import React from "react";
import "./requests.css";
import HistoryRequests from "./HistoryRequests/historyRequests";
import RejectedRequests from "./RejectedRequests/rejectedRequests";
import WaitingRequests from "./WaitingRequests/waitingRequests";
import { usePatient } from "../../../../Contexts/patientContext";
const PatientRequests = () => {
  const { requests } = usePatient();
  const list = requests?.slice().reverse();
  const oldRequest = list.filter((request) => {
    if (
      (request.isSeenBySeller && !request.isAcceptedBySeller) ||
      (request.isSeenBySeller &&
        request.isAcceptedBySeller &&
        request.isSeenByBuyer)
    ) {
      return true;
    }
    return false;
  });
  const sendedRequests = list.filter((request) => !request.isSeenBySeller);
  const waitingRequests = list.filter((request) => {
    if (request.isAcceptedBySeller && !request.isPayedByBuyer) {
      return true;
    }
    return false;
  });
  return list ? (
    <>
      <WaitingRequests requests={waitingRequests} />
      <RejectedRequests requests={sendedRequests} />
      <HistoryRequests requests={oldRequest} />
    </>
  ) : (
    <></>
  );
};
export default PatientRequests;
