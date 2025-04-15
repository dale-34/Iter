import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/header";
import { CalendarComponent } from "../components/calendar";
import { BudgetSlider } from "../components/budgetSlider";
import { HousingAccommodations } from "../components/housingAccomdations";
import { Transportation } from "../components/Transportation";
import { Destinations } from "../components/Destinations";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
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

  const [errors, setErrors] = useState({
    startDate: false,
    endDate: false,
    budget: false,
    accommodation: false,
    transport: false,
    startLocation: false,
    destination: false,
    endLocation: false,
  });

  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleSubmit = () => {
    const choseCustomPlace = destination.includes("I have a place in mind");
    const choseOtherDestinations = destination.some((dest) => dest !== "I have a place in mind");

    const newErrors = {
      startDate: !startDate,
      endDate: !endDate,
      budget: !budget,
      accommodation: !accommodation,
      transport: !transport,
      startLocation: !startLocation.trim(),
      destination: destination.length === 0,
      endLocation: choseCustomPlace && !choseOtherDestinations && !endLocation.trim(),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      setErrorDialogOpen(true);
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
    <div className="overflow-y-auto max-h-screen">
      <div className="header-container">
        <Header />
      </div>

      <div className="trip-planning container pb-10">
        <div className="surveyIntro">
          <h1 className="surveyTitle">Answer a few questions, and we'll take it from there.</h1>
        </div>

        {/* Calendar Section */}
        <div
          className="calendar mb-6"
          style={
            errors.startDate || errors.endDate
              ? { border: "4px solid red", borderRadius: "20px" }
              : {}
          }
        >
          <h2 className="calendarTitle">What dates do you plan on traveling?</h2>
          <p className="calendarSubtitle">Select the dates which you want to travel during.</p>
          <CalendarComponent onDateChange={handleDateChange} />
          {errors.startDate && <p className="warning-text">*Start date is required*</p>}
          {errors.endDate && <p className="warning-text">*End date is required*</p>}
        </div>

        {/* Budget Section */}
        <div
          className="budget mb-6"
          style={{
            backgroundColor: "#8ac6d1",
            border: errors.budget ? "4px solid red" : "none",
            borderRadius: "20px",
            margin: "50px 200px",
          }}
        >
          <h2 className="budgetTitle">What is your budget for this trip?</h2>
          <p className="budgetSubtitle">Designate the minimum and maximum amounts you want to spend on this trip.</p>
          <BudgetSlider onBudgetChange={setBudget} />
          {errors.budget && <p className="warning-text">Budget minimum and maximum is required.</p>}
        </div>

        {/* Transportation Section */}
        <div
          className="transportation mb-6"
          style={
            errors.transport || errors.startLocation
              ? { border: "4px solid red", borderRadius: "20px" }
              : {}
          }
        >
          <Transportation
            onTransportChange={setTransport}
            onStartLocationChange={setStartLocation}
            startLocation={startLocation}
          />
          {errors.startLocation && <p className="warning-text">*Starting location is required*</p>}
          {errors.transport && <p className="warning-text">*Transportation choice is required*</p>}
        </div>

        {/* Destinations Section */}
        <div
          className="destinations mb-6"
          style={{
            backgroundColor: "red",
            border: errors.destination || errors.endLocation ? "4px solid red" : "none",
            borderRadius: "20px",
            margin: "50px 200px",
          }}
        >
          <Destinations onDestinationChange={setDestination} />
          {errors.destination && (
            <p className="warning-text">Please choose at least one destination.</p>
          )}

          {destination.includes("I have a place in mind") && (
            <div className="specific-destination mt-4">
              <label htmlFor="end-location" className="block font-semibold mb-1">
                Enter your specific destination:
              </label>
              <input
                type="text"
                id="end-location"
                placeholder="Ex: Paris, France"
                value={endLocation}
                onChange={(e) => setEndLocation(e.target.value)}
                className={`w-4/5 p-2 border rounded-md shadow-sm ${
                  errors.endLocation ? "border-yellow-400" : "border-gray-300"
                }`}
              />
              {errors.endLocation && (
                <p className="text-red-500 text-sm mt-1">End destination is required.</p>
              )}
            </div>
          )}
        </div>

        {/* Housing Section */}
        <div
          className="accommodations mb-6"
          style={{
            backgroundColor: "#7ab3ad",
            border: errors.accommodation ? "4px solid red" : "none",
            borderRadius: "20px",
            margin: "50px 200px",
          }}
        >
          <HousingAccommodations onHousingChange={setAccommodation} />
          {errors.accommodation && (<p className="warning-text">*Housing accomodation choice is required*</p>)}
        </div>

        {/* Submit Button */}
        <div className="submit mt-6 text-center">
          <button
            onClick={handleSubmit}
            className="bg-[rgba(221,190,169,1)] cursor-pointer transition-transform hover:scale-105 duration-200 whitespace-nowrap px-6 py-[13px] rounded-xl font-bold max-sm:px-5 max-sm:py-3"
            aria-label="Submit Form"
          >
            Submit
          </button>
        </div>
      </div>

      {/* ❗ Popup Dialog for Errors */}
      <Dialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
        <DialogTitle>Your Trip is Incomplete!</DialogTitle>
        <DialogContent>
          Please complete all required fields before continuing.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setErrorDialogOpen(false)} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TripPlanning;
