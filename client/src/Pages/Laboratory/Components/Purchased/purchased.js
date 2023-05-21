import React from "react";
import "./purchased.css";
import { useLabo } from "../../../../Contexts/laboContext";

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
  const date = new Date(1684706866 * 1000); // Multiply by 1000 to convert seconds to milliseconds
  const localDateString = date.toLocaleString();
  console.log(now);
  console.log(localDateString);

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
  console.log(s);
  const defaultEndDate = new Date(s * 1000);

  return (
    <div className="grid-list__card">
      <img
        src="https://picsum.photos/500/753"
        alt=""
        className="grid-list__image"
      />
      <div className="grid-list__info">
        <h3 className="grid-list__name">Collection: {collection.name}</h3>
        <h3 className="grid-list__name">NFTs: {collection.nfts.length}</h3>
        <p className="grid-list__date">{defaultEndDate.toUTCString()}</p>
      </div>
      <button className="grid-list__button" onClick={() => {}}>
        See More
      </button>
    </div>
  );
};

export default Purchased;
