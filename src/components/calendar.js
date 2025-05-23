import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const CalendarComponent = ({ onDateChange }) => {
    const [dateRange, setDateRange] = useState([new Date(), new Date()]); // Default to today's date as a range

    const handleDateChange = (newDate) => {
        setDateRange(newDate); // Set selected date range
        console.log("Selected Date Range: ", newDate);
        if (onDateChange && Array.isArray(newDate)) {
            onDateChange(newDate[0]?.toDateString(), newDate[1]?.toDateString());
        }
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
            <style>
            {`
                .calendar-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                .react-calendar {
                    width: 80%;
                    max-width: 1400px;
                    font-size: 1.5rem;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    background-color: rgb(255, 243, 230);
                    margin-bottom: 40px;
                }
                .react-calendar__tile {
                    height: 100px;
                    padding: 35px;
                    font-size: 1.5rem;
                }
                .react-calendar button {
                    border-radius: 10px;
                    padding: 10px;
                    margin: 5px;
                    border: none;
                    cursor: pointer;
                }
                .react-calendar button:hover {
                    outline: 2px solid rgba(107, 112, 92, 1); /* Darker outline on hover */
                    cursor: pointer;
                }
                .react-calendar__tile--active {
                    background-color: rgb(26, 91, 189);
                }
                .react-calendar__tile--range {

                }
                .react-calendar__month-view__days {
                    display: grid !important;
                    grid-template-columns: repeat(7, 1fr) !important;
                    font-weight: bold;
                }
            `}
</style>
        </div>
    );
};



