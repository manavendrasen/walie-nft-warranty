import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  let txHash, txReceipt;
  const Platform = await ethers.getContractFactory("Platform");
  const platform = await Platform.deploy();
  await platform.deployed();

  txHash = platform.deployTransaction.hash;
  txReceipt = await ethers.provider.waitForTransaction(txHash);
  let nftMarketAddress = txReceipt.contractAddress;

  console.log("platform deployed to:", nftMarketAddress);

  const NFTWarranty = await ethers.getContractFactory("NFTWarranty");
  const nftWarranty = await NFTWarranty.deploy(nftMarketAddress);
  await nftWarranty.deployed();

  txHash = nftWarranty.deployTransaction.hash;
  txReceipt = await ethers.provider.waitForTransaction(txHash);
  let nftAddress = txReceipt.contractAddress;

  console.log("nftWarranty deployed to:", nftAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
