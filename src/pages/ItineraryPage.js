import React from "react";
import { Header } from "../components/header";
import { useLocation } from "react-router-dom";
import Recap from "../components/Recap";
import Flights from "../components/Flights";
import ActivityCarousel from "../components/activityCarousel";
import FoodCarousel from "../components/foodCarousel";
import DayCard from "../components/DayCard";
import '../css/ItineraryPage.css';


// const vacationPlan = {
//     accomodations: {
//         hotel: {
//             type: 'hotel',
//             reservation_link: 'https://www.booking.com/hotel/us/hilton-hawaiian-village-waikiki-beach-resort.html'
//         },
//         flight: {
//             type: 'flight',
//             reservation_link: 'https://www.kayak.com/flights/GNV-HNL/2025-03-07/2025-03-12'
//         },
//         car_rental: {
//             type: 'car_rental',
//             reservation_link: 'https://www.enterprise.com/en/car-rental/locations/us/honolulu-airport.html'
//         }
//     },
//     vacation: {
//         day1: {
//             type: 'entertainment',
//             title: 'Waikiki Beach',
//             description: 'Enjoy a relaxing day on the famous Waikiki Beach, swimming and sunbathing.',
//             cost: 0,
//             day: 1,
//             relevant_link: 'https://hawaii.com/oahu/waikiki-beach/'
//         },
//         day2: {
//             type: 'food',
//             title: "Duke's Waikiki",
//             description: 'Experience iconic Hawaiian dishes and cocktails right by the beach.',
//             cost: 50,
//             day: 2,
//             relevant_link: 'https://www.dukeswaikiki.com/'
//         },
//         day3: {
//             type: 'entertainment',
//             title: 'Diamond Head State Monument',
//             description: 'Hike to the summit of this famous volcanic crater for stunning views of Oahu.',
//             cost: 10,
//             day: 3,
//             relevant_link: 'https://dlnr.hawaii.gov/dsp/parks/oahu/diamond-head-state-monument/'
//         },
//         day4: {
//             type: 'food',
//             title: "Nico's Pier 38",
//             description: 'Enjoy fresh seafood at this local favorite while overlooking the harbor.',
//             cost: 40,
//             day: 4,
//             relevant_link: 'https://nicospier38.com/'
//         },
//         day5: {
//             type: 'entertainment',
//             title: 'Kualoa Ranch',
//             description: 'Take a tour of this famous ranch, featured in many films, and enjoy outdoor activities.',
//             cost: 108,
//             day: 5,
//             relevant_link: 'https://www.kualoa.com/'
//         },
//         day6: {
//             type: 'food',
//             title: 'Rainbow Drive-In',
//             description: 'Grab a plate lunch at this beloved local diner known for its hearty portions.',
//             cost: 15,
//             day: 6,
//             relevant_link: 'http://rainbowdriveinhawaii.com/'
//         }
//     }
// };
// <p1>vacationPlan.accomodations.hotel</p1>



const generateDayList = (startDate, endDate) => {
    const dayList = [];

    const start = new Date(startDate);
    const end = new Date(endDate);

    let currentDate = start;
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
