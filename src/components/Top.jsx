import React from "react";
import { useNavigate } from "react-router-dom";
import homeIcon from "../assets/home-icon.png"; // Ensure this path is correct
import searchIcon from "../assets/search-icon.png"; // Ensure this path is correct

function Top() {
  const navigate = useNavigate();

  return (
    <div
      className="top-container"
      style={{ display: "flex", alignItems: "center" }}
    >
      <img
        src={homeIcon}
        alt="Home"
        className="top-home-icon"
        onClick={() => navigate("/launchpad")}
        style={{ cursor: "pointer" }}
      />
      <div style={{ flexGrow: 1 }}></div>{" "}
      {/* Spacer to push search icon to the right */}
      <img src={searchIcon} alt="Search" className="top-search-icon" />
    </div>
  );
}

export default Top;
