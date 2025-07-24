const hre = require("hardhat");

async function main() {
  const Oracle = await hre.ethers.getContractFactory("AtvOnChainOracle");
  const oracle = await Oracle.deploy();
  await oracle.deployed();
  console.log("Deployed AtvOnChainOracle at:", oracle.address);

  // usage demonstration (pass addresses when calling calculateAndStorePrice later)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
