"use client";

import BackgroundImgBlur from "@/component/BackgroundBlur";
import React, { useState, useEffect } from "react";
import { Open_Sans } from "next/font/google";
import { motion } from "framer-motion";

const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "700"] });
const addresses = [
  "0xA1b2C3d4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0",
  "0xB2c3D4e5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T1A",
  "0xC3d4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T1A2B",
  "0xD4e5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T1A2B3C",
  "0xE5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T1A2B3C4D",
  "0xF6G7H8I9J0K1L2M3N4O5P6Q7R8S9T1A2B3C4D5E",
  "0xG7H8I9J0K1L2M3N4O5P6Q7R8S9T1A2B3C4D5E6F",
  "0xH8I9J0K1L2M3N4O5P6Q7R8S9T1A2B3C4D5E6F7G",
  "0xI9J0K1L2M3N4O5P6Q7R8S9T1A2B3C4D5E6F7G8H",
  "0xJ0K1L2M3N4O5P6Q7R8S9T1A2B3C4D5E6F7G8H9I",
];

const winnings = [
  "122 CORE",
  "250 CORE",
  "75 CORE",
  "300 CORE",
  "150 CORE",
  "90 CORE",
  "200 CORE",
  "180 CORE",
  "220 CORE",
  "135 CORE",
];

const initialPlayers = [
  {
    name: "Player 1",
    address: "0xA1b2C3d4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0",
    status: "Still in",
  },
  {
    name: "Player 2",
    address: "0xB2c3D4e5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T1A",
    status: "Still in",
  },
  {
    name: "Player 3",
    address: "0xC3d4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T1A2B",
    status: "Still in",
  },
  {
    name: "Player 4",
    address: "0xD4e5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T1A2B3C",
    status: "Still in",
  },
  {
    name: "Player 5",
    address: "0xE5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T1A2B3C4D",
    status: "Still in",
  },
];

const WheelOfFortune: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [index, setIndex] = useState(0);
    const [players, setPlayers] = useState(initialPlayers);
    const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % addresses.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

   const spinWheel = () => {
     if (isSpinning || winner) return;
     setIsSpinning(true);

     const remainingPlayers = players.filter(
       (player) => player.status === "Still in"
     );
     if (remainingPlayers.length === 1) {
       setWinner(remainingPlayers[0].name);
       return;
     }

     const randomIndex = Math.floor(Math.random() * remainingPlayers.length);
     const anglePerSegment = 360 / remainingPlayers.length;
     const additionalRotation = 360 * 10 + randomIndex * anglePerSegment;

     const fastSpin = setInterval(() => {
       setRotation((prev) => prev + (Math.random() > 0.5 ? 60 : -60));
     }, 30);

     setTimeout(() => {
       clearInterval(fastSpin);
       const slowSpin = setInterval(() => {
         setRotation((prev) => prev + 10);
       }, 100);

       setTimeout(() => {
         clearInterval(slowSpin);
         setRotation((prev) => prev + additionalRotation);
         setTimeout(() => {
           setIsSpinning(false);
           setPlayers((prevPlayers) => {
             const updatedPlayers = prevPlayers.map((player) =>
               player.address === remainingPlayers[randomIndex].address
                 ? { ...player, status: "Eliminated" }
                 : player
             );

             const stillIn = updatedPlayers.filter(
               (player) => player.status === "Still in"
             );
             if (stillIn.length === 1) {
               setWinner(stillIn[0].name);
             }

             return updatedPlayers;
           });
         }, 2000);
       }, 3000);
     }, 2000);
   };
  return (
    <BackgroundImgBlur>
      <div
        className={`${openSans.className}justify-start flex fixed space-y-4 top-5 left-2 flex-col rounded-lg z-50 mt-2 py-1 px-15 transition-all duration-300 bg-[#030b1f`}
      >
        <h2 className="text-white text-2xl mb-1 font-bold">
          <span className="text-[#FF3B3B]">WIN</span> or LOSE
        </h2>
        <p className="text-sm text-white">
          Last man standing stands a chance to{" "}
          <span className="text-[#FF3B3B]">WIN BIG !!!</span>
        </p>
        <motion.div
          key={index} // Trigger re-animation when index changes
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          className=" text-white rounded-lg text-lg"
        >
          <span className="text-gray-400">
            {addresses[index].slice(0, 4)}****{addresses[index].slice(-4)}
          </span>
          <span className="ml-2">just won</span>
          <span className="ml-2 text-red-500 font-bold">{winnings[index]}</span>
        </motion.div>
      </div>
      <div className="flex justify-center items-center space-x-44 mt-10">
        {/* Player List on the Left */}
        <div className="text-white p-4 flex flex-col backdrop-blur-xs">
          <h2 className="text-xl font-bold mb-2">Players</h2>
          {players.map((player, index) => (
            <div
              key={index}
              className="mb-2 p-2 border-b border-gray-700 flex space-x-19"
            >
              <p
                className={`text-sm font-semibold ${
                  player.status === "Eliminated"
                    ? "line-through text-red-400"
                    : ""
                }`}
              >
                {player.name}
              </p>
              <p className="text-sm text-gray-400">
                {player.address.slice(0, 4)}****{player.address.slice(-4)}
              </p>
              <p
                className={`text-sm ${
                  player.status === "Still in"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {player.status}
              </p>
            </div>
          ))}
        </div>

        {/* Wheel on the Right */}
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
              {players.map((player, index) => (
                <div
                  key={index}
                  className={`absolute w-20 h-20 flex items-center justify-center rounded-full font-semibold ${
                    player.status === "Eliminated"
                      ? "line-through text-red-400"
                      : "bg-red-500 text-white"
                  }`}
                  style={{
                    transform: `rotate(${
                      index * (360 / players.length)
                    }deg) translateY(-85px) rotate(-${
                      index * (360 / players.length)
                    }deg)`,
                  }}
                >
                  {player.name}
                </div>
              ))}
            </div>
          </div>
          {/* <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 w-6 h-10 bg-white rounded-full border-2 border-gray-900"></div> */}
          <div className="relative flex items-center justify-center top-[-255px]">
            <div className="w-0 h-0 border-l-4 border-r-4 border-l-transparent border-r-transparent border-t-20 border-t-white"></div>
          </div>
        </div>
      </div>
    </BackgroundImgBlur>
  );
};

export default WheelOfFortune;
