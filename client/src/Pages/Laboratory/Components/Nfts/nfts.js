import React, { useState } from "react";
import { useLabo } from "../../../../Contexts/laboContext";
import Owners from "./Components/Owners/owners";
import Empty from "./Components/NoNFT/empty";
export default function Nfts() {
  const { categoryzed } = useLabo();
  const [selectedNFTs, setSelectedNFTs] = useState([]);
  
  return (
    <>
      <h1>{selectedNFTs.length}</h1>
      {categoryzed ? (
        <Owners
          patients={categoryzed}
          selectedNFTs={selectedNFTs}
          setSelectedNFTs={setSelectedNFTs}
        />
      ) : (
        <Empty />
      )}
    </>
  );
}
