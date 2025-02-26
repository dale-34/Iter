import React from 'react';
import '../css/LoadingGlobe.css';  // Import the CSS file for the specific styles

const LoadingGlobe = () => {
  return (
    <div className="loading-globe">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/7f/Rotating_earth_animated_transparent.gif"
        alt="Rotating Earth"
        loading="lazy"
      />
    </div>
  );
};

export default LoadingGlobe;