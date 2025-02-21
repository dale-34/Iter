import React from 'react';
import { Header } from '../components/header';
import './TripPlanning.css';
import './LoadingPage.css';
import { CalendarComponent } from '../components/calendar';
import { BudgetSlider } from '../components/budgetSlider';
import { HousingAccommodations } from '../components/housingAccomdations';
import { Transportation } from '../components/Transportation';
import { Destinations } from '../components/Destinations';
import { useNavigate } from 'react-router-dom';


const TripPlanning = () => {
    const navigate = useNavigate();
    const goToLoadingPage = () => {
        navigate('/LoadingPage');
    }

    return (
    <div className="trip-planning container">
        <Header />
        <div className="surveyIntro">
            <h1 className="surveyTitle">Before we begin, tell us: </h1>
        </div>
        <div className="calendar">
            <h2 className="calendarTitle">What dates do you plan on travelling?</h2>
            <p className="calendarSubtitle">Select the dates which you want to travel during.</p>
            <CalendarComponent />
        </div>
        <div className="budget">
            <h2 className="budgetTitle">What is your budget for this trip?</h2>
            <p className="budgetSubtitle">Designate the minimum and maximum amounts you want to spend on this trip.</p>
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
    <div className="submit">
        <button 
            onClick={goToLoadingPage}
            className="bg-[rgba(221,190,169,1)] cursor-pointer transition-transform hover:scale-105 duration-[0.2s] whitespace-nowrap px-6 py-[13px] rounded-xl font-bold max-sm:text-center max-sm:px-5 max-sm:py-3"
            aria-label="Submit Form"
      >
        Submit
      </button>
    </div>
    </div>
    

  );
};

export default TripPlanning;
