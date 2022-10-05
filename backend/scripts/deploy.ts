import { ethers } from "hardhat";


const main = async (): Promise<void> => {

  const metadataURL: string = "ipfs://Qmbygo38DWF1V8GttM1zy89KzyZTPU2FLUzQtiDvB7q6i5";

  const khanPunks = await ethers.getContractFactory("KhanPunks");

  const deployedKhanPunksContract = await khanPunks.deploy(metadataURL);

  await deployedKhanPunksContract.deployed();

  console.log("Khan Punks Contract address: ", deployedKhanPunksContract.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
