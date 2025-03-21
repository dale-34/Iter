import React from "react";
import "../css/Recap.css";

const Recap = () => {
    return (
        <div className="recap-container">
            <h2 className="section-title">Overview</h2>
            <div className="recap-card">
                <p><strong>Destination:</strong> </p>
                <p><strong>Dates:</strong> </p>
                <p><strong>Budget:</strong> </p>
                <p><strong>Accommodation:</strong> </p>
                <p><strong>Weather:</strong> </p>
                <p><strong>Activities:</strong> </p>
            </div>
        </div>
    );
};

export default Recap;
