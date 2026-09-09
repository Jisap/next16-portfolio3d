import AboutSection from '@/components/AboutSection'
import CertificatesSection from '@/components/CertificatesSection'
import ExperienceTimeline from '@/components/ExperienceTimeline'
import HeroSection from '@/components/HeroSection'
import ParticleCanvas from '@/components/ParticleCanvas'
import ScrollImageSequence from '@/components/ScrollImageSequence'
import ScrollRevealText from '@/components/ScrollRevealText'
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
        <section id="skills" className="relative w-full py-20 px-6 max-w-7xl mx-auto border-t border-white/5 z-10">
          {/* Luz ambiental decorativa de fondo */}
          <div className="pointer-events-none absolute top-8 left-1/2 -translate-x-1/2 w-[650px] h-[300px] bg-orange/5 blur-[120px] rounded-full" />

          <div className="relative flex flex-col items-center text-center gap-4 mb-14">
            <p className="font-barlow-condensed text-xs sm:text-sm tracking-[.35rem] sm:tracking-[.5rem] uppercase text-orange font-bold drop-shadow-[0_0_12px_rgba(249,52,52,0.4)]">
              CAPABILITIES &amp; TOOLING
            </p>

            {/* Animación letra por letra coherente con AboutSection */}
            <ScrollRevealText triggerStart="top 85%">
              <h2 className="text-3xl sm:text-5xl font-bigger-display uppercase tracking-wide text-foreground font-normal">
                {"TECHNICAL STACK".split(" ").map((word, wIdx) => (
                  <span key={wIdx} className="inline-block mr-[0.3em] overflow-hidden">
                    {Array.from(word).map((char, cIdx) => (
                      <span key={cIdx} className="char-span inline-block">
                        {char}
                      </span>
                    ))}
                  </span>
                ))}
              </h2>
            </ScrollRevealText>

            <p className="max-w-xl text-sm sm:text-base text-foreground/80 font-normal leading-relaxed">
              Frameworks, languages, ML libraries, databases, and development tooling used to build scalable products.
            </p>
          </div>

          <TechStackSection />
        </section>

        {/* Certificates & Achievements Section */}
        <section id="certificates" className="relative w-full py-20 px-6 max-w-7xl mx-auto border-t border-white/5 z-10">
          {/* Luz ambiental decorativa de fondo */}
          <div className="pointer-events-none absolute top-8 left-1/2 -translate-x-1/2 w-[650px] h-[300px] bg-orange/5 blur-[120px] rounded-full" />

          <div className="relative flex flex-col items-center text-center gap-4 mb-14">
            <p className="font-barlow-condensed text-xs sm:text-sm tracking-[.35rem] sm:tracking-[.5rem] uppercase text-orange font-bold drop-shadow-[0_0_12px_rgba(249,52,52,0.4)]">
              VERIFIED CREDENTIALS
            </p>

            {/* Animación letra por letra coherente con AboutSection y TechStackSection */}
            <ScrollRevealText triggerStart="top 85%">
              <h2 className="text-3xl sm:text-5xl font-bigger-display uppercase tracking-wide text-foreground font-normal">
                {"CERTIFICATES & ACHIEVEMENTS".split(" ").map((word, wIdx) => (
                  <span key={wIdx} className="inline-block mr-[0.3em] overflow-hidden">
                    {Array.from(word).map((char, cIdx) => (
                      <span key={cIdx} className="char-span inline-block">
                        {char}
                      </span>
                    ))}
                  </span>
                ))}
              </h2>
            </ScrollRevealText>

            <p className="max-w-xl text-sm sm:text-base text-foreground/80 font-normal leading-relaxed">
              Official recognitions across hackathons, job simulations, technical workshops, and specialized courses.
            </p>
          </div>

          <CertificatesSection />
        </section>

        {/* Experience & Timeline Section */}
        <section id="experience" className="w-full py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
          <div className="flex flex-col items-center text-center gap-4 mb-14">
            <p className="font-barlow-condensed text-xs sm:text-sm tracking-[.35rem] sm:tracking-[.5rem] uppercase text-orange font-bold">
              TIMELINE & ROLES
            </p>
            <h2 className="text-3xl sm:text-5xl font-bigger-display uppercase tracking-wide text-foreground">
              EXPERIENCE & SPRINT TRACKS
            </h2>
            <p className="max-w-xl text-sm sm:text-base text-foreground/70 font-normal">
              Startup co-founding, competitive hackathon building sprints, and industry job simulations.
            </p>
          </div>
          <ExperienceTimeline />
        </section>
      </div>
    </>
  )
}

export default Home