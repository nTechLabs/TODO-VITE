import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Launchpad from "../pages/Launchpad";
import Function1 from "../pages/function1";
import FormGuide from "../pages/formGuide";
import Cars from "../pages/Cars";
import TabsPage from "../pages/tabsPage";
import UtilsPage from "../pages/utilsPage";
import Calculator from "../pages/calculator"; // Update import to Calculator
import Main from "../pages/main";
import Counter from "../components/Counter"; // Import Counter component
import Vite from "../pages/Vite/index"; // Import Vite component
import Contact from "../pages/contact";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Launchpad />} />
        <Route path="/function1" element={<Function1 />} />
        <Route path="/formGuide" element={<FormGuide />} />
        <Route path="/Cars" element={<Cars />} />
        <Route path="/tabsPage" element={<TabsPage />} />
        <Route path="/utilsPage" element={<UtilsPage />} />
        <Route path="/calculator" element={<Calculator />} />{" "}
        {/* Update route to Calculator */}
        <Route path="/main" element={<Main />} />
        <Route path="/launchpad" element={<Launchpad />} />
        <Route path="/counter" element={<Counter />} />{" "}
        {/* Add route for Counter */}
        <Route path="/vite" element={<Vite />} /> {/* Add route for Vite */}
        <Route path="/contact" element={<Contact />} />{" "}
      </Routes>
    </Router>
  );
}

export default AppRouter;
