import React, {useEffect, useState, useReducer} from 'react';
import Image from 'next/image';
import LotteryImg from '../public/lotteryImg.png';
import { FETCH_CREATED_GAME } from '../queries';
import { subgraphQuery } from '../utils';
import { RANDOM_WINNER_GAME_ADDRESS, RANDOM_WINNER_GAME_ABI } from '../constants/KhanPunks';
import { useContract, useProvider, useSigner, useAccount } from 'wagmi';
import { BigNumber, utils } from 'ethers';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const LotteryHero = () => {

    const walletConnected = useAccount();
    const provider = useProvider();
    const { data: signer } = useSigner();
    const contract = useContract({
      addressOrName: RANDOM_WINNER_GAME_ADDRESS,
      contractInterface: RANDOM_WINNER_GAME_ABI,
      signerOrProvider: signer || provider
    });
    const zero = BigNumber.from("0");
    const [isOwner, setIsOwner] = useState<boolean>(false);
    const [entryFee, setEntryFee] = useState<BigNumber>(zero);
    const [maxPlayers, setMaxPlayers] = useState<string>("0");
    const [gameStarted, setGameStarted] = useState<boolean>(true)
    const [players, setPlayers] = useState<string[]>([]);
    const [winner, setWinner] = useState<null>(null);
    const [logs, setLogs] = useState<any[]>([]);
    const forceUpdate = useReducer(() => ({}), {})[1];

    const startGame = async (): Promise<void> => {
      try {
        const tx: any = await contract.startGame(maxPlayers, entryFee);
        await tx.wait();
        toast.success("Game has been started!!!")  
      } 
      catch (err: any) {
        console.error(err);
        toast.error(err.reason);
      }
    }

    const joinGame = async (): Promise<void> => {
      try {
        const tx: any = await contract.joinGame({
          value: entryFee
        })
        await tx.wait();
        toast.success("You have successfully joined the game"); 
      } 
      catch (err: any) {
        console.error(err);
        toast.error(err.reason);
      }
    }

    const checkIfGameStarted = async () => {
      try {
        const _gameStarted: boolean = await contract.gameStarted();
        const _gameArray: any = await subgraphQuery(FETCH_CREATED_GAME());
        const _game = _gameArray.games[0];
        let _logs: any = [];
        if(_gameStarted) {
          _logs = [`Game has started with ID: ${_game.id}`];
          if(_game.players && _game.players.length > 0) {
            _logs.push(
              `${_game.players.length} / ${_game.maxPlayers} already joined`
            );
            _game.players.forEach((player: any) => {
              _logs.push(`${player} joined`);
            });
          }
          setEntryFee(BigNumber.from(_game.entryFee));
          setMaxPlayers(_game.maxPlayers)
        }
        else if(!gameStarted && _game.winner) {
          _logs = [
            `Last game has ended with ID: ${_game.id}`,
            `Winner is: ${_game.winner}`,
            `Waiting for host to start a new game....`,
          ]
          setWinner(_game.winner);
        }
        setLogs(_logs);
        setPlayers(_game.players);
        setGameStarted(_gameStarted);
        forceUpdate();
      } 
      catch (err: any) {
        console.error(err);
        toast.error(err);  
      }
    }

    const getOwner = async (): Promise<void> => {
      try {
        const _owner = await contract.owner();
        const _address = walletConnected.address;
        if(_address?.toLowerCase() === _owner.toLowerCase()) {
          setIsOwner(true);
        }
      } 
      catch (err: any) {
        console.error(err);
        toast.error(err.reason);  
      }
    }
    console.log(isOwner)
    useEffect(() => {
      checkIfGameStarted();
      getOwner()
      setInterval(() => {
        checkIfGameStarted();
      }, 2000)
    }, [walletConnected.isConnected])


  const renderLogs: any = logs.map((log, index) => {
    <div key={index} className="text-base text-skin-darkMuted lg:text-2xl sm:mb-14 mb-10">
    {log}
    </div>
  })

  const renderButton = () => {
    if(gameStarted) {
      if(players.length === parseInt(maxPlayers)) {
        return (
          <button
          className='px-4 py-2 my-8 border-2 transition duration-300 motion-safe:animate-bounce ease-out hover:ease-in hover:bg-gradient-to-r from-[#5463FF] to-[#89CFFD] text-3xl rounded hover:text-white mb-3'
          disabled
          >
            Choosing winner ....
          </button>
        )
      }
        return(
          <button
          onClick={joinGame}
          className='px-4 py-2 my-8 border-2 transition duration-300 motion-safe:animate-bounce ease-out hover:ease-in hover:bg-gradient-to-r from-[#5463FF] to-[#89CFFD] text-3xl rounded hover:text-white mb-3'
          >
          Join Game
        </button>
      )
    }
    if(isOwner && !gameStarted) {
      return(
        <div>
          <div className='flex flex-col sm:flex-row py-10 justify-evenly'>
            <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEntryFee(
                e.target.value >= "0"
                  ? utils.parseEther(e.target.value.toString())
                  : zero
              );
            }}
            className=' text-black text-2xl text-center border-2 dark:text-white font-bold dark:bg-gradient-to-r dark:bg-clip-text dark:text-transparent 
            dark:from-red-400 dark:via-purple-500 dark:to-white
            dark:animate-text sm:w-40'
            placeholder='Entry Fee Matic'
            type="number"
            />
            <input 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMaxPlayers(e.target.value ?? "0")
            }
            className=' text-black text-2xl text-center border-2 dark:text-white font-bold dark:bg-gradient-to-r dark:bg-clip-text dark:text-transparent 
            dark:from-red-400 dark:via-purple-500 dark:to-white
            dark:animate-text sm:w-40'
            placeholder='Max Players'
            type="number"
            />
          </div>
          <div className='flex items-center justify-center'>
            <button
            onClick={startGame}
            className='px-4 py-2 my-8 border-2 transition duration-300 motion-safe:animate-bounce ease-out hover:ease-in hover:bg-gradient-to-r from-[#5463FF] to-[#89CFFD] text-3xl rounded hover:text-white mb-3'
            >
                Start Game 🚀
            </button>
            </div> 
        </div>
      )
    }
  }

  return (
    <section className="px-2 py-20 bg-gradient-to-r from-[#121212] to-[#002B5B] text-white h-[83vh]">
      <div className="md:flex items-center justify-around ">
        <div className=" md:w-3/5 px-4">
          <h2 className="text-2xl pt-12 inline-block text-black sm:text-5xl md:text-6xl mb-5 font-bold 
            bg-gradient-to-r bg-clip-text text-transparent 
            from-red-400 via-purple-500 to-green-400
            animate-text">
            Welcome to Random <br />
            Winner Game
          </h2>
          <p className="text-base text-skin-darkMuted lg:text-2xl sm:mb-14 mb-10">
            It is a lottery game where winner is chosen randomly<br />and wins the entire lottery pool.
          </p>
          <div>
            {renderButton()}
            </div>
            <div>
            {renderLogs}
            </div>
        </div>
        <div className="hidden md:block w-10/12 md:w-1/3 mx-auto md:mx-0 my-8 order-2 ">
          <Image src={LotteryImg} alt="Lottery Image" />
        </div>
      </div>
    </section>
  )
}

export default LotteryHero