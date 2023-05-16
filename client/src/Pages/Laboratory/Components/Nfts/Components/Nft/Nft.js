import React from "react";
const Web3 = require('web3');
const web3 = new Web3();
const NFT = ({ nft,selected,onSelect }) => {
  const date = new Date(nft.date * 1000);
  const formattedDate = date.toLocaleDateString();
  const ethValue = web3.utils.fromWei(nft.price, 'ether');

  const handleSelectionChange = () => {
    onSelect(nft.id);
  };
  return (
    <>
      <div key={nft.id} className="nft">
        <input
          type="checkbox"
          id={nft.id}
          checked={selected}
          onChange={handleSelectionChange}
        />
        <label htmlFor={nft.id}>{formattedDate+' ->'}</label>
        <label htmlFor={nft.price}>{ethValue} ETH</label>
      </div>
    </>
  );
};
export default NFT;
