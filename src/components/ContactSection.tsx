"use client";

import React from "react";
// Datos centralizados: evita tener emails o URLs hardcodeadas en múltiples lugares
import { heroContent, assetsConfig, socialLinks } from "../../data/bioData";
import { Download, Mail, ArrowUpRight, Heart } from "lucide-react";
// Iconos de redes sociales específicos
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { playClick, playHover } from "../../lib/soundeEffects";
import ScrollRevealText from "./ScrollRevealText";

export default function ContactSection() {
  return (
    <footer
      id="contact" // ID para navegación directa desde el menú (ej: /#contact)
      className="relative z-10 w-full py-24 px-6 border-t border-white/10 bg-[#0e0d0d] text-center"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">

        {/* ETIQUETA SUPERIOR */}
        <p className="font-barlow-condensed text-xs sm:text-sm tracking-[.35rem] sm:tracking-[.5rem] uppercase text-orange font-bold drop-shadow-[0_0_12px_rgba(249,52,52,0.4)]">
          LET&apos;S COLLABORATE
        </p>

        {/* TÍTULO PRINCIPAL */}
        <ScrollRevealText triggerStart="top 85%">
          <h2 className="text-3xl sm:text-5xl font-bigger-display uppercase tracking-wide text-foreground font-normal">
            {"START A CONVERSATION".split(" ").map((word, wIdx) => (
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

        {/* TEXTO DE INVITACIÓN */}
        <p className="max-w-xl text-base text-foreground leading-relaxed">
          Whether you have an innovative AI product in mind, a hackathon team to form, or a full-stack opportunity, let&apos;s connect.
        </p>

        {/* BOTONES DE ACCIÓN PRINCIPALES (CTA) */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">

          {/* Botón 1: Email Directo */}
          <a
            href={`mailto:${heroContent.email}`} // Abre el cliente de correo del usuario con tu email pre-cargado
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
            // Estilo sólido naranja para destacar como la acción principal
            className="flex items-center gap-2 bg-orange text-background hover:bg-white transition-all font-barlow-condensed text-sm sm:text-base tracking-widest uppercase font-bold px-7 py-3.5 rounded-full shadow-lg shadow-orange/20"
          >
            <Mail className="w-4 h-4" />
            Send Email
          </a>

          {/* Botón 2: Descarga de CV */}
          <a
            href={assetsConfig.resumePdf} // URL del PDF almacenada en config
            download="Ayush_Kumar_Agarwal_Resume.pdf" // Fuerza la descarga con este nombre de archivo específico
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
            // Estilo "ghost" (borde transparente) para ser secundario visualmente
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-foreground border border-white/15 hover:border-orange/50 transition-all font-barlow-condensed text-sm sm:text-base tracking-widest uppercase font-semibold px-7 py-3.5 rounded-full"
          >
            <Download className="w-4 h-4 text-orange" />
            Download Resume
          </a>
        </div>

        {/* ENLACES SOCIALES */}
        <div className="flex items-center gap-6 mt-6">
          {socialLinks.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"           // Abre en nueva pestaña
              rel="noopener noreferrer" // Seguridad estándar para enlaces externos
              onClick={() => playClick()}
              className="flex items-center gap-1.5 text-xs font-barlow-condensed tracking-widest uppercase text-foreground/80 hover:text-orange transition-colors"
            >
              {/* Renderizado condicional del icono según el nombre */}
              {s.name === "GitHub"
                ? <FaGithub className="w-4 h-4" />
                : <FaLinkedin className="w-4 h-4" />
              }
              <span>{s.name}</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" /> {/* Indicador visual de enlace externo */}
            </a>
          ))}
        </div>

        {/* COPYRIGHT Y CRÉDITOS TÉCNICOS */}
        <div className="mt-12 pt-8 border-t border-white/5 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-foreground font-mono gap-4">
          <p>© {new Date().getFullYear()} {heroContent.name}. All rights reserved.</p>

          {/* Mención del Stack Tecnológico (muy valorado por otros devs/recruiters) */}
          <p className="flex items-center gap-1">
            Built with Next.js, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}