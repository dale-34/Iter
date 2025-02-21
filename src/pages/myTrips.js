import React, { useState, useEffect } from 'react';
import './myTrips.css';// Import the CSS file

export const MyTrips = () => {
  const [loading, setLoading] = useState(true);

  // Simulate a loading effect (e.g., fetching itinerary data)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000); // Show loading for 5 seconds
  }, []);

  return (
    <div className="my-trip-container">
      {loading ? (
        <div className="loading-container">
          <img
            src="https://i.giphy.com/media/jAYUbVXgESSti/giphy.gif" // Infinite loading GIF
            alt="Loading..."
            className="loading-spinner"
          />
          <p className="loading-text">Loading your itinerary...</p>
        </div>
      ) : (
        <>
          <h1 className="itinerary-title">Itinerary</h1>
          <p className="itinerary-subtitle">Here is your planned trip schedule.</p>
        </>
      )}
    </div>
  );
};
