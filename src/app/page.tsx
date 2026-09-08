import AboutSection from '@/components/AboutSection'
import HeroSection from '@/components/HeroSection'
import ParticleCanvas from '@/components/ParticleCanvas'
import ScrollImageSequence from '@/components/ScrollImageSequence'
import React from 'react'

const Home = () => {
  return (
    <>
      <div className="relative min-h-screen bg-background text-foreground flex flex-col items-center">
        <ScrollImageSequence />
        <ParticleCanvas />
        <HeroSection />
        <AboutSection />
      </div>
    </>
  )
}

export default Home