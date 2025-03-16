#core-gaming

Overview
Core Gaming - Russian Roulette is a decentralized web application where users participate in a high-stakes elimination game built on Core Testnet. Players stake tokens to join a game room, and one by one, they are eliminated through a randomized process until only one player remains — who claims the entire prize pool.

The game logic is handled through a smart contract deployed to Core Testnet, ensuring transparency and tamper-proof gameplay.

##Features
Game Creation
A player initiates a new game room, specifying the stake amount required to join.
The creator automatically deposits the stake when creating the room.
Multi-Player Support
Up to 5 players (creator + 4 others) can join the game room by sending the required stake amount.
Game Start
Once 5 players have joined, anyone can trigger the game to start.
All staked tokens are held securely by the smart contract.
Russian Roulette Rounds
Each round, the roulette is spun to randomly eliminate one player.
The process repeats until only one winner remains.
Winner Takes All
The final player standing wins the entire prize pool (all 5 players' stakes combined).
Contract Structure
State Variables
Players: Tracks all players who have joined each game.
Stake: The fixed amount each player must deposit to join.
Game State: Tracks each game’s lifecycle (Active, In Progress, Completed).

##Functions
Create Game: Starts a new game room with a unique room ID.
Join Game: Allows players to join an active room if space is available.
Start Game: Begins the roulette process once 5 players have joined.
Spin: Eliminates a player at random using block.prevrandao.
Claim Winnings: Allows the final player to withdraw the full prize pool.

##How to Contribute
Prerequisites
Core Testnet wallet (for staking tokens)
Basic understanding of Hardhat and smart contract development
Familiarity with web3.js or ethers.js (for front-end interaction)

##Contract Deployment
Network: Core Testnet
Contract Address: 0x836E78d3059a17E9D11C509c0b82782490B9d84D
View on Core Testnet Explorer

##Steps to Contribute
Fork the repository and clone it locally.
Install dependencies:
bash
Copy
Edit
npm install
Set up a .env file with:
env
Copy
Edit
PRIVATE_KEY=your_core_testnet_wallet_private_key
Implement new features, fix bugs, or improve the front-end.
Test thoroughly using Core Testnet tokens.
Submit a pull request with clear documentation on your changes.

##Contribution Guidelines
Follow best practices for smart contract security
Ensure all key contract functions are tested
Provide clear documentation for new functionality
Ensure game fairness and randomness are maintained

Issues
If you encounter any bugs, feel free to open an Issue in this repository. Please include:

Detailed steps to reproduce the bug
Screenshots if applicable
Environment details (browser, OS, etc.)
License
This project is licensed under the MIT License - see the LICENSE file for details.