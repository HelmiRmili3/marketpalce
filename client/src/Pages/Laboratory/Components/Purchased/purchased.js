import React from "react";
import "./purchased.css";
import { useLabo } from "../../../../Contexts/laboContext";
import DownloadIcon from '@mui/icons-material/Download';
const Purchased = () => {
  const { collections } = useLabo();
  console.log(collections);
  return (
    <div className="grid-list">
      {collections.map((collection, index) => (
        <Collection collection={collection} index={index} key={index} />
      ))}
    </div>
  );
};

const Collection = ({ collection, index }) => {
  const now = new Date();
  const unixTimestamp = Math.floor(now.getTime() / 1000);
  const date = new Date(1684706866 * 1000);
  const localDateString = date.toLocaleString();
  // console.log(now);
  // console.log(localDateString);
  function convertTimestamp(timestamp) {
    const seconds = Math.floor(timestamp / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;
    return {
      days,
      hours: remainingHours,
      minutes: remainingMinutes,
    };
  }
  const s = collection.date - unixTimestamp;
  const time = convertTimestamp(s);
  const defaultEndDate = new Date( collection.date *1000);

  return (
    <div className="grid-list__card">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG9nhqc_Zt3e72j1QuvrEv78tce4BSGMVXvskNxGI4prOd4DLeMNb8UI_xjWC1l1vifsI&usqp=CAU"
        alt=""
        className="grid-list__image"
      />
      <div className="grid-list__info">
        <h3 className="grid-list__name">Collection: {collection.name}</h3>
        <h3 className="grid-list__name">NFTs: {collection.nfts.join(' ')}</h3>
        <p className="grid-list__date">{defaultEndDate.toUTCString()}</p>
      </div>
      <div className="row-button">
        <button className="grid-list__button__seemore" onClick={() => {}}>
          See More
        </button>
        <button className="grid-list__button__download" onClick={() => {}}>
          <DownloadIcon color="bleu" />
        </button>
      </div>
    </div>
  );
};

export default Purchased;
