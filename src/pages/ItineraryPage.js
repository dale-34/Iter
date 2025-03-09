import React from "react";
import { Header } from "../components/header";
import { useLocation } from "react-router-dom";
import Recap from "../components/Recap";
import Flights from "../components/Flights";
import ActivityCarousel from "../components/activityCarousel";
import FoodCarousel from "../components/foodCarousel";
import '../css/ItineraryPage.css';

function ItineraryPage() {
    const location = useLocation();
    const { vacationPlan } = location.state || {};

    return (
        <div className="itinerary-wrapper">
            {/* Keep the header consistent */}
            <Header />

            {/* Trip Name Centered Below Header */}
            <div className="trip-title">
                <h1>Costa Rica Trip 2025</h1>
            </div>

            {/* Content Wrapper to Avoid Header Issues */}
            <div className="itinerary-content">
                <div className="vacation-plan">
                    <h3>Your Vacation Plan:</h3>
                    {vacationPlan ? <p>{vacationPlan}</p> : <p>No vacation plan available. Please go back and create one.</p>}
                </div>

                {/* Recap Section */}
                <Recap />

                {/* Flights Section */}
                <Flights />
        <div className='activity-carousel'>
            <ActivityCarousel />
        </div>
        <div className='food-carousel'>
            <FoodCarousel />
        </div>    
        </div>
        </div>
    );
}

export default ItineraryPage;
