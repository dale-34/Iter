import React, { useState } from "react";
import "../css/Transportation.css";


export const Transportation = ({ onTransportChange }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleTransportChange = (transport) => {
    setSelectedOption(selectedOption);
    if (onTransportChange) {
      onTransportChange(transport);
    }
  };

  return (
    <div className="transport">
      <h2 className="transport__title">How are you getting to and from?</h2>

      {/* Background Section */}
      <div className="transport__background">
      </div>

      {/* Clickable Options */}
      <div className="transport__options">
        <button
          className={`transport__option ${selectedOption === "rental" ? "selected" : ""}`}
          onClick={() => handleTransportChange("rental")}
        >
          Rental Car
        </button>

        <button
          className={`transport__option ${selectedOption === "flight" ? "selected" : ""}`}
          onClick={() => handleTransportChange("flight")}
        >
          Flight
        </button>

        <button
          className={`transport__option ${selectedOption === "train" ? "selected" : ""}`}
          onClick={() => handleTransportChange("train")}
        >
          Train
        </button>

        <button
          className={`transport__option ${selectedOption === "own" ? "selected" : ""}`}
          onClick={() => handleTransportChange("own")}
        >
          No, I have my own transportation
        </button>
      </div>

      {/* Display Selected Option */}
      {selectedOption && (
        <p className="transport__selected">
          You selected: <strong>
            {selectedOption === "own" ? "I have my own transportation" : selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)}
          </strong>
        </p>
      )}
    </div>
  );
};