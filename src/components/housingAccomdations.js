import React, { useState } from "react";
import "./HousingAccomodations.css";


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

      {/* Comparison Section */}
      <h3 className="housing__comparison-title">Comparison rundown of pros and cons of types of stay</h3>
      <div className="housing__comparison">
        {/* Hotel Image */}
        <div className="housing__comparison-box">
          <img 
            src="https://www.usnews.com/object/image/0000018d-65b2-d883-a7ed-6dbe13990001/49-ritz-carlton-orlando-grande-lakes.jpeg?update-time=1706808185106&size=responsive640" 
            alt="Hotel"
            className="housing__comparison-img"
          />
        </div>

        {/* Apartment Image */}
        <div className="housing__comparison-box">
          <img 
            src="https://images.ctfassets.net/n2ifzifcqscw/1urfgurWmfErxx5SMtd1Pc/253f2b38e531151d7202283091ec061e/airbnb-vs-hotel-hero__1_.png" 
            alt="Apartment"
            className="housing__comparison-img"
          />
        </div>

        {/* House Image */}
        <div className="housing__comparison-box">
          <img 
            src="https://a0.muscache.com/im/pictures/d9ed1a56-5abd-4fdd-9509-7684d1bce98d.jpg" 
            alt="House"
            className="housing__comparison-img"
          />
        </div>
      </div>
    </div>
  );
};