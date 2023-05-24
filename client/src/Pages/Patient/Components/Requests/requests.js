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

  const oprovealRequest = list.filter((request) => {
    if (!request.isSeenBySeller) {
      return true;
    }
    return false;
  });
  const waitingRequests = list.filter((request) => {
    if (
      request.isSeenBySeller &&
      request.isAcceptedBySeller &&
      !request.isPayedByBuyer &&
      !request.isSeenByBuyer
    ) {
      return true;
    }
    return false;
  });

  return list ? (
    <>
      <WaitingRequests requests={oprovealRequest} />
      <RejectedRequests requests={waitingRequests} />
      <HistoryRequests requests={oldRequest} />
    </>
  ) : (
    <Empty />
  );
};
export default PatientRequests;
