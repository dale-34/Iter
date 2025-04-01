import React from "react";
import "../css/header.css";
import { Login } from "./Login";

export const Header = () => {
  return (
    <header className="header">
      <nav className="header-nav">
        <h1 className="header-title">
          <a href="/HomePage" className="header-link">Iter</a>
        </h1>
      </nav>
      <div className="LoginButton">
          <Login />
      </div>
    </header>
  );
};