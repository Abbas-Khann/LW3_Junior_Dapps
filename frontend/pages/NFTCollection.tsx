import React from 'react';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import IpfsImg from '../public/IPFS.png';
import Footer from '../components/Footer';

const NFTCollection = () => {
  return (
    <div>
        <Navbar />
        <div>
        <section className='bg-gradient-to-r from-[#121212] to-[#002B5B] text-white min-h-screen'>
      <div className='flex justify-center'>
        <h3 className='text-2xl pt-12 inline-block text-black border-b-4 border-[#7084a0] sm:text-5xl font-bold 
            bg-gradient-to-r bg-clip-text text-transparent 
            from-red-400 via-purple-500 to-green-400
            animate-text'
            >
            NFT&nbsp;Collection
        </h3>
      </div>
      <div className='sm:flex sm:items-center sm:justify-center py-16 md:py-0 px-20 text-3xl'>
        <div className='mb-10 flex flex-col items-center'>
        <h1>Welcome to LW3 Junior Punks</h1>
      <button className='px-4 py-2 my-8 border-2 transition duration-300 motion-safe:animate-bounce ease-out hover:ease-in hover:bg-gradient-to-r from-[#5463FF] to-[#89CFFD] text-3xl rounded hover:text-white mb-3'>
          Public Mint 🚀
      </button>
        </div>
      <div className='mt-5 sm:ml-28'>
      <Image src={IpfsImg} width={637} height={552} alt="Image"/>
      </div>
      </div>
    </section>
    </div>
    <Footer />
    </div>
  )
}

export default NFTCollection