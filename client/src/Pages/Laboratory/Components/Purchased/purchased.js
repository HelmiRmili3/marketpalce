import React from "react";
import "./purchased.css";
import { useLabo } from "../../../../Contexts/laboContext";
import Category from "./Components/Category/category";
import { parseCategory } from "../../../../utils/helper";
const Purchased = () => {
  const { collections } = useLabo();
  console.log(collections);
  const data = parseCategory(collections);
  console.log(data);

  return (
    <div className="grid-list">
      {Object.entries(data).map(([name, collections], index) => {
        const header = (
          <>
            <b>{name?.charAt(0).toUpperCase()}</b>
            {name?.slice(1)}
          </>
        );
        return (
          <div  className="collection" key={index}>
            <h3 className="category-title">{header}</h3>
            <Category category={collections} />
          </div>
        );
      })}
    </div>
  );
};
export default Purchased;
