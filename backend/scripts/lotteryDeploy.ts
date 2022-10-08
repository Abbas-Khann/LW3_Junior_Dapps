import { ethers } from "hardhat";
const { FEE, VRFCOORDINATOR, LINK_TOKEN, KEY_HASH } = require("../constants/index");

const main = async (): Promise<void> => {

    const randomWinnerGame = await ethers.getContractFactory("RandomWinnerGame");

    console.log("FEE:", FEE, "COORDINATOR: ", VRFCOORDINATOR, "KEYHASH: ", KEY_HASH, "LINK_TOKEN: ", LINK_TOKEN)
    const deployedRandomWinnerGameContract = await randomWinnerGame.deploy(
      "0x8C7382F9D8f56b33781fE506E897a4F1e2d17255",
        "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
        "0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4",
        ethers.utils.parseEther("0.0001")
    );


    await deployedRandomWinnerGameContract.deployed();

    console.log(
        "Contract Address: ",
        deployedRandomWinnerGameContract.address
    )

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });