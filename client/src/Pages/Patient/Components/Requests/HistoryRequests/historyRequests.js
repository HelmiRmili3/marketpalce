import React from "react";
import Request from "../Request/request";
import CustomLabel from "../CostomLabel/costomLabel";
const HistoryRequests = ({ requests }) => {
  return requests.length > 0 ? (
    <div className="order-list">
      <CustomLabel label={"Sended"} />
      {requests?.map((request, index) => (
        <Request key={index} request={request} />
      ))}
    </div>
  ) : (
    <></>
  );
};
export default HistoryRequests;
