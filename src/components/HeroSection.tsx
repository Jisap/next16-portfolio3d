"use client"

import { useRef } from 'react'

const HeroSection = () => {

  const containerRef = useRef<HTMLDivElement>(null);
  const span1Ref = useRef<HTMLSpanElement>(null);
  const span2Ref = useRef<HTMLSpanElement>(null);

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col justify-between items-center text-center px-4 sm:px-6 pt-28 sm:pt-32 md:pt-36 lg:pt-[28vh] pb-6 sm:pb-8 overflow-hidden select-none">
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[550px] md:w-[750px] h-[300px] bg-orange/[0.04] rounded-full blur-3xl pointer-events-none"
      />

      {/* =======================================================
          LEFT EDITORIAL SUPPORT (Desktop only, framed like reference poster)
      ======================================================== */}
      <div
        aria-hidden="true"
        className="hidden xl:flex flex-col justify-between absolute left-8 2xl:left-14 top-28 bottom-16 pointer-events-none z-10 select-none"
      >
        {/* Top-left: Ideation slogan */}
        <div className="flex flex-col text-left font-barlow-condensed uppercase tracking-[0.25em] text-[11px] leading-tight text-white/50">
          <span>TURNING</span>
          <span>IDEAS INTO</span>
          <span className="text-orange font-bold">REALITY</span>
        </div>

        {/* Mid-left: Disciplines list */}
        <div className="flex flex-col text-left gap-1 font-mono text-[10px] tracking-[0.22em] text-white/40 my-auto">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange shadow-[0_0_8px_#F93434]" />
            <span className="text-white/70 font-semibold">DEVELOP</span>
          </div>
          <span className="pl-3.5">DESIGN</span>
          <span className="pl-3.5">LEARN</span>
          <span className="pl-3.5">ITERATE</span>
          <span className="pl-3.5">GROW</span>
        </div>

        {/* Bottom-left: Geographic coordinates */}
        <div className="flex flex-col text-left font-mono text-[9px] tracking-[0.25em] text-white/35 leading-tight">
          <span>LOC:</span>
          <span>22.57°N</span>
          <span>88.36°E</span>
        </div>
      </div>

      {/* Angled handwritten accent note on left side */}
      <div
        aria-hidden="true"
        className="hidden 2xl:flex flex-col absolute left-[12%] top-[23%] -rotate-12 pointer-events-none select-none opacity-40 font-serif italic text-xs leading-tight text-orange/90"
      >
        <span>Build</span>
        <span className="ml-2">Learn</span>
        <span className="ml-3">Create</span>
        <span className="ml-4 text-white/90">Repeat</span>
      </div>

      {/* =======================================================
          RIGHT EDITORIAL SUPPORT (Desktop only, framed like reference poster)
      ======================================================== */}
      <div
        aria-hidden="true"
        className="hidden xl:flex flex-col justify-between items-end absolute right-8 2xl:right-14 top-28 bottom-16 pointer-events-none z-10 select-none"
      >
        {/* Top-right quote */}
        <div className="flex flex-col text-right font-mono text-[10px] tracking-[0.24em] text-white/45 leading-relaxed">
          <span>&ldquo;DISCIPLINE</span>
          <span>BUILDS</span>
          <span>FREEDOM&rdquo;</span>
          <div className="w-6 h-[1px] bg-orange/60 ml-auto mt-1.5" />
        </div>

        {/* Mid-right: Identity & Standards */}
        <div className="flex flex-col text-right gap-4 my-auto">
          <div className="flex flex-col text-right gap-1 font-mono text-[10px] tracking-[0.22em] text-white/40">
            <div className="flex items-center justify-end gap-2">
              <span className="text-white/70 font-semibold">01 // DEVELOPER</span>
              <span className="w-1.5 h-1.5 rounded-full bg-orange shadow-[0_0_8px_#F93434]" />
            </div>
            <span>AI/ML</span>
            <span>FULL STACK</span>
            <span>PROBLEM SOLVER</span>
            <span>LIFELONG LEARNER</span>
          </div>

          <div className="flex flex-col text-right font-mono text-[10px] tracking-widest text-white/35 leading-tight">
            <span className="text-orange text-xs font-bold font-mono">&lt;/&gt;</span>
            <span className="mt-0.5">SAME PERSON</span>
            <span>HIGHER STANDARDS</span>
            <div className="w-6 h-[1px] bg-white/20 ml-auto mt-1" />
          </div>
        </div>

        {/* Bottom-right quote */}
        <div className="flex flex-col text-right font-mono text-[9px] tracking-[0.22em] text-white/35 leading-tight">
          <span>&ldquo;A BRIGHTER</span>
          <span>TECH TOMORROW&rdquo;</span>
          <div className="w-5 h-[1px] bg-orange/50 ml-auto mt-1" />
        </div>
      </div>

    </section>
  )
}

export default HeroSection