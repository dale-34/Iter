import React from "react";
import "../css/Recap.css";

const Recap = ({ vacationPlan = [], startDate, endDate, destination, budget, startLocation }) => {
    return (
        <div className="recap-container">
            <h2 className="section-title">Overview</h2>
            <div className="recap-card">
                <div className="recap-text">
                    <p><strong>Start Destination:</strong> {startLocation}</p>
                    <p><strong>End Destination:</strong> {destination}</p>
                    <p><strong>Dates:</strong> 
                        {(startDate.toISOString().split("T")[0] === "2099-12-31" || endDate.toISOString().split("T")[0] === "2099-12-31") 
                        ? " Whenever you want" 
                        : ` ${startDate.toDateString()} - ${endDate.toDateString()}`}
                    </p>
                    <p><strong>Budget:</strong> ${parseInt(budget[0])} - ${parseInt(budget[1])}</p>
                    <p><strong>Weather:</strong> {vacationPlan.vacation.climate} </p>
                </div>
                <div className="trip-picture">
                    <img src="/images/roadtrip.jpg" alt="Road trip" />
                </div>
            </div>
            
        </div>
    );
};

export default Recap;