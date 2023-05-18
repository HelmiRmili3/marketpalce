import React, { useState } from "react";
import "./filter.css";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useLabo } from "../../../../../../Contexts/laboContext";
import { extractNfts } from "../../../../../../utils/helper";
import Popop from "../Popup/popup";

const Filter = ({ selectedNFTs, setSelectedNFTs, allNfts, setAllNfts }) => {
  const { categoryzed } = useLabo();
  const [filtred, setFiltred] = useState(extractNfts(allNfts));
  return (
    <>
      <div className="filter">
        <Collection />
        <Filters
          filtred={filtred}
          setFiltred={setFiltred}
          allNfts={allNfts}
          setAllNfts={setAllNfts}
        />
        <Reset
          selectedNFTs={selectedNFTs}
          setSelectedNFTs={setSelectedNFTs}
          setAllNfts={setAllNfts}
          categoryzed={categoryzed}
        />
      </div>
    </>
  );
};
export default Filter;

function Collection() {
  return <div className="div-collection">Collection</div>;
}

function Filters({ allNfts, setAllNfts, filtred, setFiltred }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="div-filters">
      <button
        onClick={() => {
          setOpen(!open);
        }}
      >
        <FilterListIcon />
      </button>
      {open && (
        <Popop
          setFiltred={setFiltred}
          filtred={filtred}
          allNfts={allNfts}
          setAllNfts={setAllNfts}
          setOpen={setOpen}
        />
      )}
    </div>
  );
}
function Reset({ setSelectedNFTs, setAllNfts, categoryzed }) {
  return (
    <div className="div-reset">
      <button
        onClick={() => {
          setSelectedNFTs([]);
          setAllNfts(categoryzed);
        }}
      >
        <RefreshIcon />
      </button>
    </div>
  );
}
