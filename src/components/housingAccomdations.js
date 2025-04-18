import React, { useState, useEffect } from "react";
import "../css/HousingAccomodations.css";


export const HousingAccommodations = ({ onHousingChange }) => {
  const [accommodation, setAccommodation] = useState("");

  // const handleChange = (event) => {
  //   const newValue = event.target.value;
  //   if (onHousingChange) {
  //     onHousingChange(newValue);
  //   }
  //   setAccommodation(newValue);
  // };

  const handleHousingChange = (housing) => {
    setAccommodation(housing);
    if (onHousingChange) {
      onHousingChange(housing);
    }
  };

  useEffect(() => {
    if (accommodation && onHousingChange) {
      onHousingChange(accommodation);
    }
  }, [accommodation, onHousingChange]);

  return (
    <div className="housing">
      <h2 className="housing__title">Where would you prefer to stay?</h2>
      <div className="housing__image">
        <img 
          src="https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg" 
          alt="Luxury hotel room with city view"
          className="housing__img"
        />
      </div>

      <div className="housing__options">
        {["Hotel", "AirBnB", "Motel", "I have my own housing"].map((option) => (
          <button
            key={option}
            className={`housing__option ${
              accommodation === option ? "selected" : ""
            }`}
            onClick={() => handleHousingChange(option)}
          >
            {option === "Own"
              ? "I have my own transportation"
              : option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>

      {/* <select value={accommodation} onChange={handleChange} className="housing__dropdown">
        <option value="">Select an option</option>
        <option value="hotel">Hotel</option>
        <option value="apartment">AirBnB</option>
        <option value="hostel">Motel</option>
        <option value="hostel">I have my own housing</option>
      </select> */}
  </div> 
  );
};