import React from "react";
import { useNavigate } from "react-router-dom";
import "./Launchpad.css";
import Counter from "../components/Counter"; // Import Counter component

function Launchpad() {
  const navigate = useNavigate();

  const icons = [
    { name: "Vite", path: "/Vite" },
    { name: "Counter", path: "/Counter" },
    { name: "FormGuide", path: "/formGuide" },
    { name: "Function1", path: "/main?component=function1" },
    { name: "Cars", path: "/main?component=cars" },
    { name: "TabsPage", path: "/main?component=tabsPage" },
    { name: "Function5", path: "/main?component=function5" },
    { name: "Calculator", path: "/main?component=calculator" },
    { name: "Alarm", path: "/Alarm" }, // Rename Function6 to Calculator
  ];

  return (
    <div className="launchpad">
      {icons.map((icon) => (
        <button
          key={icon.name}
          onClick={() => navigate(icon.path)}
          className="launchpad-icon"
        >
          {icon.name}
        </button>
      ))}
    </div>
  );
}

export default Launchpad;
