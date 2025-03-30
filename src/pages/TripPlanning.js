import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/header";
import { CalendarComponent } from "../components/calendar";
import { BudgetSlider } from "../components/budgetSlider";
import { HousingAccommodations } from "../components/housingAccomdations";
import { Transportation } from "../components/Transportation";
import { Destinations } from "../components/Destinations";
import "../css/TripPlanning.css";

const TripPlanning = () => {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [accommodation, setAccommodation] = useState("");
  const [transport, setTransport] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState([]);
  const [endLocation, setEndLocation] = useState("");

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleSubmit = () => {
    if (
      !startDate ||
      !endDate ||
      !accommodation ||
      !transport ||
      !startLocation.trim()
    ) {
      alert("Please complete all required fields, including your starting location.");
      return;
    }

    if (destination.length === 0) {
      alert("Please choose at least one destination.");
      return;
    }

    const choseCustomPlace = destination.includes("I have a place in mind");
    const choseOtherDestinations = destination.some(
      (dest) => dest !== "I have a place in mind"
    );

    if (!choseOtherDestinations && choseCustomPlace && !endLocation.trim()) {
      alert("Please enter your specific destination.");
      return;
    }

    navigate("/LoadingPage", {
      state: {
        startDate,
        endDate,
        budget,
        accommodation,
        transport,
        startLocation,
        destination,
        endLocation: choseCustomPlace ? endLocation : "",
      },
    });
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
          <h2 className="calendarTitle">What dates do you plan on traveling?</h2>
          <p className="calendarSubtitle">
            Select the dates which you want to travel during.
          </p>
          <CalendarComponent onDateChange={handleDateChange} />
        </div>

        <div className="budget">
          <h2 className="budgetTitle">What is your budget for this trip?</h2>
          <p className="budgetSubtitle">
            Designate the minimum and maximum amounts you want to spend on this trip.
          </p>
          <BudgetSlider onBudgetChange={setBudget} />
        </div>

        <div className="transportation">
          <Transportation
            onTransportChange={setTransport}
            onStartLocationChange={setStartLocation}
            startLocation={startLocation}
          />
        </div>

        <div className="destinations">
          <Destinations onDestinationChange={setDestination} />
        </div>

        {destination.includes("I have a place in mind") && (
          <div className="specific-destination">
            <label htmlFor="end-location" className="block font-semibold mb-1 mt-4">
              Enter your specific destination:
            </label>
            <input
              type="text"
              id="end-location"
              placeholder="Ex: Paris, France"
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)}
              className="w-4/5 p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        )}

        {/* ⬇️ Moved Housing section to the bottom ⬇️ */}
        <div className="question-container mt-6">
          <HousingAccommodations onHousingChange={setAccommodation} />
        </div>

        <div className="submit mt-6">
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
