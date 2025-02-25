import React, { useState } from "react";
import ReactSlider from "react-slider"; // Import react-slider

export const BudgetSlider = () => {
    // State for the two handles
    const [values, setValues] = useState([0, 14999]); // Initial values for the two handles

    const handleSliderChange = (newValues) => {
        setValues(newValues); // Update the state with new values
    };

    return (
        <div className="slider-container">
            <ReactSlider
                min={0} // Minimum value of the slider
                max={14999} // Maximum value of the slider
                value={values} // Current values of the two handles
                onChange={handleSliderChange} // Function to update state when the slider value changes
                className="slider" // Custom class for styling
                thumbClassName="thumb" // Custom styling for the thumbs (handles)
                trackClassName="track" // Custom styling for the track
                renderThumb={(props) => <div {...props}></div>} // No value displayed on thumb
                step={100}
            />
            <div className="slider-values">
                <p>Value Budget: ${values[0]}</p>
                <p>Maximum Budget: ${values[1]}</p>
            </div>

            {/* Inline styles using the <style> tag */}
            <style>
                {`
                    .slider {
                        width: 80%;
                        max-width: 600px;
                        height: 10px;
                        margin: 20px auto;
                        background: #ddd;
                        border-radius: 5px;
                        position: relative;
                    }
                    
                    .thumb {
                        height: 30px;
                        width: 30px;
                        background-color: rgba(107, 112, 92, 1);
                        color: white;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                        cursor: pointer;
                        position: absolute;
                        top: -10px;
                    }
                    
                    .track {
                        background: white;
                        height: 100%;
                        border-radius: 5px;
                    }
                    
                    .slider-values {
                        font-size: 1.7rem;
                        
                        display: flex;
                        justify-content: space-between;
                        width: 80%;
                        max-width: 600px;
                        margin: 10px auto;
                        font-size: 1.2rem;
                        font-weight: bold;
                    }
                `}
            </style>
        </div>
    );
};
