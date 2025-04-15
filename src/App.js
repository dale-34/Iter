import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/homePage.js";
import TripPlanning from "./pages/TripPlanning.js";
import LoadingPage from "./pages/LoadingPage.js";
import ItineraryPage from "./pages/ItineraryPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import TestLoginPage from "./pages/TestLoginPage.js";
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/TripPlanning" element={<TripPlanning />} />
        <Route path="/LoadingPage" element={<LoadingPage />} />
        <Route path="/ItineraryPage" element={<ItineraryPage />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/TestLoginPage" element={<TestLoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
