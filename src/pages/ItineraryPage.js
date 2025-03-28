import React from "react";
import { Header } from "../components/header";
import { useLocation } from "react-router-dom";
import Recap from "../components/Recap";
import Flights from "../components/Flights";
import ActivityCarousel from "../components/activityCarousel";
import FoodCarousel from "../components/foodCarousel";
import DayCard from "../components/DayCard";
import '../css/ItineraryPage.css';

const generateDayList = (startDate, endDate) => {
    const dayList = [];

    const start = new Date(startDate);
    const end = new Date(endDate);

    let currentDate = new Date(start);
    while (currentDate <= end) {
        dayList.push(new Date(currentDate));  // Push each day to the list
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    return dayList;
};

function ItineraryPage() {
    const location = useLocation();
    const { vacationPlan } = location.state || {};
    const { startDate, endDate } = location.state || {};
    const dayList = generateDayList(startDate, endDate);

    return (
        <div className="itinerary-wrapper">
            <Header />

            <div className="trip-title">
                <h1>New York Trip 2025</h1>
            </div>

            <div className="itinerary-content">
                {/* <div className="vacation-plan">
                    <h3>Your Vacation Plan:</h3>
                    {vacationPlan ? <p>{vacationPlan}</p> : <p>No vacation plan available. Please go back and create one.</p>}
                </div> */}

                <Recap />
                <Flights />
                <div className="day-list">
                    {dayList.map((day, index) => (
                        <DayCard
                            key={index} 
                            dayNumber={index + 1} 
                            date={day.toLocaleDateString()}  // Format the date to a readable string
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ItineraryPage;
