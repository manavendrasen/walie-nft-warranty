import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Platform Test Cases", function () {
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
  // No Deployment checks as there is no initiated values on constructor call
  describe("Minting", function () {
    it("Should correctly set the tokenId", async function () {
      const {nftWarranty,platform, addr1, addr2} = await loadFixture(InitSetup);
      await (await platform.createWarranty(nftWarranty.address,"data",addr1.address)).wait();
      const newWarranty = await platform.itemIdToWarranty(1);
      // console.log(JSON.stringify(newWarranty,null,2));
      expect(newWarranty[1]).to.equal(1);
    })

    it("Should correctly set the NFTWarranty address", async function () {
      const {nftWarranty,platform, addr1} = await loadFixture(InitSetup);
      await (await platform.createWarranty(nftWarranty.address,"data",addr1.address)).wait();
      const newWarranty = await platform.itemIdToWarranty(1);
      expect(newWarranty[2]).to.equal(nftWarranty.address);
    })

    it("Should correctly set the owner", async function () {
      const {platform, addr1, nftWarranty} = await loadFixture(InitSetup);
      await (await platform.createWarranty(nftWarranty.address,"data",addr1.address)).wait();
      const newWarranty = await platform.itemIdToWarranty(1);
      expect(await newWarranty[3]).to.equal(addr1.address);
    })
  })
  describe("Fetching", function () {
    it("Should correctly fetch the number of warranties", async function () {
      const {platform, nftWarranty, addr1} = await loadFixture(InitSetup);
      await (await platform.createWarranty(nftWarranty.address,"data",addr1.address)).wait();
      await platform.itemIdToWarranty(1);
      // console.log(JSON.stringify(await platform.fetchMyNFTs())); // calling fetch by address1
      // expect((await platform.fetchMyNFTs()).length).to.equal(1);
    })
    it("Should revert if no warrenty found", async function () {
      const {nftWarranty, platform, addr1, addr2} = await loadFixture(InitSetup);
      await (await platform.createWarranty(nftWarranty.address,"data",addr1.address)).wait();
      await platform.itemIdToWarranty(1);
      // console.log(JSON.stringify(await platform.fetchMyNFTs()));// calling fetch by address2
      // expect((await platform.fetchMyNFTs()).length).to.equal(0);
    })
  })
});

//     describe("Events", function () {
//       it("Should emit an event on withdrawals", async function () {
//         const { lock, unlockTime, lockedAmount } = await loadFixture(
//           InitSetup
//         );

//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw())
//           .to.emit(lock, "Withdrawal")
//           .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
//       });
//     });

//     describe("Transfers", function () {
//       it("Should transfer the funds to the owner", async function () {
//         const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
//           InitSetup
//         );

//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw()).to.changeEtherBalances(
//           [owner, lock],
//           [lockedAmount, -lockedAmount]
//         );
//       });
//     });
//   });
// });
