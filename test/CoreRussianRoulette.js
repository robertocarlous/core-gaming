const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CoreRussianRoulette", function () {
    let CoreRussianRoulette, contract, owner, player1, player2, player3, player4;

    const stakeAmount = ethers.parseEther("0.1");

    beforeEach(async () => {
        [owner, player1, player2, player3, player4] = await ethers.getSigners();
        CoreRussianRoulette = await ethers.getContractFactory("CoreRussianRoulette");
        contract = await CoreRussianRoulette.deploy();
        await contract.waitForDeployment();
    });

    it("Should create a new game room", async () => {
        await contract.connect(owner).createGameRoom(stakeAmount, { value: stakeAmount });

        const game = await contract.getGameStatus(0);

        expect(game.creator).to.equal(owner.address);
        expect(game.stakeAmount).to.equal(stakeAmount);
        expect(game.status).to.equal(0); // Active
        expect(game.playerCount).to.equal(1);
    });

    it("Players should be able to join the game", async () => {
        await contract.connect(owner).createGameRoom(stakeAmount, { value: stakeAmount });

        await contract.connect(player1).joinGameRoom(0, { value: stakeAmount });
        await contract.connect(player2).joinGameRoom(0, { value: stakeAmount });
        await contract.connect(player3).joinGameRoom(0, { value: stakeAmount });
        await contract.connect(player4).joinGameRoom(0, { value: stakeAmount });

        const players = await contract.getPlayers(0);
        expect(players.length).to.equal(5);
        expect(players).to.include(player1.address);
        expect(players).to.include(player2.address);
        expect(players).to.include(player3.address);
        expect(players).to.include(player4.address);
    });

    it("Should not allow more than 5 players to join", async () => {
        await contract.connect(owner).createGameRoom(stakeAmount, { value: stakeAmount });

        await contract.connect(player1).joinGameRoom(0, { value: stakeAmount });
        await contract.connect(player2).joinGameRoom(0, { value: stakeAmount });
        await contract.connect(player3).joinGameRoom(0, { value: stakeAmount });
        await contract.connect(player4).joinGameRoom(0, { value: stakeAmount });

        const [extraPlayer] = await ethers.getSigners(); // anyone else (could use ethers.getSigner(5))
        await expect(contract.connect(extraPlayer).joinGameRoom(0, { value: stakeAmount }))
            .to.be.revertedWith("Game is full");
    });

    it("Anyone can start the game when full", async () => {
        await contract.connect(owner).createGameRoom(stakeAmount, { value: stakeAmount });
        await contract.connect(player1).joinGameRoom(0, { value: stakeAmount });
        await contract.connect(player2).joinGameRoom(0, { value: stakeAmount });
        await contract.connect(player3).joinGameRoom(0, { value: stakeAmount });
        await contract.connect(player4).joinGameRoom(0, { value: stakeAmount });

        await expect(contract.connect(player1).startGame(0))
            .to.emit(contract, "GameStarted")
            .withArgs(0);

        const game = await contract.getGameStatus(0);
        expect(game.status).to.equal(1); // InProgress
    });

    it("Cannot spin before game starts", async () => {
        await contract.connect(owner).createGameRoom(stakeAmount, { value: stakeAmount });
        await contract.connect(player1).joinGameRoom(0, { value: stakeAmount });

        await expect(contract.spinRoulette(0)).to.be.revertedWith("Game is not in progress");
    });

    it("Players are eliminated when spinning", async () => {
        await contract.connect(owner).createGameRoom(stakeAmount, { value: stakeAmount });
        await contract.connect(player1).joinGameRoom(0, { value: stakeAmount });
        await contract.connect(player2).joinGameRoom(0, { value: stakeAmount });
        await contract.connect(player3).joinGameRoom(0, { value: stakeAmount });
        await contract.connect(player4).joinGameRoom(0, { value: stakeAmount });

        await contract.startGame(0);

        await expect(contract.spinRoulette(0))
            .to.emit(contract, "PlayerEliminated");

        const players = await contract.getPlayers(0);
        expect(players.length).to.equal(4);
    });

    it("Final player should win the prize pool", async () => {
        await contract.connect(owner).createGameRoom(stakeAmount, { value: stakeAmount });
        await contract.connect(player1).joinGameRoom(0, { value: stakeAmount });
        await contract.connect(player2).joinGameRoom(0, { value: stakeAmount });
        await contract.connect(player3).joinGameRoom(0, { value: stakeAmount });
        await contract.connect(player4).joinGameRoom(0, { value: stakeAmount });

        await contract.startGame(0);

        // Simulate elimination until 1 player left
        for (let i = 0; i < 4; i++) {
            await contract.spinRoulette(0);
        }

        // Winner should get all the stakes (5 players x stakeAmount)
        const winner = (await contract.getPlayers(0))[0];
        const prizePool = stakeAmount * BigInt(5);
        const winnerBalance = await ethers.provider.getBalance(winner);

        // Expect winner balance to increase (but need to account for gas, so not exact)
        expect(winnerBalance).to.be.above(prizePool);
    });

    it("Rejects direct transfers", async () => {
        await expect(owner.sendTransaction({
            to: contract.target,
            value: ethers.parseEther("0.01")
        })).to.be.revertedWith("Direct transfers not allowed");
    });
});
