import React, { useState } from "react";
import "./owner.css";
import Categorys from "../Categorys/categorys";
const Owners = ({ patients }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const handelOpen = () => {
    setOpen(!open);
  };
  const handleSelect = () => {
    setSelected(!selected);
  };
  return (
    <>
      <div className="nft-list">
        {Object.entries(patients).map(([address, nftCategories]) => (
          <div key={address}>
            <div className={selected ? "patient selected" : "patient"}>
              <label onClick={handleSelect} htmlFor={address}>
                Patient: {address}
              </label>
              <Count className="count" nftCategories={nftCategories} />
              <button onClick={handelOpen}>{open ? "-" : "+"}</button>
            </div>
            {open && <Categorys nftCategories={nftCategories} />}
          </div>
        ))}
      </div>
    </>
  );
};
export default Owners;
function Count({ nftCategories }) {
  return (
    <>
      {Object.entries(nftCategories).map(([category, nftList]) => (
        <label style={{ margin: "none", flex: "2" }} htmlFor={category}>
          {nftList.length > 0 ? nftList.length : "-"}
        </label>
      ))}
    </>
  );
}
