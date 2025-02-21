import React, { useEffect } from 'react';
import { Header } from '../components/header';
import './LoadingPage.css';  // Import the main Loading Page CSS
import { useNavigate } from 'react-router-dom';
import LoadingGlobe from '../components/LoadingGlobe'; // Import the LoadingGlobe component

const LoadingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timeout to navigate to the next page after 5 seconds
    const timer = setTimeout(() => {
      navigate('/ItineraryPage'); // Change '/NextPage' to the correct path for the next page
    }, 10000);  // Adjusted to 5 seconds for demo

    // Cleanup the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="loading-container"> {/* Single Parent Element */}
      <div className="header">
        <Header />
      </div>
      <div className="loading-content">
        {/* Use the separate LoadingGlobe component */}
        <LoadingGlobe />
        <p className="loading-text">Curating your dream vacation...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
