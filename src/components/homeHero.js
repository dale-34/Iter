import React from "react";
import { ActionButtons } from "./buttons/actionButtons";

export const HomeHero = () => {
  return (
    <main className="self-center w-full max-w-[1168px] mt-[81px] px-6 py-0 max-md:mt-[60px] max-md:px-5 max-md:py-0 max-sm:mt-10 max-sm:px-4 max-sm:py-0">
      <div className="gap-5 flex items-center justify-between max-sm:flex-col">
        <section className="flex flex-col w-[43%] max-sm:w-full">
          <div className="flex w-full flex-col text-black font-bold mt-[65px]">
            <h2 className="text-[64px] leading-[1.2] max-md:text-[50px] max-sm:text-[40px] max-sm:text-center">
              <span>Begin Your</span>
              <br />
              <span>Adventure Today</span>
            </h2>
            <ActionButtons />
          </div>
        </section>

        <section className="flex flex-col w-[57%] max-sm:w-full items-center justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7f/Rotating_earth_animated_transparent.gif"
            alt="Earth"
            className="w-[500px] h-[500px] object-contain max-lg:w-[400px] max-lg:h-[400px] max-md:w-[300px] max-md:h-[300px] max-sm:w-full max-sm:h-auto max-sm:mt-10"
            loading="lazy"
          />
        </section>
      </div>
    </main>
  );
};