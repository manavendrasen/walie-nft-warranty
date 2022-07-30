import hre from "hardhat";

async function main() {
  // const NFTWarranty = await ethers.getContractFactory("NFTWarranty");
  // const Platform = await ethers.getContractFactory("Platform");

  // const platform = await Platform.deploy();
  // await platform.deployed();
  // console.log("Platform contact deployed to:", platform.address);

  // const nftWarranty = await NFTWarranty.deploy(platform.address);
  // await nftWarranty.deployed();
  // console.log("NFTWarranty contact deployed to:", nftWarranty.address);

  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  let txHash, txReceipt;
  const Platform = await hre.ethers.getContractFactory("Platform");
  const platform = await Platform.deploy();
  await platform.deployed();

  txHash = platform.deployTransaction.hash;
  txReceipt = await hre.ethers.provider.waitForTransaction(txHash);
  let platformAddress = txReceipt.contractAddress;

  console.log("platform deployed to:", platformAddress);

  const NFTWarranty = await hre.ethers.getContractFactory("NFTWarranty");
  const nft = await NFTWarranty.deploy(platformAddress);
  await nft.deployed();

  txHash = nft.deployTransaction.hash;
  // console.log(`NFTWarranty hash: ${txHash}\nWaiting for transaction to be mined...`);
  txReceipt = await hre.ethers.provider.waitForTransaction(txHash);
  let nftAddress = txReceipt.contractAddress;

  console.log("nft deployed to:", nftAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
