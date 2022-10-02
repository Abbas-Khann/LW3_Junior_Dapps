import React from 'react';
import logo from "../public/logo.png";
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {
  return (
    <div className='px-5 py-8 flex items-center justify-between'>
        <Image src={logo} alt="logo" width={246} height={71} />
        <ConnectButton  />
    </div>
  )
}

export default Navbar