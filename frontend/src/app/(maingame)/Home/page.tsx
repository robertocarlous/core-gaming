"use client";
import { Open_Sans } from "next/font/google";
import Image from "next/image";
import Logo from "../../../assets/RR_LOGO_1.png";
import { useState } from "react";
import StakeModal from "./StakeModal";
import BackgroundImgBlur from "@/component/BackgroundBlur";

const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "700"] });
const stakes = [
  { amount: "1 CORE" },
  { amount: "0.1 CORE" },
  { amount: "1.12 CORE" },
  { amount: "2 CORE" },
  { amount: "0.5 CORE" },
  { amount: "3 CORE" },
  { amount: "5 CORE" },
  { amount: "0.8 CORE" },
  { amount: "1.5 CORE" },
  { amount: "2.5 CORE" },
  { amount: "4 CORE" },
  { amount: "6 CORE" },
  { amount: "7 CORE" },
  { amount: "8 CORE" },
];

const GameList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("");

  const handleOpenModal = (amount: string) => {
    setStakeAmount(amount);
    setIsModalOpen(true);
  };

  return (
    <BackgroundImgBlur>
      <div className={`${openSans.className} relative w-full min-h-screen`}>
        <div className="fixed top-0 rounded-lg z-50 right-[36%] mt-2 py-1 px-15 transition-all duration-300 bg-[#030b1f]">
          <h2 className="text-white text-2xl mb-1 font-bold text-center">
            Available Games
          </h2>
          <p className="text-xm text-white text-center">
            Click and join game to
            <span className="text-red-500"> WIN BIG!!!</span>
          </p>
        </div>

        {/* Push content down so it doesn't overlap the fixed header */}
        <div className="pt-20 w-full max-w-screen-lg mx-auto mt-6 lg:px-5 md:px-10 px-5 pb-25">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {stakes.map((stake, index) => (
              <div
                key={index}
                className="bg-[#191F57CF] p-6 rounded-lg shadow-lg text-center border border-gray-700   transition-transform duration-150 ease-in-out 
  hover:scale-105 active:scale-95 cursor-pointer"
                onClick={() => handleOpenModal(stake.amount)}
              >
                <Image
                  src={Logo}
                  alt="Game Icon"
                  className="w-30 mx-auto mb-3"
                />
                <p className="text-white font-semibold">Stake and Win</p>
                <p className="text-red-500 font-bold text-lg">{stake.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <StakeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        stakeAmount={stakeAmount}
      />
    </BackgroundImgBlur>
  );
};

export default GameList;
