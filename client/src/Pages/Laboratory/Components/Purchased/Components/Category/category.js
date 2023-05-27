import React from "react";
import "./category.css";
import Collection from "../collection/collection";
const Category = ({ category }) => {
  return (
    <div class="scroll-container">
      <ul class="scroll-list">
        {category.map((collection, index) => (
          <li>
            <Collection collection={collection} />
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
