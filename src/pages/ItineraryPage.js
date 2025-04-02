import React, { useState, useEffect } from "react";
import { Header } from "../components/header";
import { useLocation } from "react-router-dom";
import Recap from "../components/Recap";
import Flights from "../components/Flights";
import DayCard from "../components/DayCard";
import '../css/ItineraryPage.css';
import axios from "axios";

function ItineraryPage() {
    const location = useLocation();

    const [vacationPlan, setVacationPlan] = useState(null);
    const [userInputs, setUserInputs] = useState([]);

    // Static for testing, needs to be dynamic
    const userId = 1;
    useEffect(() => {
        const retrieveVacation = async () => {
            try {
                const response = await axios.get(`/db/get-vacation/${userId}`);
                
                // Store vacation data in state
                setVacationPlan(response.data.vacationPlan);
                setUserInputs(response.data.userInputs || []);
                console.log("Returned plan");
            } catch (error) {
                console.error("Error fetching vacation plan:", error);
            }
        };

        retrieveVacation();
    }, []); // Empty dependency array ensures this runs only once

    // Prevent rendering if data isn't loaded yet
    if (!userInputs || !vacationPlan) {
        return <div>Loading...</div>;
    }

    const [startDate, endDate, budget, destination, startLocation] = userInputs || ["", "", "", ""]; 
    const startDateFixed =  new Date(startDate);
    const endDateFixed =  new Date(endDate);
    

    return (
        <div className="itinerary-wrapper">
            <Header />
            <div className="trip-title">
                <h1>{destination || "No destination provided"} Trip</h1>
            </div>
            <div className="itinerary-content">
                <Recap 
                    vacationPlan={vacationPlan}
                    startDate={startDateFixed}
                    endDate={endDateFixed}
                    destination={destination}
                    budget={budget}
                    startLocation={startLocation}
                />
                <Flights 
                  flights={vacationPlan?.accomodations?.transportation || []}
                  hotels={vacationPlan?.accomodations?.reservations || []}
                />
                <div className="day-list">
                    {Object.keys(vacationPlan?.vacation || {}).map((day, index) => {
                        const dayData = vacationPlan.vacation[day];
                        if (day.startsWith('day')) {
                            const date = new Date(startDate);
                            date.setDate(date.getDate() + index - 1);
                            return (
                                <DayCard
                                    dayNumber={index}
                                    date={date.toLocaleDateString()}
                                    description={dayData.day_description}
                                    activities={dayData.activities}
                                />
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
        </div>
    );
}

export default ItineraryPage;