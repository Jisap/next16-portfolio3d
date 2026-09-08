import AboutSection from '@/components/AboutSection'
import HeroSection from '@/components/HeroSection'
import ParticleCanvas from '@/components/ParticleCanvas'
import ScrollImageSequence from '@/components/ScrollImageSequence'
import TechStackSection from '@/components/TechStackSection'
import React from 'react'

const Home = () => {
  return (
    <>
      <div className="relative min-h-screen bg-background text-foreground flex flex-col items-center">
        <ScrollImageSequence />
        <ParticleCanvas />
        <HeroSection />
        <AboutSection />

        {/* Tech Stack Section */}
        <section id="skills" className="w-full py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
          <div className="flex flex-col items-center text-center gap-4 mb-14">
            <p className="font-barlow-condensed text-xs sm:text-sm tracking-[.35rem] sm:tracking-[.5rem] uppercase text-orange font-bold">
              CAPABILITIES & TOOLING
            </p>

            <h2 className="text-3xl sm:text-5xl font-bigger-display uppercase tracking-wide text-foreground">
              TECHNICAL STACK
            </h2>

            <p className="max-w-xl text-sm sm:text-base text-foreground/70 font-normal">
              Frameworks, languages, ML libraries, databases, and development tooling used to build scalable products.
            </p>
          </div>

          <TechStackSection />
        </section>
      </div>
    </>
  )
}

export default Home