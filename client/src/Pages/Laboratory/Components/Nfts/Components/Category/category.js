import React from "react";
import NFT from "../Nft/Nft";
import "./category.css"
const Category = ({ category ,nftList }) => {
  return (
    <div key={category} className="category">
      {/* <input type="checkbox" id={category} /> */}
      <label className="text"  htmlFor={category}>{category}</label>
      {nftList.map((nft) => (
        <NFT key={nft.id} nft={nft} />
      ))}
    </div>
  );
};
export default Category;
