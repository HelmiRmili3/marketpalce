import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { usePatient } from "../../../../../Contexts/patientContext";
const Web3 = require("web3");
const web3 = new Web3();
const Request = ({ request }) => {
  const { acceptAndRejectRequests } = usePatient();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (
      !request.isSeenBySeller &&
      !request.isAcceptedBySeller &&
      !request.isPayedByBuyer &&
      !request.isSeenByBuyer
    ) {
      setStatus("Buy");
    }
    if (
      request.isSeenBySeller &&
      !request.isAcceptedBySeller &&
      !request.isPayedByBuyer &&
      !request.isSeenByBuyer
    ) {
      setStatus("Rejected");
    }
    if (
      request.isSeenBySeller &&
      request.isAcceptedBySeller &&
      !request.isPayedByBuyer &&
      !request.isSeenByBuyer
    ) {
      setStatus("Waiting to pay");
    }
    if (
      request.isSeenBySeller &&
      request.isAcceptedBySeller &&
      request.isPayedByBuyer &&
      !request.isSeenByBuyer
    ) {
      setStatus("Rejected payment");
    }
    if (
      request.isSeenBySeller &&
      request.isAcceptedBySeller &&
      request.isPayedByBuyer &&
      request.isSeenByBuyer
    ) {
      setStatus("Accepted payment");
    }
  });
  const currentTimestamp = Math.floor(Date.now() / 1000);
  //console.log(parseInt(currentTimestamp));
  const date = new Date((currentTimestamp + parseInt(request.period)) * 1000);
  const handelOpen = () => {
    setOpen(!open);
  };
  return (
    <div>
      <div className="order-item">
        <div className="order-id">{parseInt(request.id) + 1}</div>
        <div className="order-address">{request.seller}</div>
        {/* <div className="order-date">{formattedDate}</div> */}
        {status === "Buy" ? (
          <Purchase
            request={request}
            acceptAndRejectRequests={acceptAndRejectRequests}
          />
        ) : (
          <>
            <div>{status}</div>
          </>
        )}
        <div className="seeMore" onClick={handelOpen}>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>
      </div>
      {open && (
        <div className="see-more">
          Form :{request.buyer} <br />
          To :{request.seller} <br /> Date :{date.toUTCString()} <br />
          NFT :{request.ids.join(",")}
          <br />
        </div>
      )}
    </div>
  );
};
export default Request;

const Purchase = ({ request, acceptAndRejectRequests }) => {
  return (
    <>
      <button
        className="buy-button"
        onClick={() => acceptAndRejectRequests(request.id, true)}
      >
        Accept
      </button>
      <button
        className="reject-button"
        onClick={() => acceptAndRejectRequests(request.id, false)}
      >
        Reject
      </button>
    </>
  );
};
