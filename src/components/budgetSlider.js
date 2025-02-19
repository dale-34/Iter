import React, { useState } from "react";
import ReactSlider from "react-slider"; // Import react-slider
//import "./SliderComponent.css"; // Optional: Add custom styles for the slider

export const BudgetSlider = () => {
    // State for the two handles
    const [values, setValues] = useState([0, 49999]); // Initial values for the two handles

    const handleSliderChange = (newValues) => {
        setValues(newValues); // Update the state with new values
    };

    return (
        <div className="slider-container">
            <h2>Choose a Range</h2>
            <ReactSlider
                min={0} // Minimum value of the slider
                max={49999} // Maximum value of the slider
                value={values} // Current values of the two handles
                onChange={handleSliderChange} // Function to update state when the slider value changes
                className="slider" // Optional: Custom class for styling
                thumbClassName="thumb" // Optional: Custom styling for the thumbs (handles)
                trackClassName="track" // Optional: Custom styling for the track
                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>} // Customize thumb (optional)
            />
            <div className="slider-values">
                <p>Min Value: {values[0]}</p>
                <p>Max Value: {values[1]}</p>
            </div>
        </div>
    );
};
