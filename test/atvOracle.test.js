const { ethers } = require("hardhat");

// Mainnet forked addresses for test
const vaultAddr = "0x0";
const storageAddr = "0x0";

describe("AtvOnChainOracle print test", function () {
  it("should calculate and print all values from latestRoundData", async function () {
    // Deploy the contract
    const Oracle = await ethers.getContractFactory("AtvOnChainOracle");
    const oracle = await Oracle.deploy();
    await oracle.waitForDeployment();

    // Calculate and store the price
    await oracle.calculateAndStorePrice(vaultAddr, storageAddr);

    // Get all values from latestRoundData
    const [roundId, price, startedAt, updatedAt, answeredInRound] = await oracle.latestRoundData();

    // Print all results
    console.log("roundId:", roundId.toString());
    console.log("price (8 decimals):", price.toString());
    console.log("startedAt:", startedAt.toString());
    console.log("updatedAt:", updatedAt.toString());
    console.log("answeredInRound:", answeredInRound.toString());
  });
});
