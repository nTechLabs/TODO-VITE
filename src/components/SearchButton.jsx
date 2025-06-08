import React from "react";
import Button from "@mui/material/Button";

function SearchButton() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Button variant="contained">Search</Button>
    </div>
  );
}

export default SearchButton;
