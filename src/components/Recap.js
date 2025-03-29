import React from "react";
import "../css/Recap.css";

const Recap = ({ vacationPlan = [], startDate, endDate, destination, budget }) => {
    return (
        <div className="recap-container">
            <h2 className="section-title">Overview</h2>
            <div className="recap-card">
                <p><strong>Destination:</strong> {destination}</p>
                <p><strong>Dates:</strong> {startDate} - {endDate}</p>
                <p><strong>Budget:</strong> {budget}</p>
                <p><strong>Weather:</strong> {vacationPlan.vacation.climate} </p>
            </div>
        </div>
    );
};

export default Recap;
