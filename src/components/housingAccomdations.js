import React, { useState } from "react";

export const HousingAccommodations = () => {
  const [accommodation, setAccommodation] = useState("");

  const handleChange = (event) => {
    setAccommodation(event.target.value);
  };

  return (
    <div className="housing-container">
      <h2>What type of housing accommodations do you need?</h2>
      <p>Select the type of accommodation that best suits your trip.</p>
      
      <select value={accommodation} onChange={handleChange} className="housing-dropdown">
        <option value="">Select an option</option>
        <option value="hotel">Hotel</option>
        <option value="airbnb">Airbnb</option>
        <option value="hostel">Hostel</option>
        <option value="resort">Resort</option>
        <option value="other">Other</option>
      </select>

      {accommodation && <p>You selected: {accommodation}</p>}
    </div>
  );
};
