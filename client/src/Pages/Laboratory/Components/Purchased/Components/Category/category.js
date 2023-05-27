import React from "react";
import "./category.css";
import Collection from "../collection/collection";
const Category = ({ category }) => {
  return (
    <div className="scroll-container" >
      <ul className="scroll-list">
        {category.map((collection, index) => (
          <li key={index} >
            <Collection key={index} collection={collection} />
          </li>
        ))}
      </ul>
    </div>
  );
};

{
  /* <div className="category">
  {category.map((collection, index) => (
    <>
      <div key={index}>{collection}</div>
    </>
  ))}
</div>; */
}

export default Category;
// <Collection collection={collection} key={index} />
