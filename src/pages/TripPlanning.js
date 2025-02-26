<<<<<<< Updated upstream
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
=======
import { Header } from "../components/header";
import "../css/TripPlanning.css";
import { CalendarComponent } from "../components/calendar";
import { BudgetSlider } from "../components/budgetSlider";
import { HousingAccommodations } from "../components/housingAccomdations";
import { Transportation } from "../components/Transportation";
import { Destinations } from "../components/Destinations";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
>>>>>>> Stashed changes


const TripPlanning = () => {
    const navigate = useNavigate();
    // const goToLoadingPage = () => {
    //     navigate("/LoadingPage");
    // };

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    // const [destinations, setDestinations] = useState([]);
    const [vacationPlan, setVacationPlan] = useState("");

    const handleDateChange = (start, end) => {
        setStartDate(start);
        setEndDate(end);
    };

    // const handleDestination = (destination) => {
    //   if (destination.trim() && !destinations.includes(destination)) {
    //       setDestinations([...destinations, destination.trim()]);
    //   }
    // };

    const handleSubmit = async () => {
        const vacation = await generateVacation();
        navigate("/ItineraryPage", { state: { vacationPlan: vacation } });
    };

    const generateVacation = async () => {
        console.log("Generating...");
        try {
            console.log(startDate, endDate);
            const response = await fetch(
                "http://localhost:3000/generate-vacation",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        startDate,
                        endDate,
                    }),
                }
            );

            const data = await response.json();
            setVacationPlan(data.vacation);
            return data.vacation;
        } catch (error) {
            const errorMessage = "Error generating vacation";
            setVacationPlan("Failed to get vacation plan.");
            console.log(error);
            return errorMessage;
        }
    };

    return (
<<<<<<< Updated upstream
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
            <h2 className="budgetTitle" justifyContent="center"
            >What is your budget for this trip?</h2>
            <p className="budgetSubtitle">Designate the minimum and maximum amounts you want to spend on this trip.</p>
            <BudgetSlider />
=======
        <div>
            <div className="header-container">
                <Header />
            </div>
            <div className="trip-planning container">
                <div className="surveyIntro">
                    <h1 className="surveyTitle">Before we begin, tell us: </h1>
                </div>
                <div className="calendar">
                    <h2 className="calendarTitle">
                        What dates do you plan on travelling?
                    </h2>
                    <p className="calendarSubtitle">
                        Select the dates which you want to travel during.
                        
                    </p>
                    <button onClick={() => handleDateChange("2025-03-01", "2025-03-10")}>
    Test Date Change
</button>
                    <CalendarComponent onDateChange={handleDateChange} />
                </div>
                <div className="budget">
                    <h2 className="budgetTitle" justifyContent="center">
                        What is your budget for this trip?
                    </h2>
                    <p className="budgetSubtitle">
                        Designate the minimum and maximum amounts you want to
                        spend on this trip.
                    </p>
                    <BudgetSlider />
                </div>
                <div className="question-container">
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
                        onClick={handleSubmit}
                        className="bg-[rgba(221,190,169,1)] cursor-pointer transition-transform hover:scale-105 duration-[0.2s] whitespace-nowrap px-6 py-[13px] rounded-xl font-bold max-sm:text-center max-sm:px-5 max-sm:py-3"
                        aria-label="Submit Form"
                    >
                        Submit
                    </button>
                </div>
            </div>
>>>>>>> Stashed changes
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
