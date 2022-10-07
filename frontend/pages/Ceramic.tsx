// 
import type { NextPage } from "next";
import Head from "next/head";
import { providers } from "ethers";
import { useEffect, useState, useRef } from "react";
import Web3Modal from "web3modal";
import { useViewerConnection, ViewerRecord } from "@self.id/react";
import { EthereumAuthProvider } from "@self.id/web";
import { useViewerRecord } from "@self.id/react";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  // Connection to Ceramic
  const [connection, connect, disconnect] = useViewerConnection();
  const [name, setName] = useState<string>("");

  const web3ModalRef = useRef<any>();

  // Get provider
  const getProvider = async () => {
    try {
      const provider = await web3ModalRef.current?.connect();
      const wrappedProvider = new providers.Web3Provider(provider);
      return wrappedProvider;
    } catch (error) {
      console.error(error);
    }
  };

  // Connection to Wallet as page loads
  useEffect(() => {
    if (connection.status !== "connected") {
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
    }
  }, [connection.status]);

  // Connect to Self ID using EthereumAuthProvider, provider and address
  const connectToSelfID = async () => {
    try {
      const ethereumAuthProvider =
        (await getEthereumAuthProvider()) as EthereumAuthProvider;
      connect(ethereumAuthProvider);
    } catch (error) {
      console.error(error);
    }
  };

  // Returns a EthereumAuthProvider with provider and logged in address
  const getEthereumAuthProvider = async () => {
    try {
      const wrappedProvider = await getProvider();
      const signer = await wrappedProvider?.getSigner();
      const address = await signer?.getAddress();
      return new EthereumAuthProvider(
        wrappedProvider?.provider,
        address as string
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Seting Name to Ceramic
  function RecordSetter() {
    const record = useViewerRecord("basicProfile") as ViewerRecord<any>;

    const updateRecordName = async (name: string) => {
      await record?.merge?.({ name: name });
    };

    return (
      <div className="flex flex-col justify-center items-center p-6 space-y-5">
        <div className="flex">
          {record.content ? (
            <div className="flex flex-col text-center">
              <span className="text-xl">Hello {record.content.name}!</span>

              <span>
                The above name was loaded from Ceramic Network. Try updating it
                below.
              </span>
            </div>
          ) : (
            <span>
              You do not have a profile record attached to your 3ID. Create a
              basic profile by setting a name below.
            </span>
          )}
        </div>
        <button onClick={() => updateRecordName(name)} className="px-4 py-2 my-1 border-2 transition duration-300 ease-out hover:ease-in hover:bg-gradient-to-r from-[#5463FF] to-[#89CFFD] text-3xl rounded hover:text-white mb-3 sm:w-40">Update</button>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-r from-[#121212] to-[#002B5B] text-white min-h-screen">
        <div className="flex flex-col justify-center items-center space-y-5 p-20">
          <span className="text-2xl pt-12 inline-block text-black border-b-4 border-[#7084a0] sm:text-5xl font-bold 
            bg-gradient-to-r bg-clip-text text-transparent 
            from-red-400 via-purple-500 to-green-400
            animate-text mb-24">
            Ceramic Demo
          </span>
          {connection.status === "connected" ? (
            <span className="px-4 py-2 my-1 border-2 hover:ease-in text-3xl rounded hover:text-white mb-3">Connected</span>
          ) : (
            <button
              className="px-4 py-2 my-1 border-2 transition duration-300 motion-safe:animate-bounce ease-out hover:ease-in hover:bg-gradient-to-r from-[#5463FF] to-[#89CFFD] text-3xl rounded hover:text-white mb-3 sm:w-40"
              onClick={connectToSelfID}
              disabled={connection.status === "connecting"}
            >
              Connect
            </button>
          )}
        </div>

        <div>
          <div className="border-2 border-gray-400/10 text-gray-300 p-12">
            {connection.status === "connected" ? (
              <div className="flex flex-col justify-center items-center">
                <span className="text-center">
                  Your 3ID is {connection.selfID.id}
                </span>
                <RecordSetter />

                <div className="flex flex-row space-x-3">
                  <input
                  className="text-black text-2xl text-center border-2 dark:text-white font-bold dark:bg-gradient-to-r dark:bg-clip-text dark:text-transparent 
                  dark:from-red-400 dark:via-purple-500 dark:to-white
                  dark:animate-text sm:w-40"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value as string);
                      
                    }}
                  />
                </div>
              </div>
            ) : (
              <span>Connect with your wallet to access your 3ID</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;