import React from 'react';
import { Header } from '../components/header';
import './TripPlanning.css';
import { CalendarComponent } from '../components/calendar';
import { BudgetSlider } from '../components/budgetSlider';
import { HousingAccommodations } from '../components/housingAccomdations';
import { Transportation } from '../components/Transportation';
import { Destinations } from '../components/Destinations';

const TripPlanning = () => {
  return (
    <div className="trip-planning container">
        <Header />
        
        <h1 className="surveyTitle">Before we begin, let us know:</h1>

        {/* Calendar Section */}
        <div className="question-container">
            <h2 className="question-title">What dates do you plan on traveling?</h2>
            <p className="question-subtitle">Select the dates you will be travelling on, with either fixed or flexible dates.</p>
            <CalendarComponent />
        </div>

        {/* Budget Section */}
        <div className="question-container">
            <h2 className="question-title">What is your budget for this trip?</h2>
            <p className="question-subtitle">Choose the minimum and maximum amounts you're willing to spend.</p>
            <BudgetSlider />
        </div>

        {/* Housing Section */}
        <div className="question-container">
            <HousingAccommodations />
        </div>

        {/* Transportation Section */}
        <div className="question-container">
            <Transportation />
        </div>

        {/* Destinations Section */}
        <div className="question-container">
            <h2 className="question-title">Where would you like to go?</h2>
            <Destinations />
        </div>
    </div>
  );
};

export default TripPlanning;
