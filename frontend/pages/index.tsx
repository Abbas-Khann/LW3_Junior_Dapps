import type { NextPage } from 'next'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'

const Home: NextPage = () => {
  return (
    <main className='min-h-screen'>
      <Navbar />
      <Hero />
      <Footer />
    </main>
  )
}

export default Home
