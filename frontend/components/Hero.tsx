import React from 'react';
import heroImg from "../public/hero.png";
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <div>
    <section className='bg-gradient-to-r from-[#121212] to-[#002B5B] text-white h-[83vh] 2xl:h-[100vh]'>
      <div className='flex justify-center'>
        <h3 className='text-2xl pt-12 inline-block text-black border-b-4 border-[#7084a0] sm:text-5xl font-bold 
            bg-gradient-to-r bg-clip-text text-transparent 
            from-red-400 via-purple-500 to-green-400
            animate-text
        '>LW3 Junior Dapps</h3>
      </div>
      <div className='sm:flex sm:items-center sm:justify-center py-16 px-20'>
      <div className='text-white md:px-52 md:py-10 flex flex-col items-start'>
        <Link href="/Ens">
        <button
        className='transition duration-300 ease-out hover:ease-in text-xl sm:text-3xl py-2 text-white mb-3 border-b-2'
        >Ens</button>
        </Link>
        <Link href="/NFTCollection">
        <button
        className='transition duration-300 ease-out hover:ease-in text-xl sm:text-3xl py-2 text-white mb-3 border-b-2'
        >NFT&nbsp;Collection</button>
        </Link>
        <Link href="/">
        <button
        className='transition duration-300 ease-out hover:ease-in text-xl sm:text-3xl py-2 text-white mb-3 border-b-2'
        >Ceramic</button>
        </Link>
        <Link href="/">
        <button
        className='transition duration-300 ease-out hover:ease-in text-xl sm:text-3xl py-2 text-white mb-3 border-b-2'
        >Lottery&nbsp;Game</button>
        </Link>
      </div>
      <div className='mt-5 sm:ml-28'>
        <Image src={heroImg} alt="Hero" width={658} height={430} />      
      </div>
      </div>
    </section>
    </div>
  )
}

export default Hero