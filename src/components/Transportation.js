import React, { useState } from "react";

export const Transportation = () => {
  const [needsFlight, setNeedsFlight] = useState(null);
  const [transportType, setTransportType] = useState("");

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
            onChange={() => setNeedsFlight("yes")}
          />
          Yes, I need transportation.
        </label>

        <label>
          <input
            type="radio"
            name="flight"
            value="no"
            checked={needsFlight === "no"}
            onChange={() => setNeedsFlight("no")}
          />
          No, I have my own transportation.
        </label>
      </div>

      {needsFlight === "yes" && (
        <div>
          <h3>What type of transportation do you need?</h3>
          <select value={transportType} onChange={(e) => setTransportType(e.target.value)}>
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
