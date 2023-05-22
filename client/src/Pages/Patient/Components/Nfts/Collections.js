import React from "react";
import Grid from "./nftGrid";
import PopupForm from "./PopupForm";
import AppsIcon from "@mui/icons-material/Apps";
const Collections = () => {
  return (
    <>
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <AppsIcon style={{ fontSize: "50px", color: "blue" }} />
          <PopupForm />
        </div>
        <Grid />
      </div>
    </>
  );
};
export default Collections;
