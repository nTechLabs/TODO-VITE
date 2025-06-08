import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Launchpad from "../pages/Launchpad";
import Function1 from "../pages/function1";
import Function2 from "../pages/function2";
import Function3 from "../pages/function3";
import Function4 from "../pages/function4";
import Function5 from "../pages/function5";
import Function6 from "../pages/function6";
import Main from "../pages/main";
import Counter from "../components/Counter"; // Import Counter component

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Launchpad />} />
        <Route path="/function1" element={<Function1 />} />
        <Route path="/function2" element={<Function2 />} />
        <Route path="/function3" element={<Function3 />} />
        <Route path="/function4" element={<Function4 />} />
        <Route path="/function5" element={<Function5 />} />
        <Route path="/function6" element={<Function6 />} />
        <Route path="/main" element={<Main />} />
        <Route path="/launchpad" element={<Launchpad />} />
        <Route path="/counter" element={<Counter />} />{" "}
        {/* Add route for Counter */}
      </Routes>
    </Router>
  );
}

export default AppRouter;
