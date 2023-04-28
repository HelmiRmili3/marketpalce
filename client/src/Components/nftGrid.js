import React, { useState } from "react";
import "./grid.css";
import Popup from "../Pages/Patient/Components/Popup";
import { useNftDatabase } from "../Contexts/NFTdatabase";
export default function Grid() {
  const {ownedNfts } = useNftDatabase();
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
  return (
    <>
      <div class="nft-grid">
        {ownedNfts.map((data) => (
          <div
            class="nft-card"
            key={data[0]}
            onClick={() => {
              setPopUpData(data);
              handleButtonClick();
            }}
          >
            <img src={photopicker(data.name)} alt="" />
            <h3>{data.name}</h3>
            <p>Created :{timeConvert(data.date)}</p>
          </div>
        ))}
      </div>
      <Popup
        visible={popupVisible}
        message={popupdata ? popupdata[5] : ""}
        header={popupdata ? popupdata[1] : ""}
        onClose={handlePopupClose}
      />
    </>
  );
}
