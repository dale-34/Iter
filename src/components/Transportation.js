import React, { useState } from "react";

export const Transportation = ({ onTransportChange }) => {
  const [needsFlight, setNeedsFlight] = useState(null);
  const [transportType, setTransportType] = useState("");

  const handleNeedsFlight = (value) => {
    setNeedsFlight(value);
    // If the user selects "no", immediately inform the parent.
    if (value === "no" && onTransportChange) {
      onTransportChange({ needsFlight: value, transportType: "" });
    }
  };

  const handleTransportChange = (e) => {
    const newTransportType = e.target.value;
    setTransportType(newTransportType);
    if (onTransportChange) {
      onTransportChange({ needsFlight, transportType: newTransportType });
    }
  };

  return (
    <div className="transportation-container">
      <h2>Do you need flights or any transportation?</h2>
      <div className="radio-buttons">
        <label>
          <input
            type="radio"
            name="flight"
            value="yes"
            checked={needsFlight === "yes"}
            onChange={() => handleNeedsFlight("yes")}
          />
          Yes, I need transportation.
        </label>
        <label>
          <input
            type="radio"
            name="flight"
            value="no"
            checked={needsFlight === "no"}
            onChange={() => handleNeedsFlight("no")}
          />
          No, I have my own transportation.
        </label>
      </div>
      {needsFlight === "yes" && (
        <div>
          <h3>What type of transportation do you need?</h3>
          <select value={transportType} onChange={handleTransportChange}>
            <option value="">Select an option</option>
            <option value="flight">Flight</option>
            <option value="train">Train</option>
            <option value="bus">Bus</option>
            <option value="rental">Rental Car</option>
            <option value="other">Other</option>
          </select>
          {transportType && <p>You selected: {transportType}</p>}
        </div>
      )}
    </div>
  );
};
