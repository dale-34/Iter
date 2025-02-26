import React, { useState } from "react";
import "../css/Transportation.css";

// export const Transportation = ({ onTransportChange }) => {
//   const [needsFlight, setNeedsFlight] = useState(null);
//   const [transportType, setTransportType] = useState("");
export const Transportation = () => {
  const [selectedOption, setSelectedOption] = useState("");

  // const handleNeedsFlight = (value) => {
  //   setNeedsFlight(value);
  //   // If the user selects "no", immediately inform the parent.
  //   if (value === "no" && onTransportChange) {
  //     onTransportChange({ needsFlight: value, transportType: "" });
  //   }
  // };

  // const handleTransportChange = (e) => {
  //   const newTransportType = e.target.value;
  //   setTransportType(newTransportType);
  //   if (onTransportChange) {
  //     onTransportChange({ needsFlight, transportType: newTransportType });
  //   }
  // };

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
          onClick={() => setSelectedOption("rental")}
        >
          Rental Car
        </button>

        <button
          className={`transport__option ${selectedOption === "flight" ? "selected" : ""}`}
          onClick={() => setSelectedOption("flight")}
        >
          Flight
        </button>

        <button
          className={`transport__option ${selectedOption === "train" ? "selected" : ""}`}
          onClick={() => setSelectedOption("train")}
        >
          Train
        </button>

        <button
          className={`transport__option ${selectedOption === "own" ? "selected" : ""}`}
          onClick={() => setSelectedOption("own")}
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