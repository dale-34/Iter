import React from "react";
import { ActionButtons } from "./buttons/actionButtons";
import "../css/homeHero.css";

export const HomeHero = () => {
  return (
    <main className="home-hero">
      {/* Left Section: Text and Buttons */}
      <section className="home-hero-text">
        <h2 className="home-hero-title">
          <span>Begin Your</span>
          <br />
          <span>Adventure Today</span>
        </h2>
        <ActionButtons />
      </section>

      {/* Right Section: Globe */}
      <section className="home-hero-globe">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7f/Rotating_earth_animated_transparent.gif"
          alt="Earth"
          loading="lazy"
        />
      </section>
    </main>
  );
};
