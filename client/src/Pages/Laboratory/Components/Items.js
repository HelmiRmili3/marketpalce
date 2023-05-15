import React, { useEffect, useState } from "react";
import "./items.css";
import Web3 from "web3";
import { useLabo } from "../../../Contexts/laboContext";
const web3 = new Web3("http://localhost:7545");
export default function Items({ items }) {
  const {} = useLabo();
  const [selectedItems, setSelectedItems] = useState([]);
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(items.map((item) => item.tokenId));
      // setPrice(
      //   items
      //     .map((p) => p.price)
      //     .reduce((acc, cur) => parseInt(acc) + parseInt(cur), 0)
      // );
    } else {
      setSelectedItems([]);
     // setPrice(0);
    }
  };
  const handleSelect = (e, _tokenId, _price) => {
    if (e.target.checked) {
      setSelectedItems([...selectedItems, _tokenId]);
      //setPrice(parseInt(price) + parseInt(_price));
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== _tokenId));
      //setPrice(parseInt(price) - parseInt(_price));
    }
  };
  // useEffect(() => {
  //   setToBuyList(selectedItems);
  // }, [selectedItems]);
  return (
    <>
      <div className="list">
        <div className="list-header">
          <div className="list-header-checkbox">
            <input
              type="checkbox"
              checked={selectedItems.length === items?.length}
              onChange={handleSelectAll}
            />
          </div>
          <div className="list-header-name">Nfts</div>
          <div className="list-header-date">Date</div>
          <div className="list-header-price">Price</div>
        </div>
        {items?.map((nft) => {
          const itemDate = new Date(nft.date * 1000);
          const nftPrice = web3.utils.fromWei(nft.price, "ether");
          return (
            <div className="list-item" key={nft.id}>
              <div className="list-item-checkbox">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(nft.id)}
                  onChange={(e) => handleSelect(e, nft.id, nft.price)}
                />
              </div>
              <div className="list-item-name">{nft.name}</div>
              <div className="list-item-date">
                {itemDate.toLocaleDateString()}
              </div>
              <div className="list-item-price">{nftPrice} eth</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
