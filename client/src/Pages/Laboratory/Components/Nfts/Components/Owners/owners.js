import React, { useState } from "react";
import FaceIcon from "@mui/icons-material/Face";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Purchase from "../Purchase/purchase";
import { extractNfts } from "../../../../../../utils/helper";
import "./owner.css";
import Categorys from "../Categorys/categorys";
const Owners = ({ patients, selectedNFTs, setSelectedNFTs }) => {
  const nfts = extractNfts(patients);

  const totalprice = selectedNFTs.reduce(
    (totalprice, id) => totalprice + parseInt(nfts[id].price),
    0
  );
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
      <Purchase
        nftcount={nfts.length}
        nftselected={selectedNFTs}
        totalPrice={totalprice}
      />
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
      <div
        className={
          selected
            ? "patient selected non-selectable "
            : "patient non-selectable "
        }
      >
        <div  className="address">
          <FaceIcon className="custom-icon" />
          <label onClick={handleSelect} htmlFor={address}>
            {address}
          </label>
        </div>
        <div className="count">
          <Count  nftCategories={nftCategories} />
        </div>
        <div className="icon-button">
          <button onClick={handelOpen}>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </button>
        </div>
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
        <label key={category} className="categoryCount" htmlFor={category}>
          {category}:{nftList.length !== null ? nftList.length : "-"}
        </label>
      ))}
    </>
  );
}
