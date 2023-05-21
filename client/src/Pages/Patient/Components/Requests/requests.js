import React from "react";
import "./requests.css";
import HistoryRequests from "./HistoryRequests/historyRequests";
import RejectedRequests from "./RejectedRequests/rejectedRequests";
import WaitingRequests from "./WaitingRequests/waitingRequests";
import { usePatient } from "../../../../Contexts/patientContext";
const PatientRequests = () => {
  const { requests } = usePatient();
  console.log(requests)
  const list = requests?.slice().reverse();
  const oldRequest = list.filter((request) => {
    if (request.isSeenBySeller) {
      return true;
    }
    return false;
  });

  const waitingRequestsList = list.filter((_request) => {
    if (
      _request.isSeenBySeller == false 
    ) {
      return true;
    }
    return false;
  });
  // const rejectedPayment = list.filter((request) => {
  //   if (
  //     request.isPayedByBuyer == true &&
  //     request.isSeenBySeller == true &&

  //   ) {
  //     return true;
  //   }
  //   return false;
  // });

  return list ? (
    <>
      <WaitingRequests requests={waitingRequestsList} />
      {/* <RejectedRequests requests={rejectedPayment} />
      <HistoryRequests requests={oldRequest} /> */}
    </>
  ) : (
    <></>
  );
};
export default PatientRequests;
