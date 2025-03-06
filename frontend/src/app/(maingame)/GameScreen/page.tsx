"use client";

import BackgroundImgBlur from "@/component/BackgroundBlur";
import React, { useState } from "react";

const WheelOfFortune: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const spinWheel = () => {
    if (isSpinning) return; // Prevent spinning while in motion
    setIsSpinning(true);

    const randomIndex = Math.floor(Math.random() * 5); // Ensures landing on a player
    const anglePerSegment = 72; // Each player occupies 72 degrees (360/5)
    const additionalRotation = 360 * 5 + randomIndex * anglePerSegment; // Ensures 5 full spins before landing

    setRotation((prevRotation) => prevRotation + additionalRotation);

    setTimeout(() => {
      setIsSpinning(false);
    }, 4000); // Unlock after 4 seconds
  };

  return (
    <BackgroundImgBlur>
      <div className="fixed top-0 rounded-lg z-50 right-[36%] mt-2 py-1 px-15 transition-all duration-300 bg-[#030b1f]">
        <h2 className="text-white text-2xl mb-1 font-bold text-center">
          WIN or LOSE{" "}
        </h2>
        <p className="text-xm text-white text-center">
          Select a number pool and stand a chance to WIN BIG !!!{" "}
          <span className="text-red-500">
            {" "}
            Select a number pool and stand a chance to WIN BIG !!!
          </span>
        </p>
      </div>
      <span>Click Spin After selecting number pool </span>
      <div className="relative w-64 h-64">
        <div
          className={`w-full h-full rounded-full border-4 border-red-500 flex items-center justify-center transition-transform duration-[4000ms] ease-out ${
            isSpinning ? "pointer-events-none" : ""
          }`}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 4s ease-out",
          }}
        >
          <div
            className="absolute w-20 h-20 bg-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg cursor-pointer z-10"
            onClick={spinWheel}
          >
            SPIN
          </div>
          <div className="absolute w-full h-full flex flex-col items-center justify-center">
            {[
              "Player one",
              "Player two",
              "Player three",
              "Player four",
              "Player five",
            ].map((player, index) => (
              <div
                key={index}
                className="absolute w-20 h-20 bg-red-500 text-white flex items-center justify-center rounded-full font-semibold"
                style={{
                  transform: `rotate(${
                    index * 72
                  }deg) translateY(-85px) rotate(-${index * 72}deg)`,
                }}
              >
                {player}
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 w-6 h-10 bg-white rounded-full border-2 border-gray-900"></div>
      </div>
    </BackgroundImgBlur>
  );
};

export default WheelOfFortune;
