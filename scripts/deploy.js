const hre = require("hardhat");

async function main() {
    const CoreRussianRoulette = await hre.ethers.getContractFactory("CoreRussianRoulette");
    const coreRussianRoulette = await CoreRussianRoulette.deploy();

    await coreRussianRoulette.waitForDeployment(); // Important for ethers v6

    console.log("Contract deployed to:", await coreRussianRoulette.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
