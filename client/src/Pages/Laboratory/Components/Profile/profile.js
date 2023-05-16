import React, { useEffect, useState } from "react";
import "./profile.css";
import { useLabo } from "../../../../Contexts/laboContext";
import { useAuth } from "../../../../Contexts/authContext";
const Card = ({account}) => {
  // const [balance, setBalance] = useState(0);
  // const [nftCount, setNftCount] = useState(0);
  // const {address} = useAuth();
  //const {setPrice} = useLabo();
  //setPrice(0);
  // useEffect(() => {
  //   // You can use web3 to fetch account balance and NFT count here
  //   // For demonstration purposes, let's just set dummy data
  //   setBalance(10);
  //   setNftCount(5);
  // }, [account]);

  return (
    <div className="card">
      <div className="card-image" style={{ backgroundImage: "url('https://picsum.photos/500/753')" }}></div>
      <div className="card-content">
        <div className="card-address">Wallet : {"address"}</div>
        <div className="card-balance">Balance: {"balance"} ETH</div>
        <div className="card-nfts">Number of NFTs purchased: {"nftCount"}</div>
      </div>
    </div>
  );
};

export default Card;
