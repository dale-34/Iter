import React, { useState, useEffect } from "react";
import "../css/Destinations.css";
import { SpecificPlaces } from "./specificPlaces.js";

export const Destinations = ({ onDestinationChange }) => {
  const [showSpecificPlaces, setShowSpecificPlaces] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Popular");
  const [selectedDestination, setSelectedDestination] = useState([]);

  // Continent Images
  const continentImages = {
    "North America": "https://i.gocollette.com/img/destination-page/north-america/north-america-continent/north-america-continent-ms3r.jpg?h=720&w=1280&la=en-CA",
    "Europe": "https://i.gocollette.com/img/destination-page/europe/europe-continent/europe-ms2.jpg?h=720&w=1280&la=en-AU",
    "Asia": "https://t3.ftcdn.net/jpg/01/46/56/78/360_F_146567837_c6Y6q0382DrpEVvVPTvOR1AlvVbC2qmV.jpg",
    "South America": "https://i.natgeofe.com/n/076afed0-fcd5-4b1e-b585-b598fd8566ad/01_SouthAmerica_3x2.jpg",
    "Africa": "https://blog.sunsafaris.com/wp-content/uploads/2016/07/WildlifeSunsets.jpg",
    "Australia": "https://images.pexels.com/photos/995764/pexels-photo-995764.jpeg?cs=srgb&dl=pexels-patrick-995764.jpg&fm=jpg",
  };

  // Recommendation images for different categories
  const recommendations = {
    Popular: [
      { title: "Eiffel Tower, Paris", img: "https://www.worldatlas.com/r/w1200/upload/09/04/49/untitled-design-374.jpg" },
      { title: "Statue of Liberty, NY", img: "https://www.statueoflibertytour.com/wp-content/uploads/2022/05/statue-of-liberty-gaffb1612d_1920.jpg" },
      { title: "Great Wall, China", img: "https://whc.unesco.org/uploads/thumbs/site_0438_0035-750-750-20241024162522.jpg" },
    ],
    Tropical: [
      { title: "Bora Bora, French Polynesia", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/60/b0/bd/bora-bora.jpg?w=1400&h=1400&s=1" },
      { title: "Maui, Hawaii", img: "https://images.squarespace-cdn.com/content/v1/5d815d4db50c44555a72c530/4eebf383-70c6-4acb-948e-5221326cfbbe/aerial+view+maui+hawaii+mountains+by+the+sea+with+clouds_hawaii+tourism+authority+.jpg" },
      { title: "Maldives", img: "https://www.zubludiving.com/images/Maldives/General/Diving-Maldives-Budget-banner.jpg" },
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

          {/* 🌍 Continent Selection */}
          <div className="destinations__grid">
            {Object.keys(continentImages).map((continent) => (
              <button
                key={continent}
                className={`destinations__continent ${selectedDestination === continent ? "selected" : ""}`}
                onClick={() => handleContinentClick(continent)}
                style={{
                  backgroundImage: `url(${continentImages[continent]})`,
                  filter: selectedDestination === continent ? "none" : "grayscale(50%)",
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