import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/homePage.js";
import TripPlanning from "./pages/TripPlanning.js";
import { MyTrips } from "./pages/myTrips.js";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/TripPlanning" element={<TripPlanning />} />
        <Route path="/my-itinerary" element={<MyTrips />} />
        
      </Routes>
    </Router>
  );
}

export default App;
