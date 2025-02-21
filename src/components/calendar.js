import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const CalendarComponent = () => {
    const [dateRange, setDateRange] = useState([new Date(), new Date()]); // Default to today's date as a range

    const handleDateChange = (newDate) => {
        setDateRange(newDate); // Set selected date range
        console.log("Selected Date Range: ", newDate);
    };

    return (
        <div className="calendar-container">
            <Calendar 
                onChange={handleDateChange} // Handle date change
                value={dateRange} // Set the currently selected date range
                selectRange={true} // Enable range selection
                minDate={new Date()} // Set the minimum date to today
                className="react-calendar" // Custom class for styling
                calendarType="gregory" // Set the calendar type to US
            />
            <p>Selected Start Date: {dateRange[0]?.toDateString()}</p> 
            <p>Selected End Date: {dateRange[1]?.toDateString()}</p> 
            <style>
            {`
                .calendar-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    margin: 20px;
                }
                .react-calendar {
                    width: 100%;
                    max-width: 1400px;
                    background: white
                    color: #4F4F4F; /* Dark charcoal */
                    font-size: 1.5rem;
                    border-radius: 30px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }
                .react-calendar button {
                    border-radius: 8px;
                    padding: 10px;
                    margin: 5px;
                    background: #D3B8AE; /* Warm taupe */
                    color: #4F4F4F; /* Dark charcoal */
                    border: none;
                    cursor: pointer;
                }
                .react-calendar button:hover {
                    background: #B49A88; /* Slightly darker taupe */
                }
                .react-calendar__tile--active {
                    background: #556B2F; /* Olive green */
                    color: white;
                }
                .react-calendar__tile--range {
                    background: green; /* Muted tan */
                    color: #4F4F4F; /* Dark charcoal */
                }
                .react-calendar__month-view__days {
                    display: grid !important;
                    grid-template-columns: repeat(7, 1fr) !important;
                }
            `}
</style>
        </div>
    );
};



