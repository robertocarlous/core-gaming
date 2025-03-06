import Modal from "@/component/ResuableModal"; 
import GlowingEffect from "@/component/GlowingEffectProps";

interface StakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  stakeAmount: string;
}

const StakeModal: React.FC<StakeModalProps> = ({
  isOpen,
  onClose,
  stakeAmount,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-[#0B1445] text-white text-center p-6 rounded-2xl">
        <GlowingEffect className="top-[63px] left-[47px]" />
        <h2 className="text-[25px] font-bold mb-4">Stake to WIN 1 CORE</h2>
        <p className="text-md mb-2 text-[#FF3B3B]">Amount available to stake</p>
        <div className="bg-white text-[#0B1445] py-1 px-15 rounded-lg mb-10 inline-block font-bold">
          {stakeAmount}
        </div>
        <p className="text-sm mb-4">
          You are about staking{" "}
          <span className="text-red-500 font-bold">{stakeAmount}</span> to win
          <span className="text-red-500 font-bold"> 1 CORE</span>, Kindly click
          on proceed to transaction to
          <span className="text-red-500 font-bold"> PLAY GAME</span>
        </p>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full w-full
         shadow-[0_4px_0_#474d76] hover:shadow-[0_4px_0_#474d76] active:translate-y-1 transition-all mt-6
        "
        >
          Proceed to STAKE
        </button>
      </div>
    </Modal>
  );
};

export default StakeModal;
