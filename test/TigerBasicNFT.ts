import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { TigerBasicNFT } from "../typechain-types";

describe("TigerBasicNFT contract", function () {
  let tiger: TigerBasicNFT;
  let deployer: SignerWithAddress;
  let artist: SignerWithAddress;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;
  let addrs;

  const logger = ethers.utils.Logger.globalLogger();

  beforeEach(async function () {
    [deployer, artist, alice, bob, ...addrs] = await ethers.getSigners();
    const tigerFactory = await ethers.getContractFactory("TigerBasicNFT");
    tiger = (await tigerFactory.deploy(artist.address, ethers.utils.parseEther("1"))) as TigerBasicNFT;
    await tiger.deployed();
  });

  it("artist should be initial owner", async function () {
    expect(await tiger.getOwner(0)).to.equal(artist.address);
    expect(await tiger.getOwner(99)).to.equal(artist.address);
  });

  it("initially everything should be for sale", async function () {
    let forSale = await tiger.isForSale(0);
    expect(forSale[0]).to.equal(true);
    expect(forSale[1]).to.equal(ethers.utils.parseEther("1"));
    forSale = await tiger.isForSale(99);
    expect(forSale[0]).to.equal(true);
    expect(forSale[1]).to.equal(ethers.utils.parseEther("1"));
  });

  it("only owner can put tiger up for sale", async function () {
    await expect(tiger.connect(bob).putUpForSale(13, ethers.utils.parseEther("1"))).to.be.revertedWith("not owner");
  });

  it("owner can put tiger up for sale", async function () {
    await tiger.connect(bob).buyTiger(13, { value: ethers.utils.parseEther("1") });
    await tiger.connect(bob).putUpForSale(13, ethers.utils.parseEther("2"));
    const forSale = await tiger.isForSale(13);
    expect(forSale[0]).to.equal(true);
    expect(forSale[1]).to.equal(ethers.utils.parseEther("2"));
  });

  it("owner can withdraw tiger from sale", async function () {
    await tiger.connect(bob).buyTiger(13, { value: ethers.utils.parseEther("1") });
    await tiger.connect(bob).putUpForSale(13, ethers.utils.parseEther("2"));
    await tiger.connect(bob).withdrawFromSale(13);
    const forSale = await tiger.isForSale(13);
    expect(forSale[0]).to.equal(false);
    expect(forSale[1]).to.equal(ethers.utils.parseEther("0"));
  });

  it("someone can buy a tiger that is for sale", async function () {
    expect(await tiger.connect(alice).getBalance(bob.address)).to.equal(0);
    await tiger.connect(bob).buyTiger(13, { value: ethers.utils.parseEther("1") });
    expect(await tiger.connect(alice).getOwner(13)).to.equal(bob.address);
    expect(await tiger.connect(alice).getBalance(bob.address)).to.equal(1);
    expect(await tiger.connect(alice).tigerByOwnerAndIndex(bob.address, 0)).to.equal(13);
  });

  it("purchaser can resell a tiger", async function () {
    await tiger.connect(bob).buyTiger(13, { value: ethers.utils.parseEther("1") });
    expect(await tiger.getBalance(bob.address)).to.equal(1);
    expect(await tiger.getOwner(13)).to.equal(bob.address);
    expect(await tiger.tigerByOwnerAndIndex(bob.address, 0)).to.equal(13);
    await tiger.connect(bob).putUpForSale(13, ethers.utils.parseEther("2"));
    await tiger.connect(alice).buyTiger(13, { value: ethers.utils.parseEther("2") });
    expect(await tiger.getBalance(bob.address)).to.equal(0);
    expect(await tiger.getBalance(alice.address)).to.equal(1);
    expect(await tiger.getOwner(13)).to.equal(alice.address);
    expect(await tiger.tigerByOwnerAndIndex(alice.address, 0)).to.equal(13);
  });

  it("multiple tiger purchases can be tracked", async function () {
    await tiger.connect(bob).buyTiger(3, { value: ethers.utils.parseEther("1") });
    await tiger.connect(bob).buyTiger(13, { value: ethers.utils.parseEther("1") });
    await tiger.connect(bob).buyTiger(23, { value: ethers.utils.parseEther("1") });
    expect(await tiger.getBalance(bob.address)).to.equal(3);
    expect(await tiger.getOwner(13)).to.equal(bob.address);
    expect(await tiger.tigerByOwnerAndIndex(bob.address, 0)).to.equal(3);
    expect(await tiger.tigerByOwnerAndIndex(bob.address, 1)).to.equal(13);
    expect(await tiger.tigerByOwnerAndIndex(bob.address, 2)).to.equal(23);
  });

  it("multiple tiger purchases and resales can be tracked", async function () {
    await tiger.connect(bob).buyTiger(3, { value: ethers.utils.parseEther("1") });
    await tiger.connect(bob).buyTiger(13, { value: ethers.utils.parseEther("1") });
    await tiger.connect(bob).buyTiger(23, { value: ethers.utils.parseEther("1") });
    await tiger.connect(bob).putUpForSale(3, ethers.utils.parseEther("2"));
    await tiger.connect(bob).putUpForSale(13, ethers.utils.parseEther("2"));
    await tiger.connect(alice).buyTiger(3, { value: ethers.utils.parseEther("2") });
    await tiger.connect(alice).buyTiger(13, { value: ethers.utils.parseEther("2") });
    expect(await tiger.getBalance(bob.address)).to.equal(1);
    expect(await tiger.tigerByOwnerAndIndex(bob.address, 0)).to.equal(23);
    await expect(tiger.tigerByOwnerAndIndex(bob.address, 1)).to.be.revertedWith("owner doesn't have that many tigers");
    expect(await tiger.getBalance(alice.address)).to.equal(2);
    expect(await tiger.tigerByOwnerAndIndex(alice.address, 0)).to.equal(3);
    expect(await tiger.tigerByOwnerAndIndex(alice.address, 1)).to.equal(13);
  });

  it("tiger should show as no longer for sale after it's been bought", async function () {
    await tiger.connect(bob).buyTiger(38, { value: ethers.utils.parseEther("1") });
    expect((await tiger.isForSale(38))[0]).to.equal(false);
    expect(await tiger.connect(alice).getOwner(38)).to.equal(bob.address);
  });

  it("can't buy a tiger that is not for sale", async function () {
    await tiger.connect(alice).buyTiger(38, { value: ethers.utils.parseEther("1") });
    await expect(tiger.connect(bob).buyTiger(38, { value: ethers.utils.parseEther("1") })).to.be.revertedWith(
      "not for sale",
    );
  });

  it("can't buy a tiger that has just been bought by someone else", async function () {
    await tiger.connect(alice).buyTiger(13, { value: ethers.utils.parseEther("1") });
    await tiger.connect(alice).putUpForSale(13, ethers.utils.parseEther("1"));
    await tiger.connect(bob).buyTiger(13, { value: ethers.utils.parseEther("1") });
    await expect(tiger.connect(alice).buyTiger(13, { value: ethers.utils.parseEther("1") })).to.be.revertedWith(
      "not for sale",
    );
  });

  // TODO - is it useful to check alice initial balance and end balance and check that end balance > initial balance in this test?
  // technically if the initial and end balances are close, like buy for 1 and sell for 1.1, then potentially gas fees are high enough
  // that the end balance is less. So the test case may be a bit brittle. Also especially because of artist and contract commission
  // Related: https://ethereum-waffle.readthedocs.io/en/latest/matchers.html#change-ether-balance
  it("user can sell and withdraw funds", async function () {
    // have alice buy, list for sale, and have bob buy. Check alice can withdraw after commissions are taken
    await tiger.connect(alice).buyTiger(13, { value: ethers.utils.parseEther("1") });
    await tiger.connect(alice).putUpForSale(13, ethers.utils.parseEther("1.5"));
    await tiger.connect(bob).buyTiger(13, { value: ethers.utils.parseEther("1.5") });
    
    // check pending withdrawals state to see alice has 1.41 eth to withdraw, then try withdrawing, then check balance is zeroed out
    expect(await tiger.pendingWithdrawals(alice.address)).to.equal(ethers.utils.parseUnits("1.41", "ether"));
    await tiger.connect(alice).withdrawFunds();
    expect(await tiger.pendingWithdrawals(alice.address)).to.equal(ethers.utils.parseUnits("0", "ether"));
  });

  it("artist balance correctly updates for commissions and withdrawal succeeds", async function () {
    // have alice buy, list for sale, and have bob buy. 
    await tiger.connect(alice).buyTiger(15, { value: ethers.utils.parseEther("1") });

    expect(await tiger.getWithdrawalBalance(artist.address)).to.equal(ethers.utils.parseUnits("0.99", "ether"));

    await tiger.connect(alice).putUpForSale(15, ethers.utils.parseEther("2"));
    await tiger.connect(bob).buyTiger(15, { value: ethers.utils.parseEther("2") });

    // check that pending withdrawals is correct for alice and artist (containing original purchase and commission)
    expect(await tiger.getWithdrawalBalance(alice.address)).to.equal(ethers.utils.parseUnits("1.88", "ether"));
    expect(await tiger.getWithdrawalBalance(artist.address)).to.equal(ethers.utils.parseUnits("1.09", "ether")); // 0.99 from first sale + 0.1 from second sale

    await tiger.connect(artist).withdrawFunds();
    expect(await tiger.getWithdrawalBalance(artist.address)).to.equal(ethers.utils.parseUnits("0", "ether"));
  });


  it("contract gets commission on all purchases and can withdraw", async function () {
    expect(await tiger.getWithdrawalBalance(deployer.address)).to.equal(ethers.utils.parseUnits("0", "ether"));

    // have alice buy, list for sale, and have bob buy.
    await tiger.connect(alice).buyTiger(15, { value: ethers.utils.parseEther("1") });

    expect(await tiger.getWithdrawalBalance(deployer.address)).to.equal(ethers.utils.parseUnits("0.01", "ether"));

    await tiger.connect(alice).putUpForSale(15, ethers.utils.parseEther("2"));
    await tiger.connect(bob).buyTiger(15, { value: ethers.utils.parseEther("2") });

    // check that pending withdrawals is correct for deployer
    expect(await tiger.getWithdrawalBalance(deployer.address)).to.equal(ethers.utils.parseUnits("0.03", "ether")); // 0.01 from first sale + 0.02 from second sale

    await tiger.connect(deployer).withdrawFunds();
    expect(await tiger.getWithdrawalBalance(deployer.address)).to.equal(ethers.utils.parseUnits("0", "ether"));
  });

});
