import React, {  } from "react";
import Category from "../Category/category";
import "./categorys.css";
const Categorys = ({ nftCategories, selectedNFTs, setSelectedNFTs }) => {
  return (
    <>
      <div className="categorys">
        {Object.entries(nftCategories).map(([category, nftList]) => (
          <Category
            key={category}
            category={category}
            nftList={nftList}
            selectedNFTs={selectedNFTs}
            setSelectedNFTs={setSelectedNFTs}
          />
        ))}
      </div>
    </>
  );
};
export default Categorys;
