import React, { useEffect, useState } from "react";
import "./requests.css";
import { useNftDatabase } from "../../../Contexts/NFTdatabase";
import { useLabo } from "../../../Contexts/laboContext";
export default function Requests() {
  const {setPrice} = useLabo();
  setPrice(0);
  const { buyRequest } = useNftDatabase();
  const [data, setData] = useState([]);
  
  useEffect(() => {
    if (buyRequest) {
      let requests = [];
      buyRequest.forEach((request) => {
        const responseObject = {
          buyer: request[0],
          owner: request[1],
          id: request[2],
          date: new Date(request[4] * 1000),
          isCompleted: request[5],
          isAccepted: request[6],
        };
        requests.push(responseObject);
      });
      setData(requests);
    }
  }, [buyRequest]);
  return data ? (
    <div className="order-list">
      {data.map((order, index) => (
        <div className="order-item" key={index}>
          <div className="order-id">{parseInt(order.id) + 1}</div>
          <div className="order-address">{order.owner}</div>
          <div className="order-date">{order.date.toLocaleDateString()}</div>
          <div
            className={`order-status ${
              order.isCompleted 
                ? order.isAccepted 
                  ? "Rejected"
                  : "Accepted"
                : "Waiting"
            }`}
          >
            {order.isCompleted 
              ? order.isAccepted 
                ? "Rejected"
                : "Accepted"
              : "Waiting"}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <></>
  );
}
