import React from "react";
import { useLocation } from "react-router-dom";
import "./main.css";
import Top from "../components/Top";
import Function1 from "./function1";
import FormGuide from "./formGuide";
import Cars from "./Cars";
import TabsPage from "./tabsPage";
import Function5 from "./function5";
import Calculator from "./calculator";
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
      {["cars", "formGuide", "calculator", "counter", "tabsPage"].includes(
        component
      ) ? (
        <div className="full-area">
          {component === "function1" && <Function1 />}
          {component === "formGuide" && <FormGuide />}
          {component === "cars" && <Cars />}
          {component === "tabsPage" && <TabsPage />}
          {component === "function5" && <Function5 />}
          {component === "calculator" && <Calculator />}
          {component === "counter" && <Counter />}
        </div>
      ) : (
        <div className="main-search">
          {component === "function1" && <Function1 />}
          {component === "formGuide" && <FormGuide />}
          {component === "cars" && <Cars />}
          {component === "tabsPage" && <TabsPage />}
          {component === "function5" && <Function5 />}
          {component === "calculator" && <Calculator />}
          {component === "counter" && <Counter />}
        </div>
      )}
      {!["cars", "formGuide", "calculator", "counter", "tabsPage"].includes(
        component
      ) && (
        <>
          <div className="search-button">
            <SearchButton />
          </div>
          <div className="search-result">
            <SearchResult />
          </div>
        </>
      )}
    </div>
  );
}

export default Main;
