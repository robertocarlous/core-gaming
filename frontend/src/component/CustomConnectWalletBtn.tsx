"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

const CustomConnectButton: React.FC = () => {
  return (
    <ConnectButton.Custom>
      {({ account, openConnectModal }) => (
        <button
          onClick={openConnectModal}
          className="bg-[#1E1B4B] text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-[#18144A] transition-all"
        >
          {account ? "Connected" : "Connect wallet"}
        </button>
      )}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;
