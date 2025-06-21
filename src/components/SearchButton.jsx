import React from "react";
import { Button } from "antd";

const SearchButton = ({ onClick, children, ...props }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    }}
  >
    <Button type="primary" onClick={onClick} {...props}>
      {children}
    </Button>
  </div>
);

export default SearchButton;
