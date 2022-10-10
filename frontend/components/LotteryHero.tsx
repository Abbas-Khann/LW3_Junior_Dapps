import React from 'react';
import Image from 'next/image';
import LotteryImg from '../public/lotteryImg.png';

const LotteryHero = () => {

  // const renderButton = (): JSX.Element => {
  //   if(gameStarted) {
  //     if(players.length === maxPlayers)
  //   }
  // }

  return (
    <section className="px-2 py-20 bg-gradient-to-r from-[#121212] to-[#002B5B] text-white h-[83vh]">
      <div className="md:flex items-center justify-around ">
        <div className=" md:w-3/5 px-4">
          <h2 className="text-4xl text-skin-base my-4 leading-tight lg:text-6xl tracking-tighter mb-6">
            Welcome to Random <br />
            Winner Game
          </h2>
          <p className="text-base text-skin-darkMuted lg:text-2xl sm:mb-14 mb-10">
            It is a lottery game where winner is chosen randomly<br />and wins the entire lottery pool.
          </p>
          <div className='flex flex-col sm:flex-row py-10 justify-evenly'>
            <input 
            className=' text-black text-2xl text-center border-2 dark:text-white font-bold dark:bg-gradient-to-r dark:bg-clip-text dark:text-transparent 
            dark:from-red-400 dark:via-purple-500 dark:to-white
            dark:animate-text sm:w-40'
            placeholder='Entry Fee Eth'
            type="number"
            />
            <input 
            className=' text-black text-2xl text-center border-2 dark:text-white font-bold dark:bg-gradient-to-r dark:bg-clip-text dark:text-transparent 
            dark:from-red-400 dark:via-purple-500 dark:to-white
            dark:animate-text sm:w-40'
            placeholder='Max Players'
            type="number"
            />
          </div>
          <div className='flex items-center justify-center'>
            <button
            className='px-4 py-2 my-8 border-2 transition duration-300 motion-safe:animate-bounce ease-out hover:ease-in hover:bg-gradient-to-r from-[#5463FF] to-[#89CFFD] text-3xl rounded hover:text-white mb-3'
            >
                Start Game 🚀
            </button>
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