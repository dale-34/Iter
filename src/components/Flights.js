import React from "react";
import "../css/Flights.css";

const Flights = ({ flights = [], hotels = [] }) => {
    return (
        <div className="flights-container">
            <h1 className="section-title">Reservations</h1>
            <div className="reservation-card">
            <h2 className="section-title"> 
                {flights.length === 0 ? (
                    <p>Transportation</p>
                ) : (
                    flights[0]?.type === "car_rental"
                        ? "Car Rental"
                        : flights[0]?.type === "flight"
                        ? "Flight"
                        : flights[0]?.type === "train"
                        ? "Train"
                        : flights[0]?.type || "Transportation"
                )}
            </h2>

            <div className="flights-card">
                {(!flights || flights.length === 0) && (
                    <p>No transportation available.</p>
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
            <h2 className="section-title"> 
                {hotels.length === 0 ? (
                    <p>Accommodations</p>
                ) : (
                    hotels[0]?.type === "hotel"
                        ? "Hotel"
                        : hotels[0]?.type?.toLowerCase() === "airbnb"
                        ? "AirBnB"
                        : hotels[0]?.type === "motel"
                        ? "Motel"
                        : hotels[0]?.type || "Accommodations"
                )}
            </h2>

            <div className="flights-card">
                {(!hotels || hotels.length === 0) && (
                    <p>No accomodations populated.</p>
                )}
                {hotels.map((hotel, index) => (
                    <div key={index} className="hotel">
                        <h3>{hotel.name}</h3>
                        <p>{hotel.description}</p>
                        <p>Cost: {hotel.estimated_cost}</p>
                        <a href={hotel.reservation_link} target="_blank" rel="noopener noreferrer">
                            Book Now
                        </a>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
};

export default Flights;
