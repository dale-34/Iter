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
        <div className="surveyIntro">
            <h1 className="surveyTitle">Before we begin, let us know: </h1>
        </div>
        <div className="calendar">
            <h2 className="calendarTitle">What dates do you plan on travelling?</h2>
            <p className="calendarSubtitle">Select the dates which you will be travelling on, with dates either certain or optional.</p>
            <CalendarComponent />
        </div>
        <div className="budget">
            <h2 className="budgetTitle">What is your budget for this trip?</h2>
            <p className="budgetSubtitle">Designate the minimum and maximum amounts you're willing to spend on this trip.</p>
            <BudgetSlider />
        </div>
        <div className="housing">
            <HousingAccommodations />
    </div>
    <div className="transportation">
        <Transportation />
    </div> 
    <div className="destinations">
        <Destinations />
    </div>
    </div>
    

  );
};

export default TripPlanning;
