import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/actionButtons.css";

export const ActionButtons = () => {
  const navigate = useNavigate();

  const goToTripPlanning = () => {
    navigate('/TripPlanning');
  };
  
  const goToSurpriseMe = async () => {
    navigate("/LoadingPage", { state: { surpriseMode: true } });
  };

  return (
    <div className="action-buttons">
      <button 
        onClick={goToTripPlanning}
        className="action-button"
        aria-label="Start planning your journey"
      >
        Start Planning
      </button>

      <button 
        onClick={goToSurpriseMe}
        className="action-button"
        aria-label="Get a random destination suggestion"
      >
        Surprise Me
      </button>
    </div>
  );
};
