import React, { useState } from "react";
import { Header } from "../components/header";
import { useLocation } from "react-router-dom";
import ActivityCard from '../components/activityCard';
import '../css/ItineraryPage.css';

function ItineraryPage() {
    const location = useLocation();
    const { vacationPlan } = location.state || {};
    return (
        <div>
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
        <div className='trip-name'>
            <h1>Costa Rica Trip 2025</h1>
        </div>
        <div className='recap-container'>
            <h2>Recap</h2>
            <p>Recap of the information for trip</p>
        </div>
        <div className='flights-container'>
            <h2>Flight Information</h2>
            <p>Possible flights to be booked</p>
        </div>
        <div className='activity-container'>
            <h2>Activities and Excursions</h2>
            <ActivityCard />
        </div>
        <div className='food-container'>
            <h2>Food Options</h2>
            <ActivityCard />
        </div>
        </div>
    );
}

export default ItineraryPage;
