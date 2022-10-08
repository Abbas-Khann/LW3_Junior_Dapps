import { ethers } from "hardhat";
const { FEE, VRFCOORDINATOR, LINK_TOKEN, KEY_HASH } = require("../constants/index");

const main = async (): Promise<void> => {

    const randomWinnerGame = await ethers.getContractFactory("RandomWinnerGame");

    console.log("FEE:", FEE, "COORDINATOR: ", VRFCOORDINATOR, "KEYHASH: ", KEY_HASH, "LINK_TOKEN: ", LINK_TOKEN)
    const deployedRandomWinnerGameContract = await randomWinnerGame.deploy(
        VRFCOORDINATOR,
        LINK_TOKEN,
        KEY_HASH,
        FEE
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