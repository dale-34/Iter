import React from "react";
import "../css/Flights.css";

const Flights = ({ flights = [] }) => {
    return (
        <div className="flights-container">
            <h2 className="section-title">Flights</h2>
            <div className="flights-card">
                {(!flights || flights.length === 0) && (
                    <p>No flights available.</p>
                )}
                {flights.map((flight, index) => (
                    <div key={index} className="flight">
                        <h3>{flight.name}</h3>
                        <p>{flight.description}</p>
                        <p>Cost: {flight.estimated_cost}</p>
                        <a href={flight.reservation_link} target="_blank" rel="noopener noreferrer">
                            Book Now
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Flights;
