import React, { useState, useEffect } from "react";
import "../css/Transportation.css";

export const Transportation = ({
  onTransportChange,
  onStartLocationChange,
  startLocation,
}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [input, setInput] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const transportImages = [
    "https://t4.ftcdn.net/jpg/02/96/78/67/360_F_296786762_ucj0pcmqEJPxURshkvm8ufQ7NV6TbArL.jpg",
    "https://www.railway-technology.com/wp-content/uploads/sites/13/2021/05/train-4775170_1280-min.jpg",
    "https://faracerv.com/wp-content/uploads/2022/09/essential-rv-driving-tips-for-beginners-scaled.webp",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // fade out
      setTimeout(() => {
        setImageIndex((prevIndex) => (prevIndex + 1) % transportImages.length);
        setFade(true); // fade in
      }, 300); // must match CSS fade-out time
    }, 5000); // rotate every 5 seconds

    return () => clearInterval(interval);
  }, []);


  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      onStartLocationChange(input.trim());
      setInput("");
    }
  };

  const handleRemoveLocation = () => {
    onStartLocationChange("");
  };

  const handleTransportChange = (transport) => {
    setSelectedOption(transport);
    if (onTransportChange) {
      onTransportChange(transport);
    }
  };

  useEffect(() => {
    if (selectedOption && onTransportChange) {
      onTransportChange(selectedOption);
    }
  }, [selectedOption, onTransportChange]);

  return (
    <div className="transport">
      <h2 className="transport__title">How are you getting to and from?</h2>

      <div className="transport__input-box">
        <label
          htmlFor="start-location"
          className="transport__label"
        >
          Starting Location:
        </label>

        {startLocation ? (
          <div className="transport__tag">
            <span className="transport__tag-text">{startLocation}</span>
            <button
              className="transport__tag-close"
              onClick={handleRemoveLocation}
              aria-label="Remove location"
            >
              &times;
            </button>
          </div>
        ) : (
          <input
            type="text"
            id="start-location"
            placeholder="Search starting city or airport"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="transport__input"
          />
        )}
      </div>

      <div className="transport__image">
        <img
          src={transportImages[imageIndex]}
          alt="Transportation method"
          className={`transport__img ${fade ? "fade-in" : "fade-out"}`}
        />
      </div>

      <div className="transport__options">
        {["Rental Car", "Flight", "Train", "Own"].map((option) => (
          <button
            key={option}
            className={`transport__option ${
              selectedOption === option ? "selected" : ""
            }`}
            onClick={() => handleTransportChange(option)}
          >
            {option === "Own"
              ? "I have my own transportation"
              : option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Transportation;