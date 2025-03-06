import React from "react";
import "../css/header.css";

export const Header = () => {
  return (
    <header className="header">
      <nav className="header-nav">
        <h1 className="header-title">
          <a href="/HomePage" className="header-link">Iter</a>
          <a href= "/ItineraryPage" className="header-link"></a>

        </h1>
      </nav>
    </header>
  );
};