import Modal from "@/component/ResuableModal";
import GlowingEffect from "@/component/GlowingEffectProps";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { useState, useEffect } from "react";
import { GameContract } from "../../../component/index";

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
  const { isConnected } = useAccount();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
  const parseStakeAmount = (amount: string): bigint => {
    const numericAmount = amount.replace(" CORE", "");
    return parseEther(numericAmount);
  };

  // Set up contract write function
  const { writeContractAsync, isPending, data: hash } = useWriteContract();

  // Wait for transaction to complete
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Update UI based on transaction status
  useEffect(() => {
    setIsProcessing(isPending || isLoading);
    
    if (isSuccess) {
      alert('Game created successfully!');
      onClose();
    }
  }, [isPending, isLoading, isSuccess, onClose]);

  const handleStake = async () => {
    try {
      setError(null);
      setIsProcessing(true);
      
      if (!isConnected) {
        setError("Please connect your wallet first");
        setIsProcessing(false);
        return;
      }
      
      const parsedAmount = parseStakeAmount(stakeAmount);
      
      console.log("Creating game with stake amount:", parsedAmount.toString());
      console.log("Contract address:", GameContract.address);
      console.log("Function:", "createGameRoom");
      
      await writeContractAsync({
        address: GameContract.address as `0x${string}`,
        abi: GameContract.abi,
        functionName: 'createGameRoom',
        args: [parsedAmount],
        value: parsedAmount,
      });

    } catch (err) {
      console.error("Stake error:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
      setIsProcessing(false);
    }
  };

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
        
        {error && (
          <p className="text-red-400 text-sm mb-2">
            {error}
          </p>
        )}
        
        {!isConnected && (
          <p className="text-yellow-400 text-sm mb-2">
            Please connect your wallet to proceed
          </p>
        )}
        
        <button
          className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full w-full 
           shadow-[0_4px_0_#474d76] hover:shadow-[0_4px_0_#474d76] active:translate-y-1 transition-all mt-6
           ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
          onClick={handleStake}
          disabled={isProcessing || !isConnected}
        >
          {isProcessing ? 'Processing...' : 'Proceed to STAKE'}
        </button>
      </div>
    </Modal>
  );
};

export default StakeModal;