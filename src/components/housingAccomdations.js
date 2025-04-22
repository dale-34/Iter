import React, { useState, useEffect } from "react";
import "../css/HousingAccomodations.css";


export const HousingAccommodations = ({ onHousingChange }) => {
  const [accommodation, setAccommodation] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const housingImages = [
    "https://www.travelandleisure.com/thmb/OiDnPGo3k9QLRT9__TPhFZcr7PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rosewood-carlyle-presidential-suite-LUXESUITE0122-0046808a88924e57922d78c7f1d9ca60.jpg",
    "https://news.airbnb.com/wp-content/uploads/sites/4/2019/06/PJM020719Q202_Luxe_WanakaNZ_LivingRoom_0264-LightOn_R1.jpg?fit=2500%2C1666",
    "https://content.skyscnr.com/m/4bb6095d0dbb56fd/original/Motel-Nacht.jpg?resize=1800px:1800px&quality=100",
    "https://nomadsworld.com/.netlify/images?url=https%3A%2F%2Fapi.nomadsworld.com%2Fwp-content%2Fuploads%2F2018%2F11%2Fnomads-brisbane-hostel-dorm.jpg&w=1920&h=1080"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // trigger fade-out
      setTimeout(() => {
        setImageIndex((prevIndex) => (prevIndex + 1) % housingImages.length);
        setFade(true); // trigger fade-in
      }, 300); // fade-out duration
    }, 3500); // change every 5 seconds
  
    return () => clearInterval(interval);
  }, [housingImages.length]);

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
        src={housingImages[imageIndex]}
        alt="Rotating housing option"
        className={`housing__img ${fade ? "fade-in" : "fade-out"}`}
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