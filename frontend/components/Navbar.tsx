import React from 'react';
import logo from "../public/logo.png";
import Image from 'next/image';

const Navbar = () => {
  return (
    <div className='px-5 py-5'>
        <Image src={logo} alt="logo" width={500} height={150} />
    </div>
  )
}

export default Navbar