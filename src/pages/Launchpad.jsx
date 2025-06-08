import React from "react";
import { useNavigate } from "react-router-dom";
import "./Launchpad.css";
import Counter from "../components/Counter"; // Import Counter component

function Launchpad() {
  const navigate = useNavigate();

  const icons = [
    { name: "Home", path: "/" },
    { name: "Counter", path: "/counter" },
    { name: "Function1", path: "/main?component=function1" },
    { name: "Function2", path: "/main?component=function2" },
    { name: "Function3", path: "/main?component=function3" },
    { name: "Function4", path: "/main?component=function4" },
    { name: "Function5", path: "/main?component=function5" },
    { name: "Function6", path: "/main?component=function6" },
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
