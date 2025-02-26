import React, { useEffect } from 'react';
import { Header } from '../components/header';
import '../css/LoadingPage.css';  // Import the main Loading Page CSS
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingGlobe from '../components/LoadingGlobe'; // Import the LoadingGlobe component

const LoadingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // const { vacationPlan } = location.state || {};

  useEffect(() => {
    const { startDate, endDate, budget, accommodation, transport, destination } = location.state;
    
    const generateVacation = async () => {
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
        // Navigate to ItineraryPage once the plan is generated
        navigate("/ItineraryPage", { state: { vacationPlan: data.vacation } });
      } catch (error) {
        console.error("Error generating vacation:", error);
        // Optionally handle the error by showing an error message or navigating elsewhere
      }
    };
    generateVacation();
    // Set a timeout to navigate to the next page after 5 seconds
    // const timer = setTimeout(() => {
    //   navigate("/ItineraryPage", { state: { vacationPlan } }); // Change '/NextPage' to the correct path for the next page
    // }, 10000);  // Adjusted to 5 seconds for demo

    // // Cleanup the timer when the component is unmounted
    // return () => clearTimeout(timer);
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
