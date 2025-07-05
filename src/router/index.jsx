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
import Contact from "../pages/Contact";
import ServerApi from "../pages/ServerApi"; // Import ServerApi component
import UserDetail from "../pages/ServerApi/UserDetail"; // Import UserDetail component
import Alarms from "../pages/alarms";
import SamplePage from "../pages/SamplePage"; // Import SamplePage component
import Layout from "../components/Layout"; // Import Layout component
import Home from "../pages/Home"; // Import Home component
import CardDetail from "../pages/Home/CardDetail"; // Import CardDetail component
import TodoApi from "../pages/TodoApi"; // Import TodoApi component
import AlbumApi from "../pages/AlbumApi"; // Import AlbumApi component

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
        <Route path="/ServerApi" element={<ServerApi />} />{" "}
        {/* Add route for ServerApi */}
        <Route path="/ServerApi/user/:id" element={<UserDetail />} />
        {/* Add route for UserDetail */}
        <Route path="/alarms" element={<Alarms />} />
        <Route path="/sample" element={<SamplePage />} />
        {/* Add route for SamplePage */}
        <Route path="/layout" element={<Layout />} />
        {/* Add route for Layout */}
        <Route path="/home" element={<Home />} />
        {/* Add route for Home */}
        <Route path="/home/CardDetail" element={<CardDetail />} />
        {/* Add route for CardDetail */}
        <Route path="/todoapi" element={<TodoApi />} />
        {/* Add route for TodoApi */}
        <Route path="/albumapi" element={<AlbumApi />} />
        {/* Add route for AlbumApi */}
      </Routes>
    </Router>
  );
}

export default AppRouter;
