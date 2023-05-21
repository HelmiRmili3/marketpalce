import React, { useEffect, useState } from "react";
import "./requests.css";
import { useLabo } from "../../../../Contexts/laboContext";
import History from "./Component/HistoryRequests/History";
import Waiting from "./Component/WaitingRequests/Waiting";
import Sended from "./Component/SendedRequests/Sended";
const Requests = () => {
  let { requests } = useLabo();
  let list = requests.slice().reverse();
  const [oldRequest, setOldRequest] = useState([]);
  const [sendedRequests, setSendedRequests] = useState([]);
  const [waitingRequests, setWaitingRequests] = useState([]);
  useEffect(() => {
    //if the request seen by the buyer and not accepted => to history
    //if the request seen by the buyer and seller and they both accept => to history
    //if the request seen by the seller and exapted and the seen buyer and refuse => to history
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
    setOldRequest(oldRequest);
    //if the buyer send the request and the seller have not seen it
    const sendedRequests = list.filter((request) => !request.isSeenBySeller);
    setSendedRequests(sendedRequests);
    //if the seller see the request and accepted and the byer did not see it
    const waitingRequests = list.filter((request) => {
      if (request.isAcceptedBySeller && !request.isSeenByBuyer) {
        return true;
      }
      return false;
    });
    setWaitingRequests(waitingRequests);
  }, [requests]);

  return list ? (
    <>
      <Waiting requests={waitingRequests} />
      <Sended requests={sendedRequests} />
      <History requests={oldRequest} />
    </>
  ) : (
    <></>
  );
};
export default Requests;
