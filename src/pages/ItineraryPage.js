import React, { useState, useEffect } from "react";
import { Header } from "../components/header";
import { useLocation } from "react-router-dom";
import Recap from "../components/Recap";
import Flights from "../components/Flights";
import DayCard from "../components/DayCard";
import "../css/ItineraryPage.css";
import axios from "axios";

function ItineraryPage() {
    const location = useLocation();
    console.log("Location state:", location.state); // Ensure this contains tripId
    const { tripId } = location.state || {};
    console.log("TripId:", tripId); // Ensure tripId is not undefined

    const [vacationPlan, setVacationPlan] = useState(null);
    const [userInputs, setUserInputs] = useState([]);

    const handleActivityReplace = (activityId, newActivity) => {
        setVacationPlan(prevPlan => {
            const updatedVacation = { ...prevPlan.vacation };
            Object.keys(updatedVacation).forEach(dayKey => {
                const dayData = updatedVacation[dayKey];
                if (dayData.activities) {
                    dayData.activities = dayData.activities.map(activity =>
                        (activity.id === activityId) ? { ...activity, ...newActivity } : activity
                    );
                }
            });
            return { ...prevPlan, vacation: updatedVacation };
        });
    };

    useEffect(() => {
        const retrieveVacation = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/db/get-vacation/${tripId}`);
                
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

    const [startDate, endDate, budget, destination, startLocation] =
        userInputs || ["", "", "", ""];
    const startDateFixed = new Date(startDate);
    const endDateFixed = new Date(endDate);


    return (
        <div className="itinerary-container">
            <Header />
            <div className="trip-title">
                <h1>{destination || "No destination provided"} Trip</h1>
            </div>
            <div className="itinerary-wrapper">
                <Recap className="recap"
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
                    {Object.keys(vacationPlan?.vacation || {}).map(
                        (day, index) => {
                            const dayData = vacationPlan.vacation[day];
                            if (day.startsWith("day")) {
                                const date = new Date(startDate);
                                date.setDate(date.getDate() + index - 1);
                                return (
                                    <DayCard
                                        dayNumber={index}
                                        date={date.toLocaleDateString()}
                                        description={dayData.day_description}
                                        activities={dayData.activities}
                                        onActivityReplace={handleActivityReplace}
                                    />
                                );
                            }
                            return null;
                        }
                    )}
                </div>
            </div>
        </div>
    );
}

export default ItineraryPage;
