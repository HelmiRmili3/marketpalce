import React from "react";
import "./nftpopup.css";
import ReactJson from 'react-json-view';

const NftPopup = ({ visible, message, header, onClose }) => {
  if (!visible) return null;
  const data =JSON.parse(message);
  return (
    <div>
      <div className="nftpopup">
        <div className="popup-inner">
          <h2>{header}</h2>
          <ReactJson src={data} theme="monokai" />
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default NftPopup;
