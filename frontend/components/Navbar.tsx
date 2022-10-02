import React from 'react';
import logo from "../public/logo.png";
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {
  return (
    <nav className='px-5 py-2 flex items-center justify-between bg-gradient-to-r from-[#212b3c] to-[#112B3C] text-white'>
        <Image src={logo} alt="logo" width={246} height={71} />
        <ConnectButton  />
    </nav>
  )
}

export default Navbar