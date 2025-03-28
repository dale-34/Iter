import { Header } from "../components/header";
import "../css/TripPlanning.css";
import { CalendarComponent } from "../components/calendar";
import { BudgetSlider } from "../components/budgetSlider";
import { HousingAccommodations } from "../components/housingAccomdations";
import { Transportation } from "../components/Transportation";
import { Destinations } from "../components/Destinations";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";


const TripPlanning = () => {
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [budget, setBudget] = useState("");
    const [accommodation, setAccommodation] = useState("");
    const [transport, setTransport] = useState("");
    const [destination, setDestination] = useState([]);
    const [startLocation, setStartLocation] = useState("");

    const handleDateChange = (start, end) => {
        setStartDate(start);
        setEndDate(end);
    };

    const handleBudgetChange = (budgetRange) => {
        setBudget(budgetRange);
    };

    const handleHousing = (housing) => {
        setAccommodation(housing);
    };

    const handleTransport = (transportData) => {
        setTransport(transportData);
    };

    const handleDestination = (destinationLoc) => {
        setDestination(destinationLoc);
    };

    const handleStartLocation = (startLocation) => {
        setStartLocation(startLocation);
    };

    const handleSubmit = () => {
        navigate("/LoadingPage", {
            state: {
                startDate,
                endDate,
                budget,
                accommodation,
                transport,
                destination,
            },
        });
        // navigate("/ItineraryPage", {
        //     state: {
        //         startDate,
        //         endDate
        //     },
        // });
    };

    return (
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
                        What dates do you plan on traveling?
                    </h2>
                    <p className="calendarSubtitle">
                        Select the dates which you want to travel during.
                    </p>
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
                    <BudgetSlider onBudgetChange={handleBudgetChange} />
                </div>
                <div className="question-container">
                    <HousingAccommodations onHousingChange={handleHousing} />
                </div>
                <div className="transportation">
                    <Transportation onTransportChange={handleTransport} />
                </div>
                <div className="destinations">
                    <Destinations onDestinationChange={handleDestination} />
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
        </div>
    );
};

export default TripPlanning;
