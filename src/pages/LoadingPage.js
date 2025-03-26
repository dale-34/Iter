import React, { useRef, useEffect } from 'react';
import { Header } from '../components/header';
import '../css/LoadingPage.css';  // Import the main Loading Page CSS
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingGlobe from '../components/LoadingGlobe'; // Import the LoadingGlobe component

const LoadingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasFetched = useRef(false);

  useEffect(() => {
    // Ensure it only generates once
    if (hasFetched.current) return;
    hasFetched.current = true;
    
    const { startDate, endDate, budget, accommodation, transport, destination } = location.state;
    
    const generateVacation = async () => {
      // Send JSON data to OPENAI server
      try {
        const response = await fetch("http://localhost:3000/generate-vacation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            startDate,
            endDate,
            budget,
            accommodation,
            transport,
            destination,
          }),
        });
        const data = await response.json();
        navigate("/ItineraryPage", { state: { vacationPlan: data.vacation } }); // Go to itinerary when plan is generated
      } catch (error) {
        console.error("Error generating vacation:", error);
      }
    };
    generateVacation();
  }, [location.state, navigate]);


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
