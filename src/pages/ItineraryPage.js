import React, { useState } from "react";
import { Header } from "../components/header";
import { useLocation } from "react-router-dom";
import { Destinations } from "../components/Destinations";
import TripPlanning from "./TripPlanning";

function ItineraryPage() {
    const location = useLocation();
    const { vacationPlan } = location.state || {};
    return (
        <div>
            <div className="header">
                <Header />
            </div>
            <div>
                <h3>Your Vacation Plan:</h3>
                {vacationPlan ? (
                    <p>{vacationPlan}</p>
                ) : (
                    <p>
                        No vacation plan available. Please go back and create
                        one.
                    </p>
                )}
            </div>
        </div>
    );
}

export default ItineraryPage;
