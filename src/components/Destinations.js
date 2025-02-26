import React, { useState } from "react";

export const Destinations = ({onDestinationsChange}) => {
    const [destinations, setDestinations] = useState([]);
    const [input, setInput] = useState("");

    const addDestination = () => {
        if (input.trim()) {
            const updatedDestinations = [...destinations, input.trim()];
            setDestinations(updatedDestinations);
            if (onDestinationsChange) {
              onDestinationsChange(updatedDestinations);
          }
            setInput("");
        }
    };

    return (
        <div className="destinations-container">
            <h2>What places do you want to visit?</h2>
            <p>Add locations you want to include in your trip.</p>

            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter a destination"
            />
            <button onClick={addDestination}>Add</button>

            <ul>
                {destinations.map((place, index) => (
                    <li key={index}>{place}</li>
                ))}
            </ul>
            <style>
                {`
        .destinations-container {
          margin: 20px;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 10px;
        }
      `}
            </style>
        </div>
    );
};
