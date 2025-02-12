import React from "react";
import { ActionButtons } from "./buttons/actionButtons";

export const HomeHero = () => {
  return (
    <main className="self-center w-full max-w-[1168px] mt-[81px] px-6 py-0 max-md:mt-[60px] max-md:px-5 max-md:py-0 max-sm:mt-10 max-sm:px-4 max-sm:py-0">
      <div className="flex flex-row items-center justify-between gap-5 max-md:flex-col">
        {/* Left Section: Text and Buttons */}
        <section className="flex flex-col w-1/2 max-md:w-full">
          <div className="flex w-full flex-col text-black font-bold mt-[65px]">
            <h2 className="text-[64px] leading-[1.2] max-md:text-[50px] max-sm:text-[40px] max-sm:text-center">
              <span>Begin Your</span>
              <br />
              <span>Adventure Today</span>
            </h2>
            <ActionButtons />
          </div>
        </section>

        {/* Right Section: Globe */}
        <section className="w-1/2 flex items-center justify-center max-md:mt-10">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7f/Rotating_earth_animated_transparent.gif"
            alt="Earth"
            className="w-[400px] h-[400px] object-contain max-lg:w-[300px] max-lg:h-[300px] max-md:w-[250px] max-md:h-[250px] max-sm:w-full max-sm:h-auto"
            loading="lazy"
          />
        </section>
      </div>
    </main>
  );
};
