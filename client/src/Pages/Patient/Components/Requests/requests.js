import React from "react";
import HistoryRequests from "./HistoryRequests/historyRequests";
import RejectedRequests from "./RejectedRequests/rejectedRequests";
import WaitingRequests from "./WaitingRequests/waitingRequests";
import Empty from "./EmptyPage/empty";
import { usePatient } from "../../../../Contexts/patientContext";
const PatientRequests = () => {
  const { requests } = usePatient();
  const list = requests?.slice().reverse();
  const oldRequest = list.filter((request) => {
    if (request.isSeenBySeller) {
      return true;
    }
    return false;
  });

  const waitingRequestsList = list.filter((request) => {
    if (!request.isSeenBySeller) {
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
      <HistoryRequests requests={oldRequest} />
      {/* <RejectedRequests requests={rejectedPayment} />
       */}
    </>
  ) : (
    <Empty />
  );
};
export default PatientRequests;
