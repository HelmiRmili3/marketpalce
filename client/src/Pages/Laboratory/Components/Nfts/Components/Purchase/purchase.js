import React from "react";
import "./purchase.css";
import { composeResquests } from "../../../../../../utils/helper";
import { useWallet } from "../../../../../../Contexts/walletContext";
import { useLabo } from "../../../../../../Contexts/laboContext";
import AlertDialog from "../Dialog/dialog";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const Web3 = require("web3");
const web3 = new Web3();
const Purchase = ({ nftcount, nftselected, totalPrice }) => {
  const { allNfts, makeRequest } = useLabo();
  const { address } = useWallet();
  const ethValue = web3.utils.fromWei(totalPrice.toString(), "ether");
  const handlePurchase = async (_period, _collectionName) => {
    const result = composeResquests(
      _collectionName,
      address,
      _period,
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
        <ShoppingCartIcon style={{padding:"8px" ,color:"blue"}} />
        <Count className="count" count={nftcount} label="NFT" />
        <Count className="count" count={nftselected.length} label="Selected" />
        <Count
          className="count"
          count={ethValue.toString()}
          label="Total(ETH)"
        />
        <AlertDialog
          handlePurchase={handlePurchase}
          nftselected={nftselected}
          totalPrice={totalPrice}
        />
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
