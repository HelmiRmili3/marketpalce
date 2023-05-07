import React, { useState } from "react";
import { useNftDatabase } from "../../../Contexts/NFTdatabase";
import { useLabo } from "../../../Contexts/laboContext";
import Category from "./Category";
import SearchComponent from "./SearchComponent";
import Items from "./Items";
import Panel from "./panel";
import Web3 from "web3";
import SuccesAlert from "../../../Components/SuccesAlert";

const web3 = new Web3("http://localhost:7545");

export default function Nfts() {
  const { filterdBycategory, filtred, toBuyList, price } = useLabo();
  const [filterMode, setFilterMode] = useState(false);
  const { addBuyRequest } = useNftDatabase();
  const [active, setactive] = useState(false);

  const handlePurchase = async () => {
    setactive(true);
    //await addBuyRequest(toBuyList[0]);
  };
  const toggleFilterMode = () => {
    setFilterMode(!filterMode);
  };
  const totalPrice = web3.utils.fromWei(price.toString(), "ether");

  return (
    <>
      <SuccesAlert
        visible={active}
        setVisible={setactive}
        timeout="3000"
        title="Alert"
        message={`Your order has been successfully added to the orders list. Please note that the ${totalPrice} ETH of the order will be deducted from your Wallet. OK`}
      />

      <SearchComponent toggalMode={toggleFilterMode} mode={filterMode} />
      {filterMode ? (
        <Category items={filterdBycategory} />
      ) : (
        <Items items={filtred} />
      )}
      <Panel
        itemCount={filtred.length}
        purchaseItemsCount={toBuyList.length}
        purchase={handlePurchase}
        price={totalPrice}
      />
    </>
  );
}
