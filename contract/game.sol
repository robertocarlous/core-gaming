// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CoreRussianRoulette {
    struct Game {
        address[] players;
        uint256 stakeAmount;
        bool isActive;
        mapping(address => bool) isEliminated;
    }

    mapping(uint256 => Game) public games; // gameId => Game data
    uint256 public nextGameId;

    uint256 public constant MAX_PLAYERS = 5; // 1 creator + 4 joiners

    event GameCreated(uint256 indexed gameId, uint256 stakeAmount);
    event PlayerJoined(uint256 indexed gameId, address player);
    event PlayerEliminated(uint256 indexed gameId, address player);
    event GameWon(uint256 indexed gameId, address winner);

    modifier gameExists(uint256 gameId) {
        require(gameId < nextGameId, "Game does not exist");
        _;
    }

    // Create a new game room (creator joins immediately)
    function createGameRoom(uint256 stakeAmount) external payable {
        require(msg.value == stakeAmount, "Stake amount must match sent value");
        require(stakeAmount > 0, "Stake must be greater than zero");

        Game storage game = games[nextGameId];
        game.stakeAmount = stakeAmount;
        game.isActive = true;

        game.players.push(msg.sender); // Creator joins directly
        emit GameCreated(nextGameId, stakeAmount);
        emit PlayerJoined(nextGameId, msg.sender);

        nextGameId++;
    }

    // Join an existing game room
    function joinGameRoom(uint256 gameId) external payable gameExists(gameId) {
        Game storage game = games[gameId];
        require(game.isActive, "Game is not active");
        require(game.players.length < MAX_PLAYERS, "Game is full");
        require(msg.value == game.stakeAmount, "Stake amount must match");
        require(!isPlayerInGame(game, msg.sender), "Already joined");

        game.players.push(msg.sender);
        emit PlayerJoined(gameId, msg.sender);

        // Auto-lock the game if 5 players are in
        if (game.players.length == MAX_PLAYERS) {
            game.isActive = true;
        }
    }

    // Spin the roulette to eliminate one player (only after game is full)
    function spinRoulette(uint256 gameId) external gameExists(gameId) {
        Game storage game = games[gameId];
        require(game.isActive, "Game is not active");
        require(
            game.players.length == MAX_PLAYERS,
            "Game does not have enough players"
        );

        // Pick a random player to eliminate
        uint256 eliminatedIndex = random(game.players.length);
        address eliminatedPlayer = game.players[eliminatedIndex];

        require(
            !game.isEliminated[eliminatedPlayer],
            "Player already eliminated"
        );

        game.isEliminated[eliminatedPlayer] = true;
        emit PlayerEliminated(gameId, eliminatedPlayer);

        // Remove eliminated player from the array
        game.players[eliminatedIndex] = game.players[game.players.length - 1];
        game.players.pop();

        // If only one player remains, they win the whole pot
        if (game.players.length == 1) {
            address winner = game.players[0];
            uint256 totalPrize = game.stakeAmount * MAX_PLAYERS;

            (bool success, ) = winner.call{value: totalPrize}("");
            require(success, "Prize transfer failed");

            game.isActive = false;
            emit GameWon(gameId, winner);
        }
    }

    // Helper: Check if a player is in the game
    function isPlayerInGame(
        Game storage game,
        address player
    ) internal view returns (bool) {
        for (uint256 i = 0; i < game.players.length; i++) {
            if (game.players[i] == player) {
                return true;
            }
        }
        return false;
    }

    // Random number generator (basic for demo - upgrade to Chainlink VRF for production)
    function random(uint256 max) internal view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        block.prevrandao,
                        msg.sender
                    )
                )
            ) % max;
    }

    // Block direct transfers to contract
    receive() external payable {
        revert("Direct transfers not allowed");
    }

    // View current players in a game (for frontend display)
    function getPlayers(
        uint256 gameId
    ) external view gameExists(gameId) returns (address[] memory) {
        return games[gameId].players;
    }

    // View game details
    function getGameStatus(
        uint256 gameId
    )
        external
        view
        gameExists(gameId)
        returns (uint256 stakeAmount, bool isActive, uint256 playerCount)
    {
        Game storage game = games[gameId];
        return (game.stakeAmount, game.isActive, game.players.length);
    }
}
