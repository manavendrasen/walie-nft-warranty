import { ethers } from "hardhat";

async function main() {
  const NFTWarranty = await ethers.getContractFactory("NFTWarranty");
  const Platform = await ethers.getContractFactory("Platform");

  const platform = await Platform.deploy();
  await platform.deployed();
  console.log("Platform contact deployed to:", platform.address);

  const nftWarranty = await NFTWarranty.deploy(platform.address);
  await nftWarranty.deployed();
  console.log("NFTWarranty contact deployed to:", nftWarranty.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
