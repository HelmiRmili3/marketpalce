import React from "react";
import "./purchased.css";
import { useLabo } from "../../../../Contexts/laboContext";
import Collection from "./Components/Collection/collection";
const Collections = ({collections}) => {
  return (
    <div className="grid-list">
      {collections.map((collection, index) => (
        <Collection collection={collection} key={index} />
      ))}
    </div>
  );
};

export default Collections;