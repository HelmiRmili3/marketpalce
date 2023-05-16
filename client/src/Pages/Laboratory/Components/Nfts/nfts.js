import React from "react";
import { useLabo } from "../../../../Contexts/laboContext";
import Owners from "./Components/Owners/owners";
export default function Nfts() {
  const { categoryzed } = useLabo();
  return (
    <>
      <h1>HI THERE</h1>
      <Owners patients={categoryzed} />
    </>
  );
}
