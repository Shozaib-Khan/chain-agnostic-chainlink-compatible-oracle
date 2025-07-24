require("@nomicfoundation/hardhat-toolbox");
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/your_api_key_here" // Replace with your Alchemy API key
      }
    }
  },
  mocha: {
    timeout: 200000  // 200 seconds; adjust as needed (e.g., 100000 for 100s)
  }
};
