import React, { useState, useEffect } from "react";
import "../css/Destinations.css";
import { SpecificPlaces } from "./specificPlaces.js";

export const Destinations = ({ onDestinationChange }) => {
  const [showSpecificPlaces, setShowSpecificPlaces] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Popular");
  const [selectedDestination, setSelectedDestination] = useState([]);

  // Continent Images
  const continentImages = {
    "North America": "https://justglobetrotting.com/wp-content/uploads/2017/05/north-america.jpg",
    "Europe": "https://i.gocollette.com/img/destination-page/europe/europe-continent/europe-ms2.jpg?h=720&w=1280&la=en-AU",
    "Asia": "https://t3.ftcdn.net/jpg/01/46/56/78/360_F_146567837_c6Y6q0382DrpEVvVPTvOR1AlvVbC2qmV.jpg",
    "South America": "https://media.istockphoto.com/id/930824730/photo/machu-picchu-peru.jpg?s=612x612&w=0&k=20&c=sXUMiy9gRGKow9GHNY_S9BH_ZEekIEcpDHyti5IjZNQ=",
    "Africa": "https://www.breakingtravelnews.com/images/uploads/tourism/Serengeti-National-Park-Featured.jpg",
    "Australia": "https://images.pexels.com/photos/995764/pexels-photo-995764.jpeg?cs=srgb&dl=pexels-patrick-995764.jpg&fm=jpg",
  };

  // Recommendation images for different categories
  const recommendations = {
    Popular: [
      { title: "Eiffel Tower", img: "https://www.travelandleisure.com/thmb/SPUPzO88ZXq6P4Sm4mC5Xuinoik=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/eiffel-tower-paris-france-EIFFEL0217-6ccc3553e98946f18c893018d5b42bde.jpg" },
      { title: "Statue of Liberty", img: "https://images.squarespace-cdn.com/content/v1/564fe1dfe4b02e24589cb0cd/1645814786032-WNCKTFACB84H9051CJYJ/Cover.png?format=1500w" },
      { title: "Great Wall of China", img: "https://whc.unesco.org/uploads/thumbs/site_0438_0035-750-750-20241024162522.jpg" },
    ],
    Tropical: [
      { title: "Bora Bora, French Polynesia", img: "https://cache.marriott.com/is/image/marriotts7prod/xr-bobxr-overview-overwater-villa--23952:Feature-Hor?wid=1920&fit=constrain" },
      { title: "Maui, Hawaii", img: "https://www.theknot.com/tk-media/images/6231de02-db4d-4eda-b37e-e3379a83b0a9" },
      { title: "Puerto Rico", img: "https://caribbeanbreezeadventures.com/wp-content/uploads/sites/7128/2024/01/AdobeStock_544504039-scaled.jpeg?resize=360%2C240&zoom=2" },
    ],
    Cityscape: [
      { title: "Tokyo, Japan", img: "https://media.cntraveler.com/photos/678166b8a51cc7c3458df25a/16:9/w_2580,c_limit/pexels-Aleksandar%20Pasaric-2506923.jpg" },
      { title: "New York City, USA", img: "https://media.cntraveller.com/photos/64f4fc5f663208f83a21af16/16:9/w_2580,c_limit/New%20York%20City_GettyImages-1347979016.jpg" },
      { title: "London, UK", img: "https://assets.editorial.aetnd.com/uploads/2019/03/topic-london-gettyimages-760251843-feature.jpg" },
    ],
  };

   // Select or deselect a continent
   const handleContinentClick = (continent) => {
    setSelectedDestination(continent);
  };

  const handleCardClick = (title) => {
    setSelectedDestination(title);
  };

  useEffect(() => {
    // Wrap destination in an array since parent expects an array
    if (selectedDestination) {
      onDestinationChange([selectedDestination]);
    }
  }, [selectedDestination, onDestinationChange]);

  return (
    <div className="destinations">
      {!showSpecificPlaces ? (
        <>
          <h2 className="destinations__title">Where are you looking to go?</h2>
          <p className="destinations__subtitle">Select a continent, popular destination, or input your own destination.</p>
          {/* 🌍 Continent Selection */}
          <div className="destinations__grid">
            {Object.keys(continentImages).map((continent) => (
              <button
                key={continent}
                className={`destinations__continent ${selectedDestination === continent ? "selected" : ""}`}
                onClick={() => handleContinentClick(continent)}
                style={{
                  backgroundImage: `url(${continentImages[continent]})`,
                  filter: selectedDestination === continent ? "none" : "grayscale(0%)",
                }}
              >
                {continent}
              </button>
            ))}
          </div>

          {/* 📁 Filter Buttons */}
          <div className="destinations__filters">
            {Object.keys(recommendations).map((filter) => (
              <button
                key={filter}
                className={`destinations__filter ${selectedFilter === filter ? "selected" : ""}`}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* 🖼 Destination Carousel */}
          <h3 className="destinations__carousel-title">{selectedFilter} Destinations</h3>
          <div className="destinations__carousel">
            {recommendations[selectedFilter].map((place, index) => (
              <div
                key={index}
                className={`destinations__carousel-card ${selectedDestination === place.title ? "selected" : ""}`}
                onClick={() => handleCardClick(place.title)}
              >
                <img src={place.img} alt={place.title} className="carousel-image" />
                <p style={{ color: selectedDestination === place.title ? "black" : "#333", fontWeight: selectedDestination === place.title ? "bold" : "normal" }}>
                  {place.title}
                </p>
              </div>
            ))}
          </div>

          {/* 📍 "I have a place in mind" */}
          <button
            className="destinations__custom-button"
            onClick={() => {
              setSelectedDestination("I have a place in mind");
              setShowSpecificPlaces(true);
            }}
          >
            I have a place in mind
          </button>
        </>
      ) : (
        <SpecificPlaces
          onClose={() => setShowSpecificPlaces(false)}
          onSpecificChange={(specificPlace) => setSelectedDestination(specificPlace)}
        />
      )}
    </div>
  );
};