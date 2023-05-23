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
      !request.isPayedByBuyer &&
      !request.isAcceptedBySeller &&
      !request.isSeenByBuyer
    ) {
      setStatus("Buy");
    }
  });

  const date = new Date(request.date * 1000);
  const formattedDate = date.toLocaleDateString();
  const handelOpen = () => {
    setOpen(!open);
  };
  return (
    <div>
      <div className="order-item">
        <div className="order-id">{parseInt(request.id) + 1}</div>
        <div className="order-address">{request.seller}</div>
        <div className="order-date">{""}</div>
        {status === "Buy" ? (
          <Purchase
            request={request}
            acceptAndRejectRequests={acceptAndRejectRequests}
          />
        ) : (
          <></>
        )}
        <div className="seeMore" onClick={handelOpen}>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>
      </div>
      {open && (
        <div className="see-more">
          Form :{request.buyer} <br />
          To :{request.seller} <br /> Date :{formattedDate} <br />
          NFT :{request.ids}
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
        Accepted
      </button>
      <button
        className="reject-button"
        onClick={() => acceptAndRejectRequests(request.id, false)}
      >
        Rejected
      </button>
    </>
  );
};
