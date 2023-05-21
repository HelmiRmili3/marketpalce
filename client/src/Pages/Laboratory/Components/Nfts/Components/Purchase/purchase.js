import React from "react";
import "./purchase.css";
import { composeResquests } from "../../../../../../utils/helper";
import { useWallet } from "../../../../../../Contexts/walletContext";
import { useLabo } from "../../../../../../Contexts/laboContext";
const Web3 = require("web3");
const web3 = new Web3();
const Purchase = ({ nftcount, nftselected, totalPrice }) => {
  const { allNfts, makeRequest } = useLabo();
  const { address } = useWallet();
  const period = 100000;
  const collectionName = "collection1";
  const ethValue = web3.utils.fromWei(totalPrice.toString(), "ether");
  const handlePurchase = async () => {
    const result = composeResquests(
      collectionName,
      address,
      period,
      nftselected,
      allNfts
    );
    if (result.length > 0) {
      try {
        await makeRequest(result);
      } catch (error) {
        console.log(error);
      }
      console.log(result);
    } else {
      console.log("You have not selected any nfts");
    }
  };
  return (
    <>
      <div className="buy-container non-selectable">
        <Count className="count" count={nftcount} label="NFT" />
        <Count className="count" count={nftselected.length} label="Selected" />
        <Count
          className="count"
          count={ethValue.toString()}
          label="Total(ETH)"
        />
        <button className="purchase" onClick={handlePurchase}>
          Purchase
        </button>
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
