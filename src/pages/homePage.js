import React from "react";
import { Header } from "../components/header";
import { HomeHero } from "../components/homeHero";

const HomePage = () => {
  return (
    <div className="bg-[rgba(255,232,214,0.26)] flex flex-col overflow-hidden min-h-screen pb-[114px]">
      <Header />
      <HomeHero />
    </div>
  );
};

export default HomePage;