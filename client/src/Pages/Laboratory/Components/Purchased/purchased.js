import React from "react";
import "./purchased.css";
import { useLabo } from "../../../../Contexts/laboContext";
import Category from "./Components/Category/category";
//import Collection from "./Components/Collection/collection";
const Purchased = () => {
  const { collections } = useLabo();
  //console.log(collections);
  
  const data = [
    [
      "Alexander",
      "Benjamin",
      "Charlotte",
      "Elizabeth",
      "Gabrielle",
      "Isabella",
      "Katherine",
      "Nathaniel",
      "Stephanie",
      "Victoria",
      "Alexander",
      "Benjamin",
      "Charlotte",
      "Elizabeth",
      "Gabrielle",
      "Isabella",
      "Katherine",
      "Nathaniel",
      "Stephanie",
      "Victoria",
    ],
    [
      "Alexander",
      "Benjamin",
      "Charlotte",
      "Elizabeth",
      "Gabrielle",
      "Isabella",
      "Katherine",
      "Nathaniel",
      "Stephanie",
      "Victoria",
      "Alexander",
      "Benjamin",
      "Charlotte",
      "Elizabeth",
      "Gabrielle",
      "Isabella",
      "Katherine",
      "Nathaniel",
      "Stephanie",
      "Victoria",
    ],
  ];

  return (
    <div className="grid-list">
      {data.map((collection, index) => (
        <>
          <div className="collection" >
            <h3>collection</h3>
            <Category key={index} category={collection} />
          </div>
        </>
      ))}
    </div>
  );
};

//<Collection collection={collection} key={index} />

export default Purchased;
