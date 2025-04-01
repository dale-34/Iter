import axios from "axios";
import React, { useRef, useEffect } from "react";
import { Header } from "../components/header";
import "../css/LoadingPage.css"; 
import { useLocation, useNavigate } from "react-router-dom";
import LoadingGlobe from "../components/LoadingGlobe"; 

const LoadingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    //change back to const after debugging
    let { startDate, endDate, budget, accommodation, transport, destination } = location.state;

    // Because destination was empty:
    if (Array.isArray(destination) && destination.length === 0) {
      destination = "New York";
    }

    const generateVacation = async () => {
      try {
        const response = await axios.post("/openai/generate-vacation", {
          startDate,
          endDate,
          budget,
          accommodation,
          transport,
          destination,
        });

        navigate("/ItineraryPage", { state: { vacationPlan: response.data.vacationPlan } });
      } catch (error) {
        console.error("Error generating vacation:", error);
      }
    };

    generateVacation();
  }, [location.state, navigate]);

  return (
    <div className="loading-container">
      <div className="header">
        <Header />
      </div>
      <div className="loading-content">
        <LoadingGlobe />
        <p className="loading-text">Curating your dream vacation...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
