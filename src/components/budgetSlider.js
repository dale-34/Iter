import React, { useState } from "react";
import ReactSlider from "react-slider"; // Import react-slider

export const BudgetSlider = ({onBudgetChange}) => {
    // State for the two handles
    const [values, setValues] = useState([100, 14999]); // Initial values for the two handles

    const handleSliderChange = (newValues) => {
        if (onBudgetChange) {
            onBudgetChange(newValues);
        }
        setValues(newValues); // Update the state with new values
    };

    const incrementMin = () => {
        setValues(([min, max]) => [Math.min(min + 100, max), max]);
    };

    const decrementMin = () => {
        setValues(([min, max]) => [Math.max(min - 100, 0), max]);
    };

    const incrementMax = () => {
        setValues(([min, max]) => [min, Math.min(max + 100, 15000)]);
    };

    const decrementMax = () => {
        setValues(([min, max]) => [min, Math.max(max - 100, min)]);
    };

    return (
        <div className="slider-container">
            <ReactSlider
                min={100} // Minimum value of the slider
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
                <button className="decrement"
                    onClick={decrementMin}
                > - </button>
                <p>Minimum Budget: ${values[0]}</p>
                <button className="increment"
                    onClick={incrementMin}
                > + </button>
                <button className="decrement"
                    onClick={decrementMax}
                > - </button>
                <p>Maximum Budget: ${values[1]}</p>
                <button className="increment"
                    onClick={incrementMax}
                > + </button>
            </div>

            {/* Inline styles using the <style> tag */}
            <style>
                {`
                    .slider {
                        width: 50%;
                        max-width: 1400px;
                        height: 10px;
                        margin: 0 auto;
                        margin-top: 40px;
                        margin-bottom: 60px;
                        background: #ddd;
                        border-radius: 5px;
                        position: relative;
                    }

                    .increment {
                        width: 15px;
                        height: 15px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 10px 10px; /* Smaller padding */
                        font-size: 1rem; /* Adjust font size */
                        border-radius: 50%;
                        background-color: transparent;
                    }

                    .decrement {
                        width: 15px;
                        height: 15px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 10px 10px; /* Smaller padding */
                        font-size: 1rem; /* Adjust font size */
                        border-radius: 50%;
                        background-color: transparent;
                    }
                    
                    .thumb {
                        height: 30px;
                        width: 30px;
                        // background-color: rgba(107, 112, 92, 1);
                        background-color: rgb(26, 91, 189);
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
                        display: flex;
                        justify-content: space-between;
                        width: 50%;
                        max-width: 600px;
                        margin: auto;
                        font-size: 1.2rem;
                        font-weight: bold;
                        padding-bottom: 40px;
                    }
                `}
            </style>
        </div>
    );
};
