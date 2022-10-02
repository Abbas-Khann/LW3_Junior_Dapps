import type { NextPage } from 'next'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'

const Home: NextPage = () => {
  return (
    <main className='min-h-screen bg-black'>
      <Navbar />
      <Hero />
    </main>
  )
}

export default Home
