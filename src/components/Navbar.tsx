"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Download, Menu, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { useAppContext } from "../../src/app/context/AppContext";
import { playClick, playHover } from "../../lib/soundeEffects";
import { assetsConfig } from "../../data/bioData";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Certificates", href: "#certificates" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  { name: "GitHub", href: "https://github.com/ayushagarwal619", Icon: FaGithub },
  { name: "LinkedIn", href: "https://linkedin.com/in/ayushagarwal619", Icon: FaLinkedin },
];

export default function Navbar() {
  const { isNavbarOpen, setIsNavbarOpen } = useAppContext();
  const pathname = usePathname();

  useEffect(() => {
    setIsNavbarOpen(false);
  }, [pathname, setIsNavbarOpen]);

  useEffect(() => {
    document.body.style.overflow = isNavbarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isNavbarOpen]);

  return (
    <>
      {/* Completely Borderless, Floating Transparent Futuristic HUD Navigation */}
      <header className="fixed top-5 left-6 right-6 max-w-7xl mx-auto z-[999] pointer-events-none">
        <div className="w-full flex items-center justify-between gap-4 pointer-events-auto">
          {/* LEFT: Compact AKA Logo & Technical Subtitle */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              aria-label="Ayush Kumar Agarwal (AKA)"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
              className="relative z-[1000] flex items-center group transition-transform duration-300 hover:scale-105"
            >
              <Image
                src="/Images/logo-mark.svg"
                alt="AKA Logo"
                width={110}
                height={44}
                priority
                className="h-6 md:h-7 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(249,52,52,0.4)]"
              />
            </Link>

            <span className="hidden xl:inline-flex items-center gap-2 border-l border-white/15 pl-3.5 text-[9px] font-mono tracking-widest text-foreground/50 uppercase select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse shadow-[0_0_6px_#f93434]" />
              DEVELOPER // CREATOR // LEARNER
            </span>
          </div>

          {/* CENTER: Spacious Borderless Navigation with Active Red Dot + Underline Accent */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-10">
            {NAV_LINKS.map((link, idx) => {
              const isActive = pathname === link.href || (link.href === "/" && pathname === "/");
              return (
                <React.Fragment key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => playClick()}
                    onMouseEnter={() => playHover()}
                    className={`group relative flex items-center gap-1.5 font-barlow-condensed text-xs lg:text-sm tracking-[.18rem] uppercase font-semibold transition-all duration-300 
                      ${isActive
                        ? "text-orange drop-shadow-[0_0_8px_rgba(249,52,52,0.6)]"
                        : "text-foreground/75 hover:text-white hover:drop-shadow-[0_0_8px_rgba(249,52,52,0.4)]"
                      }`}
                  >
                    {/* Active Glowing Dot */}
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-orange shadow-[0_0_8px_#f93434]" />
                    )}
                    <span>{link.label}</span>
                    {/* Subtle Underline Accent */}
                    <span
                      className={`absolute -bottom-1 left-0 h-[1.5px] bg-orange transition-all duration-300 
                        ${isActive
                          ? "w-full shadow-[0_0_6px_#f93434]"
                          : "w-0 group-hover:w-full opacity-60"
                        }
                      `}
                    />
                  </Link>

                  {/* Micro HUD Accent Dot between navigation items */}
                  {idx < NAV_LINKS.length - 1 && (
                    <span className="hidden xl:inline-block w-1 h-1 rounded-full bg-white/15 select-none" />
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* RIGHT: Borderless Floating Transparent Download Resume Button */}
          <div className="flex items-center gap-3">
            <a
              href={assetsConfig.resumePdf}
              download="Ayush_Kumar_Agarwal_Resume.pdf"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
              className="hidden lg:inline-flex items-center gap-2 bg-transparent py-1.5 font-barlow-condensed text-xs tracking-[.14rem] uppercase text-foreground/80 transition-all duration-300 hover:text-orange hover:drop-shadow-[0_0_10px_rgba(249,52,52,0.6)]"
            >
              <Download className="h-3.5 w-3.5 text-orange transition-transform duration-300 group-hover:translate-y-0.5" />
              <span>Download Resume</span>
            </a>

            {/* Mobile Navigation Toggle */}
            <button
              onClick={() => {
                playClick();
                setIsNavbarOpen((prev) => !prev);
              }}
              aria-label={isNavbarOpen ? "Close menu" : "Open menu"}
              className="md:hidden relative z-[1000] w-9 h-9 flex items-center justify-center text-foreground cursor-pointer transition-colors"
            >
              {isNavbarOpen ? <X className="w-6 h-6 text-orange" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile HUD Fullscreen Overlay */}
      <div
        className={`fixed inset-0 z-[998] bg-background/95 backdrop-blur-2xl flex flex-col items-start justify-center px-8 gap-6 transition-all duration-500 ease-in-out md:hidden ${isNavbarOpen
          ? "opacity-100 pointer-events-auto translate-y-0"
          : "opacity-0 pointer-events-none -translate-y-4"
          }
        `}
      >
        {NAV_LINKS.map((link, idx) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => playClick()}
            style={{ transitionDelay: isNavbarOpen ? `${idx * 60}ms` : "0ms" }}
            className="font-bigger-display text-4xl uppercase text-foreground transition-transform duration-300 hover:text-orange"
          >
            {link.label}
          </Link>
        ))}

        <div className="flex items-center gap-5 mt-10">
          {SOCIAL_LINKS.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              onClick={() => playClick()}
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-foreground hover:bg-orange hover:border-orange hover:text-background transition-all duration-300"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}