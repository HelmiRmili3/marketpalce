import React, { useState } from "react";
import "./owner.css";
import Categorys from "../Categorys/categorys";
const Owners = ({ patients, selectedNFTs, setSelectedNFTs }) => {

  return (
    <>
      <div className="nft-list">
        {Object.entries(patients).map(([address, nftCategories]) => (
          <Patient
            key={address}
            address={address}
            nftCategories={nftCategories}
            selectedNFTs={selectedNFTs}
            setSelectedNFTs={setSelectedNFTs}
          />
        ))}
      </div>
    </>
  );
};
export default Owners;

function Patient({ address, nftCategories, selectedNFTs, setSelectedNFTs }) {
  const [selected, setSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const handelOpen = () => {
    setOpen(!open);
  };
  const handleSelect = () => {
    setSelected(!selected);
  };
  return (
    <div key={address}>
      <div className={selected ? "patient selected" : "patient"}>
        <label onClick={handleSelect} htmlFor={address}>
          Patient: {address}
        </label>
        <Count className="count" nftCategories={nftCategories} />
        <button onClick={handelOpen}>{open ? "-" : "+"}</button>
      </div>
      {open && (
        <Categorys
          nftCategories={nftCategories}
          selectedNFTs={selectedNFTs}
          setSelectedNFTs={setSelectedNFTs}
        />
      )}
    </div>
  );
}

function Count({ nftCategories }) {
  return (
    <>
      {Object.entries(nftCategories).map(([category, nftList]) => (
        <label
          key={category}
          style={{ margin: "none", flex: "3" }}
          htmlFor={category}
        >
          {nftList.length > 0 ? nftList.length : "-"}
        </label>
      ))}
    </>
  );
}
