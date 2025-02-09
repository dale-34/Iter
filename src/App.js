import logo from './logo.svg';
import React, { useState } from "react";
import './App.css';
import { getVacation } from "./openaiService";

function App() {

  const [vacation, setVacation] = useState("");

  const generateVacation = async () => {
      const result = await getVacation();
      setVacation(result);
  };

  return (
      <div>
          <button onClick={generateVacation}>Generate Vacation</button>
          <p>{vacation}</p>
      </div>
  );
}

export default App;
