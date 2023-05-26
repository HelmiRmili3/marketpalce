import React from "react";
import "./purchased.css";
import { useLabo } from "../../../../Contexts/laboContext";
import Collection from "./Components/Collection/collection";
const Purchased = () => {
  const { collections } = useLabo();
  //console.log(collections);
  return (
    <div className="grid-list">
      {collections.map((collection, index) => (
        <Collection collection={collection} key={index} />
      ))}
    </div>
  );
};



export default Purchased;
