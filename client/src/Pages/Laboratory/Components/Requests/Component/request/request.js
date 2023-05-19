import React, { useState } from "react";
import "./request.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const Web3 = require("web3");
const web3 = new Web3();
const Request = ({ request, index }) => {
  const [open, setOpen] = useState(false);
  const date = new Date(request.date * 1000);
  const formattedDate = date.toLocaleDateString();
  const handelOpen = () => {
    setOpen(!open);
  };
  return (
    <div>
      <div className="order-item" key={index}>
        <div className="order-id">{parseInt(request.id) + 1}</div>
        <div className="order-address">{request.seller}</div>
        <div className="order-date">{""}</div>
        <div
          className={`order-status ${
            request.isSeenBySeller
              ? request.isSeenBySeller
                ? "Rejected"
                : "Accepted"
              : "Waiting"
          }`}
        >
          {request.isSeenBySeller
            ? request.isSeenBySeller
              ? "Rejected"
              : "Accepted"
            : "Waiting"}
        </div>
        <div className="seeMore" onClick={handelOpen}>
          <ExpandMoreIcon />
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
