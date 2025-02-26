// Import any necessary dependencies
import React from 'react';
import { Header } from '../components/header';
import ActivityCard from '../components/activityCard';
import './ItineraryPage.css';

// Define the LoadingPage component
const ItineraryPage = () => {
    return (
        <div>
        <div className="header">
            <Header />
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

// Export the ItineraryPage component
export default ItineraryPage;
