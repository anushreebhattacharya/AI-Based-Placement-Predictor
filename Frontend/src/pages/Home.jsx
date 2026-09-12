import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../assets/Hero.jpg'

const Home = () => {
  return (
    <div className='min-h-screen bg-slate-50/50 flex flex-col font-sans'>
      <Navbar />
      <main className='flex-1 max-w-7xl w-full mx-auto px-8 lg:px-16 py-10 flex flex-col justify-between'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center my-auto'>
          <div className='space-y-6'>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F2A35] leading-tight'>AI-Powered <br />
             <span className='text-[#0D9488]'>Placement</span>Predictor
            </h1>
            <p className='text-gray-600 text-lg max-w-md leading-relaxed'>Discover your placement potential, identify skill gaps and improve your career readiness.</p>
            <div className='flex items-center gap-4 pt-2'>
              <button className='px-7 py-3 rounded-xl bg-[#0D9488] text-white font-semibold shadow-md hover:bg-[#0B7A6E] transition'>Get Started</button>
            </div>
          </div>
          <div className='flex justify-center items-center'>
            <img src={Hero} alt="Home" className='w-full max-w-xl object-contain' />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
