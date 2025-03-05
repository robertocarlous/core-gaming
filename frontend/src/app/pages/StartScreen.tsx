"use client";

import Image from "next/image";
import BackgroundImg from "../component/backgroundImg";
import Russian from "../assets/RR_LOGO_2_1.png";
import Logo from "../assets/BREEVS_logo_1.png";

const StartScreen: React.FC = () => {
  return (
    <BackgroundImg>
      <Image
        src={Russian}
        alt="Russian Logo"
        className="w-[350px] mb-4 ml-[10px] z-40 xl:w-[350px] lg:w-[300px] md:w-[250px] sm:w-[200px] xs:w-[20px]"
      />
      <span className="loading-text font-spline text-[17px] absolute leading-[14.4px] mt-[120px] ml-[10px] z-40">
        loading
      </span>
      <div className="absolute text-white font-bold items-center justify-center space-x-2 z-40 ml-9 flex bottom-2">
        <span>Product of</span>
        <Image
          src={Logo}
          alt="Breevs Logo"
          className="w-24 opacity-80 brightness-150 contrast-125"
        />
      </div>
    </BackgroundImg>
  );
};

export default StartScreen;
