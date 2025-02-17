import React, { useState } from 'react';
import Calendar from 'react-calendar'; // Import react-calendar
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles

export const CalendarComponent = () => {
    const [date, setDate] = useState(new Date()); // Default to today's date

    const handleDateChange = (newDate) => {
        setDate(newDate); // Set selected date
        // You can perform other actions based on the new selected date here
        console.log("Selected Date: ", newDate);
    };

    return (
        <div className="calendar-container">
            <h2>Select your start date</h2>
            <Calendar 
                onChange={handleDateChange} // Handle date change
                value={date} // Set the currently selected date
                className="react-calendar" // Add a custom class for styling
            />
            <p>Selected Date: {date.toDateString()}</p> {/* Show the selected date */}
        </div>
    );
};
