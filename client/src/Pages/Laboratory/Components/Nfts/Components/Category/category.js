import React, {  } from "react";
import NFT from "../Nft/Nft";
import "./category.css";
const Category = ({ category, nftList, selectedNFTs, setSelectedNFTs }) => {
  const handleNFTSelection = (nftId) => {
    if (selectedNFTs.includes(nftId)) {
      setSelectedNFTs(selectedNFTs.filter((id) => id !== nftId));
    } else {
      setSelectedNFTs([...selectedNFTs, nftId]);
    }
  };
  return (
    <div key={category} className="category non-selectable">
      {/* <input type="checkbox" id={category} onChange={selectedCategory} /> */}
      <label className="text" htmlFor={category}>
        {category}
      </label>
      {nftList.map((nft) => (
        <NFT
          key={nft.id}
          nft={nft}
          selected={selectedNFTs.includes(nft.id)}
          onSelect={handleNFTSelection}
        />
      ))}
    </div>
  );
};
export default Category;
