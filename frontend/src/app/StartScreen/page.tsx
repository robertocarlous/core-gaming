"use client";

import Image from "next/image";
import BackgroundImg from "../../component/BackgroundImg";
import Russian from "../../assets/RR_LOGO_2_1.png";
import Logo from "../../assets/BREEVS_logo_1.png";
import { useRouter } from "next/navigation";

const StartScreen: React.FC = () => {
  const router = useRouter();

  const handleStart = () => {
    router.push("/Home");
  };

  return (
    <BackgroundImg>
      <div className=" flex flex-col items-center justify-center">
        <div className="flex flex-col relative mt-[100px] ml-[25px]">
          <Image
            src={Russian}
            alt="Russian Logo"
            className="w-[350px] z-40 xl:w-[350px] lg:w-[300px] md:w-[250px] sm:w-[200px] xs:w-[20px]"
          />
          <span className="loading-text font-spline text-[17px] leading-[14.4px] z-40 absolute top-[73%] left-[42%]">
            loading
          </span>
        </div>
        <div
          onClick={handleStart}
          className="
        z-40 bg-[#0161d5] rounded-full px-10 py-2 font-bold text-lg 
        shadow-2xl relative cursor-pointer transition-all duration-200 
        hover:shadow-xl hover:-translate-y-1 hover:bg-gray-100
        active:scale-95 active:shadow-md ml-[25px] 
      "
        >
          Start
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-full pointer-events-none"></div>
        </div>
        <div className="text-white font-bold items-center justify-center space-x-2 z-40 ml-14 flex bottom-2 pt-[100px]">
          <span>Product of</span>
          <Image
            src={Logo}
            alt="Breevs Logo"
            className="w-24 opacity-80 brightness-150 contrast-125"
          />
        </div>
      </div>
    </BackgroundImg>
  );
};

export default StartScreen;
