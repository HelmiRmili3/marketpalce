import React from "react";
import Request from "../request/request";
import CustomLabel from "../CostomLabel/costomLabel";
const History = ({requests}) => {
  return requests.length >0 ? (
    <div className="order-list">
      <CustomLabel label={"History"} />
      {requests?.map((request, index) => (
        <Request key={index} request={request}/>
      ))}
    </div>
  ) : (
    <></>
  );
};
export default History;
