import React, { useState } from "react";
import "../Purchase/purchase.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CustomTextFiled from "../CostomTextFiled/costomTextFiled";
const Web3 = require("web3");
const web3 = new Web3();
const AlertDialog = ({ handlePurchase, nftselected, totalPrice }) => {
  const [open, setOpen] = useState(false);
  const [period, setPeriod] = useState(1);
  const [collectionName, setCollectionName] = useState("");
  const ethValue = web3.utils.fromWei(totalPrice.toString(), "ether");

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
    console.log(period);
  };
  const handleCollectionNameChange = (e) => {
    setCollectionName(e.target.value);
    console.log(collectionName);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handelAgree = () => {
    handlePurchase(period, collectionName);
    setOpen(false);
  };
  return (
    <div>
      <button className="purchase" onClick={handleClickOpen}>
        Purchase
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Select the period and name your collection:"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Thank you for your purchase ,You are buying {nftselected.length} NFTs with {ethValue} ETH.
            Please note that the corresponding amount of ETH will be deducted from your account
            balance.
          </DialogContentText>
          <CustomTextFiled
            handlePeriodChange={handlePeriodChange}
            handleCollectionNameChange={handleCollectionNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handelAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AlertDialog;
