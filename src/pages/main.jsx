import React from "react";
import { useLocation } from "react-router-dom";
import "./main.css";
import Top from "../components/Top";
import Function1 from "./function1";
import Function2 from "./function2";
import Function3 from "./function3";
import Function4 from "./function4";
import Function5 from "./function5";
import Function6 from "./function6";
import SearchButton from "../components/SearchButton";
import SearchResult from "../components/SearchResult";
import Counter from "../components/Counter"; // Import Counter component

function Main() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const component = searchParams.get("component");

  return (
    <div className="main-container">
      <div className="top">
        <Top />
      </div>
      <div className="main-search">
        {component === "function1" && <Function1 />}
        {component === "function2" && <Function2 />}
        {component === "function3" && <Function3 />}
        {component === "function4" && <Function4 />}
        {component === "function5" && <Function5 />}
        {component === "function6" && <Function6 />}
        {component === "counter" && <Counter />}{" "}
        {/* Render Counter component when 'Counter' button is clicked */}
      </div>
      <div className="search-button">
        <SearchButton />
      </div>
      <div className="search-result">
        <SearchResult />
      </div>
    </div>
  );
}

export default Main;
