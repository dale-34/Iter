import logo from './logo.svg';
import React, { useState } from "react";
import './App.css';
import { getVacation } from "./openaiService";

// function App() {

//   const [vacation, setVacation] = useState("");

//   const generateVacation = async () => {
//       const result = await getVacation();
//       setVacation(result);
//   };

//   return (
//       <div>
//           <button onClick={generateVacation}>Generate Vacation</button>
//           <p>{vacation}</p>
//       </div>
//   );
// }


function App() {
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [vacationPlan, setVacationPlan] = useState("");

    const generateVacation = async () => {
        try {
            const response = await fetch("http://localhost:3000/generate-vacation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ location, date })
            });

            const data = await response.json();
            setVacationPlan(data.vacation); // Display the response
        } catch (error) {
            console.error("Error generating vacation:", error);
            setVacationPlan("Failed to get vacation plan.");
        }
    };

    return (
        <div>
            <h2>Plan Your Vacation</h2>
            <input 
                type="text" 
                placeholder="Enter location" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Enter date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
            />
            <button onClick={generateVacation}>Generate Vacation Plan</button>
            <p>{vacationPlan}</p>
        </div>
    );
}

export default App;
