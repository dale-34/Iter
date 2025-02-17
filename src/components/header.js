import React from "react";
import "./header.css";

export const Header = () => {
  return (
    <header className="header">
      <nav className="max-w-[1168px] mx-auto">
        <h1 className="header-title">
          <a href="/HomePage" className="header-link">Iter</a>
        </h1>
      </nav>
    </header>
  );
};