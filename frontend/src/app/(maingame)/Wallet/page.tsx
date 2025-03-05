"use client";

import BackgroundImgWithLogo from "@/component/BackgroundImgWithLogo";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Wallet: React.FC = () => {
  return (
    <BackgroundImgWithLogo>
      <div className="custom-connect">
        <ConnectButton />
      </div>
    </BackgroundImgWithLogo>
  );
};

export default Wallet;
