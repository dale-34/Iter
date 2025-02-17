import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from "../components/header";
//import './LandingPage.css';  // Import a specific CSS file for the landing page styles

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header>
        {/* Add your header content here */}
        <h1>Welcome to Our Website</h1>
      </header>

      <main>
        <div className="left-text">
          {/* Add your left text content here */}
          <p>Explore amazing things on our platform. Join now and start your journey!</p>
        </div>

        <div className="right-globe">
          {/* Add your spinning globe here */}
          {/* You can use a 3D model, GIF, or implement a CSS animation for the globe */}
          <img src="globe.gif" alt="Spinning Globe" className="globe" />
        </div>

        <div className="buttons">
          {/* Add your buttons here */}
          <button onClick={handleNavigate}>Button 1</button>          
          <button>Button 2</button>
          <button>Button 3</button>
        </div>
      </main>

      <footer>
        {/* Add your footer content here */}
        <p>© 2025 Your Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
