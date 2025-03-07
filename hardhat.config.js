require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// Custom task to print accounts
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.19",
  networks: {
    coreTestnet: {
      url: "https://rpc.test2.btcs.network",
      chainId: 1114,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  },
  etherscan: {
    apiKey: "your_etherscan_key_if_needed"
  }
};
