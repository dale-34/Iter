import React, { useState } from "react";
import "../css/HousingAccomodations.css";


export const HousingAccommodations = ({ onHousingChange }) => {
  const [accommodation, setAccommodation] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value;
    if (onHousingChange) {
      onHousingChange(newValue);
    }
    setAccommodation(newValue);
  };

  return (
    <div className="housing">
      <h2 className="housing__title">Where do you prefer to stay?</h2>

      {/* Main Hotel Image */}
      <div className="housing__image">
        <img 
          src="https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg" 
          alt="Luxury hotel room with city view"
          className="housing__img"
        />
      </div>

      {/* Dropdown for Selection */}
      <select value={accommodation} onChange={handleChange} className="housing__dropdown">
        <option value="">Select an option</option>
        <option value="hotel">Hotel</option>
        <option value="apartment">Apartment</option>
        <option value="house">House</option>
        <option value="hostel">Hostel</option>
      </select>

      {accommodation && <p className="housing__selected">You selected: {accommodation}</p>}

         
  </div> 
  );
};