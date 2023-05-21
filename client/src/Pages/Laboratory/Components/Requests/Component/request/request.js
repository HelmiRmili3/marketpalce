import React, { useEffect, useState } from "react";
import "./request.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useLabo } from "../../../../../../Contexts/laboContext";
// const Web3 = require("web3");
// const web3 = new Web3();
const Request = ({ request }) => {
  const { acceptPayment, rejectPayment } = useLabo();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const date = new Date(request.date * 1000);
  const formattedDate = date.toLocaleDateString();
  useEffect(() => {
    if (!request.isSeenBySeller) {
      setStatus("Waiting");
    }
    if (request.isSeenBySeller && request.isAcceptedBySeller) {
      setStatus("Accepted");
    }
    if (
      (request.isSeenBySeller && !request.isAcceptedBySeller) ||
      (request.isSeenBySeller &&
        request.isAcceptedBySeller &&
        request.isSeenByBuyer &&
        !request.isPayedByBuyer)
    ) {
      setStatus("Rejected");
    }
    // if (request.isSeenByBuyer && request.isPayedByBuyer) {
    //   setStatus("Payed");
    // }
    if (request.isAcceptedBySeller && !request.isSeenByBuyer) {
      setStatus("Buy");
    }
  }, [request]);

  const handelOpen = () => {
    setOpen(!open);
  };
  return (
    <div>
      <div className="order-item ">
        <div className="order-id">{parseInt(request.id) + 1}</div>
        <div className="order-address">{request.seller}</div>
        <div className="order-date">{""}</div>
        {status == "Buy" ? (
          <Purchase
            request={request}
            acceptPayment={acceptPayment}
            rejectPayment={rejectPayment}
          />
        ) : status == "Waiting" ? (
          <div className="order-status-Waiting">{status}</div>
        ) : status == "Accepted" ? (
          <div className="order-status-Accepted">Accepted</div>
        ) : status == "Rejected" ? (
          <div className="order-status-Rejected">Rejected</div>
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

const Purchase = ({ request, acceptPayment, rejectPayment }) => {
  return (
    <>
      <button
        className="buy-button"
        onClick={() => acceptPayment(request.id, request.price)}
      >
        Purchase
      </button>
      <button
        className="reject-button"
        onClick={() => rejectPayment(request.id)}
      >
        Reject
      </button>
    </>
  );
};
