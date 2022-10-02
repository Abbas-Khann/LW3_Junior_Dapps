import type { NextPage } from 'next'
import Navbar from '../components/Navbar'

const Home: NextPage = () => {
  return (
    <main className='min-h-screen bg-black'>
      <Navbar />
    </main>
  )
}

export default Home
