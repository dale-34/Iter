import React from "react";
import { useState } from "react";
import { Header } from "../components/header";
import { useLocation } from "react-router-dom";
import Recap from "../components/Recap";
import Flights from "../components/Flights";
import DayCard from "../components/DayCard";
import '../css/ItineraryPage.css';

function ItineraryPage() {
    const location = useLocation();
    const { startDate, endDate, budget, destination } = location.state;
    console.log(location.state);
    const [vacationPlan] = useState({   
    "accomodations": {
      "reservations": [
        {
          "name": "The New Yorker, A Wyndham Hotel",
          "type": "hotel",
          "estimated_cost": "$600",
          "description": "Centrally located hotel near Times Square offering comfortable rooms and great amenities.",
          "reservation_link": "https://www.wyndhamhotels.com/wyndham/the-new-yorker-a-wyndham-hotel"
        }
      ],
      "transportation": [
        {
          "name": "Delta Airlines",
          "type": "flight",
          "estimated_cost": "$300",
          "description": "Round trip flight from Gainesville to New York City.",
          "reservation_link": "https://www.delta.com/"
        }
      ]
    },
    "vacation": {
      "climate": "March in New York City is generally cool, with temperatures ranging from 40°F to 55°F. Layered clothing recommended.",
      "day1": {
        "day_description": "Arrive in New York City and explore Times Square and Central Park.",
        "activities": [
          {
            "type": "food",
            "title": "Katz's Delicatessen",
            "description": "Famous deli known for its pastrami sandwiches.",
            "cost": 20,
            "day": 1,
            "relevant_link": "https://www.katzsdelicatessen.com/"
          },
          {
            "type": "food",
            "title": "Shake Shack",
            "description": "Popular fast-casual burger chain with delicious shakes.",
            "cost": 15,
            "day": 1,
            "relevant_link": "https://www.shakeshack.com/"
          },
          {
            "type": "activity",
            "title": "Visit Central Park",
            "description": "Stroll through the iconic park known for its natural beauty.",
            "cost": 0,
            "day": 1,
            "relevant_link": "https://www.centralparknyc.org/"
          },
          {
            "type": "activity",
            "title": "Explore Times Square",
            "description": "Experience the bright lights and hustle of New York's most famous square.",
            "cost": 0,
            "day": 1,
            "relevant_link": "https://www.timessquarenyc.org/"
          }
        ]
      },
      "day2": {
        "day_description": "Visit the Statue of Liberty and explore the 9/11 Memorial.",
        "activities": [
          {
            "type": "food",
            "title": "Grimaldi's Pizzeria",
            "description": "Famous for their coal-fired pizzas.",
            "cost": 25,
            "day": 2,
            "relevant_link": "http://www.grimaldis.pizza/"
          },
          {
            "type": "food",
            "title": "Eataly NYC Downtown",
            "description": "Italian market and dining experience with fresh food essentials.",
            "cost": 30,
            "day": 2,
            "relevant_link": "https://www.eataly.com/us_en/stores/new-york-downtown/"
          },
          {
            "type": "activity",
            "title": "Statue of Liberty Tour",
            "description": "Visit the iconic statue and learn about its history.",
            "cost": 23.5,
            "day": 2,
            "relevant_link": "https://www.statuereservations.com/"
          },
          {
            "type": "activity",
            "title": "9/11 Memorial & Museum",
            "description": "A moving tribute to the lives lost on September 11, 2001.",
            "cost": 28,
            "day": 2,
            "relevant_link": "https://www.911memorial.org/"
          }
        ]
      },
      "day3": {
        "day_description": "Explore the Metropolitan Museum of Art and enjoy a Broadway show.",
        "activities": [
          {
            "type": "food",
            "title": "Café Sabarsky",
            "description": "Viennese café with a stunning ambiance and delicious pastries.",
            "cost": 35,
            "day": 3,
            "relevant_link": "https://www.neuegalerie.org/cafe-sabarsky/"
          },
          {
            "type": "food",
            "title": "Joe's Pizza",
            "description": "Renowned spot for classic New York-style pizza.",
            "cost": 3,
            "day": 3,
            "relevant_link": "https://www.joespizza.com/"
          },
          {
            "type": "activity",
            "title": "Metropolitan Museum of Art",
            "description": "One of the largest and most prestigious art museums in the world.",
            "cost": 25,
            "day": 3,
            "relevant_link": "https://www.metmuseum.org/"
          },
          {
            "type": "activity",
            "title": "Broadway Show",
            "description": "Experience the magic of a Broadway musical or play.",
            "cost": 120,
            "day": 3,
            "relevant_link": "https://www.broadway.com/"
          }
        ]
      },
      "day4": {
        "day_description": "Visit the High Line and explore Chelsea Market before departure.",
        "activities": [
          {
            "type": "food",
            "title": "Chelsea Market",
            "description": "Indoor food market with a variety of gourmet vendors.",
            "cost": 20,
            "day": 4,
            "relevant_link": "https://www.chelseamarket.com/"
          },
          {
            "type": "food",
            "title": "Los Tacos No. 1",
            "description": "Famous for authentic Mexican tacos.",
            "cost": 12,
            "day": 4,
            "relevant_link": "https://www.lostacos1.com/"
          },
          {
            "type": "activity",
            "title": "Walk the High Line",
            "description": "An elevated linear park on a former railroad track with gardens and art.",
            "cost": 0,
            "day": 4,
            "relevant_link": "https://www.thehighline.org/"
          },
          {
            "type": "activity",
            "title": "Explore the Whitney Museum",
            "description": "Museum dedicated to 20th- and 21st-century American art.",
            "cost": 25,
            "day": 4,
            "relevant_link": "https://whitney.org/"
          }
        ]
      }
    }
    });

    return (
        <div className="itinerary-wrapper">
            <Header />
            <div className="trip-title">
                <h1>{destination || "No destination provided"}</h1>
            </div>
            <div className="itinerary-content">
                <Recap 
                    vacationPlan={vacationPlan}
                    startDate={startDate}
                    endDate={endDate}
                    destination={destination}
                    budget={budget}
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
                            date.setDate(date.getDate() + index);
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
