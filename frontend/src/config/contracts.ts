import { Address } from "viem";

export const GAME_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_GAME_CONTRACT_ADDRESS as Address;

interface ContractConfig {
  address: Address;
  abi: any; // We'll type this properly once we have the final ABI
}

export const gameConfig: ContractConfig = {
  address: GAME_CONTRACT_ADDRESS,
  abi: [], // TODO: Import actual ABI
};
