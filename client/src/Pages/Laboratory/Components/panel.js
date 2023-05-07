import React, { useState } from "react";
import "./panel.css";

export default function Panel({
  itemCount,
  purchaseItemsCount,
  purchase,
  price,
}) {
  return (
    <>
      <div className="panel-container">
        <p className="item-count">NFTs : {itemCount}</p>
        <p className="purchase-item">Selected : {purchaseItemsCount}</p>
        <p className="price">Price : {price + " ETH"}</p>
        <button
          disabled={purchaseItemsCount < 1}
          onClick={purchase}
        >
          Puchase
        </button>
      </div>
    </>
  );
}
