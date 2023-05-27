import React, { useState } from "react";
import "./profile.css";
import { useAuth } from "../../../../Contexts/authContext";
import { generateRandomCode } from "../../../../utils/generateCode";
import EmailButton from "../../../../utils/changePassword";
const Card = ({ account }) => {
  const [balance, setBalance] = useState(0);
  const { address, currentUser } = useAuth();
  const [code, setCode] = useState("");
  const handelPasswordchange = () => {
    setCode(generateRandomCode);
    console.log(code);
    return 
  };
  return (
    <div className="card">
      <div className="card-image"></div>
      <div className="card-content">
        <div className="card-address">Wallet : {address}</div>
        <div className="card-balance">Balance: {"balance"} ETH</div>
        <div className="">{currentUser?.password}</div>
        <button onClick={handelPasswordchange}>Click</button>
        <EmailButton recipient={"helmi.rmili@isimg.tn"} subject={"changePassword"} body={code} sender={"helmirmili3@gmail.com"} />
      </div>
    </div>
  );
};

export default Card;
