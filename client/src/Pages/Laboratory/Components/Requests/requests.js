import React, { useState } from "react";
import "./requests.css";
import { useLabo } from "../../../../Contexts/laboContext";
import Request from "./Component/request/request";
export default function Requests() {
  let { requests } = useLabo();
  let list = requests.slice().reverse();
  
  return requests ? (
    <div className="order-list">
      {list?.map((request, index) => (
        <Request request={request} index={index} />
      ))}
    </div>
  ) : (
    <></>
  );
}
