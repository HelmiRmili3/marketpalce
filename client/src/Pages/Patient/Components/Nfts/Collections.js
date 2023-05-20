import React from "react";
import Grid from "./nftGrid";
import PopupForm from "./PopupForm";
export default function Collections() {
  return (
    <>
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>NFT Collection</h2>
          <PopupForm />
        </div>
        <Grid />
      </div>
    </>
  );
}
