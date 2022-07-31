import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("NFTWarranty Test Cases", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function InitSetup() {
    // addr1 and addr2 are test addresses
    const [deployer, addr1, addr2] = await ethers.getSigners();
    const NFTWarranty = await ethers.getContractFactory("NFTWarranty");
    const Platform = await ethers.getContractFactory("Platform");

    const platform = await Platform.deploy();
    const nftWarranty = await NFTWarranty.deploy(platform.address);

    return {platform, nftWarranty, deployer, addr1, addr2}
  }

  describe("NFTWarranty Deployment", function () {
    it("Should track the name and symbol of nftWarrenty collection", async function () {
      const {nftWarranty} = await loadFixture(InitSetup);
      expect(await nftWarranty.name()).to.equal("NFT Warranty");
      expect(await nftWarranty.symbol()).to.equal("NFTW");
    });
  });

  describe("NFTWarranty Mint", function () {
    it("Should track minted warranty", async function () {
      const {nftWarranty} = await loadFixture(InitSetup);
      const newWarranty = await (await nftWarranty.mint("data")).wait();
      expect(newWarranty).to.not.equal(null);
    })
  })
});