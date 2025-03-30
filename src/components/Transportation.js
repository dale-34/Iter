import React, { useState, useEffect } from "react";
import "../css/Transportation.css";

export const Transportation = ({
  onTransportChange,
  onStartLocationChange,
  startLocation,
}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [input, setInput] = useState("");

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

      <div className="transport__background"></div>

      <div className="transport__options">
        {["rental", "flight", "train", "own"].map((option) => (
          <button
            key={option}
            className={`transport__option ${
              selectedOption === option ? "selected" : ""
            }`}
            onClick={() => handleTransportChange(option)}
          >
            {option === "own"
              ? "No, I have my own transportation"
              : option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>

      {selectedOption && (
        <p className="transport__selected">
          You selected:{" "}
          <strong>
            {selectedOption === "own"
              ? "I have my own transportation"
              : selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)}
          </strong>
        </p>
      )}
    </div>
  );
};
export default Transportation;