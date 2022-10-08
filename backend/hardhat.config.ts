import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY: string | undefined = process.env.PRIVATE_KEY;
const RPC_URL: string | undefined = process.env.RPC_URL;
const MUMBAI_RPC_URL: string | undefined = process.env.MUMBAI_RPC_URL;

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    mumbai: {
      // url: RPC_URL,
      url: MUMBAI_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY]: []
    }
  }
}

export default config;
