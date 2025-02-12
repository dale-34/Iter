import React from "react";
import { useNavigate } from "react-router-dom";

export const ActionButtons = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/TripPlanning');
  };


  return (
    <div className="flex gap-5 text-2xl mt-14 max-md:text-xl max-md:mt-10 max-sm:flex-col max-sm:items-stretch max-sm:gap-4">
      <button onClick = {handleNavigate}
        className="bg-[rgba(221,190,169,1)] cursor-pointer transition-transform hover:scale-105 duration-[0.2s] whitespace-nowrap px-6 py-[13px] rounded-xl font-bold max-sm:text-center max-sm:px-5 max-sm:py-3"
        aria-label="Start planning your journey"
      >
        Start Planning
      </button>
      <button
        className="bg-[rgba(221,190,169,1)] cursor-pointer transition-transform hover:scale-105 duration-[0.2s] whitespace-nowrap px-6 py-[13px] rounded-xl font-bold max-sm:text-center max-sm:px-5 max-sm:py-3"
        aria-label="Get a random destination suggestion"
      >
        Surprise Me
      </button>
    </div>
  );
};