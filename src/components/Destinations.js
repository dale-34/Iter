import React, { useState } from "react";
import "../css/Destinations.css";
import {SpecificPlaces} from "./specificPlaces.js";

// export const Destinations = ({onDestinationChange}) => {
//     const [destinations, setDestinations] = useState([]);
//     const [input, setInput] = useState("");

//     const addDestination = () => {
//         if (input.trim()) {
//             const updatedDestinations = [...destinations, input.trim()];
//             setDestinations(updatedDestinations);
//             console.log("Selected Date Range: ", updatedDestinations);
//             if (onDestinationChange) {
//                 onDestinationChange(updatedDestinations);
//             }
//             setInput("");
//         }
//     };

export const Destinations = () => {
  const [showSpecificPlaces, setShowSpecificPlaces] = useState(false);

  

  return (
    <div className="destinations">
      {!showSpecificPlaces ? (
        <>
          <h2 className="destinations__title">Where are you looking to go?</h2>

          {/* Continent Selection Grid */}
          <div className="destinations__grid">
            <button className="destinations__continent">North America</button>
            <button className="destinations__continent">Europe</button>
            <button className="destinations__continent">Asia</button>
            <button className="destinations__continent">South America</button>
            <button className="destinations__continent">Africa</button>
            <button className="destinations__continent">Oceania</button>
          </div>

          {/* Filter Buttons */}
          <div className="destinations__filters">
            <button className="destinations__filter">Popular</button>
            <button className="destinations__filter">Tropical</button>
            <button className="destinations__filter">Cityscape</button>
          </div>

          {/* Recommendation Carousel */}
          <h3 className="destinations__carousel-title">Carousel Cards</h3>
          <div className="destinations__carousel">
            <div className="destinations__carousel-card">Recommendation 1</div>
            <div className="destinations__carousel-card">Recommendation 2</div>
            <div className="destinations__carousel-card">Recommendation 3</div>
          </div>

          {/* "I Have a Place in Mind" Button */}
          <button 
            className="destinations__custom-button"
            onClick={() => setShowSpecificPlaces(true)} // Click to show the search box
          >
            I have a place in mind
          </button>
        </>
      ) : (
        <SpecificPlaces onClose={() => setShowSpecificPlaces(false)} />
      )}
    </div>
  );
};
