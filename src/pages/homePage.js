import React from "react";
import { Header } from "../components/header";
import { HomeHero } from "../components/homeHero";
import "../css/homePage.css";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <Header />
      <HomeHero />
    </div>
  );
};

export default HomePage;