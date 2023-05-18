import React from "react";
import "./purchase.css";
const Web3 = require("web3");
const web3 = new Web3();
const Purchase = ({ nftcount, nftselected, totalPrice }) => {
  const ethValue = web3.utils.fromWei(totalPrice.toString(), "ether");

  return (
    <>
      <div className="container">
        <Count className="count" count={nftcount} label="NFT" />
        <Count className="count" count={nftselected} label="Selected" />
        <Count
          className="count"
          count={ethValue.toString()}
          label="Total(ETH)"
        />
        <button  className="purchase" onClick={() => {}}>Purchase</button>
      </div>
    </>
  );
};
export default Purchase;

function Count({ count, label }) {
  return (
    <>
      <div className="count">
        {label} : {count}
      </div>
    </>
  );
}
