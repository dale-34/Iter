import React from "react";
import "../css/Flights.css";

const Flights = () => {
    return (
        <div className="flights-container">
            <h2 className="section-title">Flights</h2>
            <div className="flights-card">
                <p><strong>Departure:</strong> </p>
                <p><strong>Return:</strong> </p>
                <p><strong>Airline:</strong> </p>
                <p><strong>Estimated Cost:</strong> </p>
                <p><strong>Flight Duration:</strong>  </p>
                <p><strong>Baggage:</strong> </p>
            </div>
        </div>
    );
};

export default Flights;
