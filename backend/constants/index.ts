import { ethers, BigNumber } from "hardhat";

const LINK_TOKEN: string = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
const VRF_COORDINATOR: string = "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D";
const KEY_HASH: string = "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15";
const FEE = ethers.utils.parseEther("0.0001");
module.exports = { LINK_TOKEN, VRF_COORDINATOR, KEY_HASH, FEE }