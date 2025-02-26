import React, { useState, useEffect } from "react";
import "../css/specificPlaces.css";

export const SpecificPlaces = ({ onClose, onSpecificChange }) => {
    const [places, setPlaces] = useState([]);
    const [input, setInput] = useState("");

    // Add a new place when pressing Enter
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && input.trim() !== "") {
            setPlaces([...places, input]);
            setInput("");
        }
    };

    // Remove a place when clicking 'x'
    const removePlace = (index) => {
        setPlaces(places.filter((_, i) => i !== index));
    };

    useEffect(() => {
        if (onSpecificChange) {
            onSpecificChange(places);
        }
    }, [places, onSpecificChange]);

    return (
        <div className="specific-places">
            <h2 className="specific-places__title">Any specific places?</h2>

            <div className="specific-places__box">
                <input
                    type="text"
                    placeholder="Search"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="specific-places__input"
                />

                {/* Selected Places */}
                <div className="specific-places__tags">
                    {places.map((place, index) => (
                        <div key={index} className="specific-places__tag">
                            {place}{" "}
                            <span onClick={() => removePlace(index)}>x</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Back Button */}
            <button className="specific-places__back-button" onClick={onClose}>
                Back
            </button>
        </div>
    );
};

export default SpecificPlaces;
