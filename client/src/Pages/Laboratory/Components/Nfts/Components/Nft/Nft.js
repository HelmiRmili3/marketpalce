import React from "react";
import Web3 from "web3";
const NFT = ({ nft }) => {
  const timestamp = 1621184400000; // Replace with your timestamp in milliseconds

  const date = new Date(timestamp);

  const formattedDate = date.toLocaleString();
  return (
    <>
      <div key={nft.id} className="nft">
        <input type="checkbox" id={nft.id} />
        <label htmlFor={nft.id}>{formattedDate}</label>
      </div>
    </>
  );
};
export default NFT;
