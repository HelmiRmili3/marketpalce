import React, { useState } from "react";
import "./grid.css";
import NftPopup from "./nftpopup";
import Empty from "./EmptyPage/empty";
import { usePatient } from "../../../../Contexts/patientContext";
const Grid = () => {
  const { nfts } = usePatient();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupdata, setPopUpData] = useState();
  const handleButtonClick = () => {
    setPopupVisible(true);
  };
  const handlePopupClose = () => {
    setPopupVisible(false);
  };
  function timeConvert(timestamp) {
    const date = new Date(timestamp * 1000).toLocaleDateString();
    return date;
  }
  function photopicker(option) {
    switch (option) {
      case "Electrolytes":
        return "https://cdn1.iconfinder.com/data/icons/fitness-healthy-living-wildberry-vol-1/256/Electrolytes-512.png";
      case "Glucose":
        return "https://cdn-icons-png.flaticon.com/512/6192/6192107.png";
      case "Cholesterol":
        return "https://cdn-icons-png.flaticon.com/512/5873/5873008.png";
      default:
        return "https://i.insider.com/6123e07e4932030018457fb7?width=1136&format=jpeg";
    }
  }
  return nfts ? (
    <>
      <div className="nft-grid">
        {nfts.map((nft) => (
          <div
            className="nft-card"
            key={nft.id}
            onClick={() => {
              setPopUpData(nft);
              handleButtonClick();
            }}
          >
            <img src={photopicker(nft.name)} alt="" />
            <h3>{nft.name}</h3>
            <p>Created :{timeConvert(nft.date)}</p>
          </div>
        ))}
      </div>
      <NftPopup
        visible={popupVisible}
        message={popupdata ? popupdata.data : ""}
        header={popupdata ? popupdata.name : ""}
        onClose={handlePopupClose}
      />
    </>
  ) : (
    <Empty />
  );
};
export default Grid;
