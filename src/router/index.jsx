import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Launchpad from "../pages/Launchpad";
import Function1 from "../pages/function1";
import FormGuide from "../pages/formGuide";
import Function3 from "../pages/function3";
import Function4 from "../pages/function4";
import Function5 from "../pages/function5";
import Calculator from "../pages/calculator"; // Update import to Calculator
import Main from "../pages/main";
import Counter from "../components/Counter"; // Import Counter component
import Vite from "../pages/Vite/index"; // Import Vite component
import Alarm from "../pages/alarm";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Launchpad />} />
        <Route path="/function1" element={<Function1 />} />
        <Route path="/formGuide" element={<FormGuide />} />
        <Route path="/function3" element={<Function3 />} />
        <Route path="/function4" element={<Function4 />} />
        <Route path="/function5" element={<Function5 />} />
        <Route path="/calculator" element={<Calculator />} />{" "}
        {/* Update route to Calculator */}
        <Route path="/main" element={<Main />} />
        <Route path="/launchpad" element={<Launchpad />} />
        <Route path="/counter" element={<Counter />} />{" "}
        {/* Add route for Counter */}
        <Route path="/vite" element={<Vite />} /> {/* Add route for Vite */}
        <Route path="/alarm" element={<Alarm />} />{" "}
      </Routes>
    </Router>
  );
}

export default AppRouter;
