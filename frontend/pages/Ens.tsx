import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useEnsName } from 'wagmi'

const Ens = (): JSX.Element => {
  const address: string = "0x7B4A8d0862F049E35078E49F2561630Fac079eB9";  
  const ensName = useEnsName({
    address: '0x7B4A8d0862F049E35078E49F2561630Fac079eB9',
    chainId: 5
  });
  console.log(ensName.data)

  return (
  <div>
    <Navbar />
      <div className='bg-gradient-to-r from-[#121212] to-[#002B5B] h-[85vh]'>
        <h1 className='text-3xl text-center text-white py-14'>ENS Dapp</h1>
        {ensName.data ? <h1 className='text-3xl text-center text-white py-14'>My Amazing Ens is {ensName.data}</h1> 
        : <h1 className='text-3xl text-center text-white py-14'>My address is {address}</h1>
        }
      </div>
    <Footer />
  </div>
  )
}

export default Ens