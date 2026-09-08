"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
// Datos estructurados de tus tecnologías (importados desde un archivo externo para limpieza)
import { techStackData } from "../../data/techStackData";
// El sistema de iconos que explicamos anteriormente
import { TechIcon } from "../../lib/techIconMap";
// Iconos semánticos para las categorías
import {
  Code2,
  Globe,
  Boxes,
  Wrench,
  Database,
  Sparkles,
  Cpu,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * GENERADOR DE DISPERSIÓN DETERMINISTA
 * 
 * Calcula posiciones iniciales aleatorias pero consistentes para cada ítem.
 * "Determinista" significa que si recargas la página, los ítems aparecen en el MISMO lugar desordenado.
 * Esto evita el "hidratación mismatch" entre servidor y cliente.
 */
function getScatterOffsets(
  catIdx: number, // Índice de la categoría (ej: Lenguajes = 0)
  itemIdx: number, // Índice del ítem dentro de la categoría (ej: Python = 2)
  viewportWidth: number
) {
  // Semilla matemática basada en los índices. Garantiza unicidad por ítem.
  const seed = catIdx * 17.1 + itemIdx * 7.3 + 3.14;
  const angle = ((seed * 53.7) % 360) * (Math.PI / 180);

  // Configuración de distancia máxima según el tamaño de pantalla
  let maxDistance = 42;
  let maxRotation = 6;

  if (viewportWidth < 640) {
    // Móvil: Menos dispersión para que no se salgan de la tarjeta
    maxDistance = 14;
    maxRotation = 2;
  } else if (viewportWidth < 1024) {
    // Tablet
    maxDistance = 26;
    maxRotation = 4;
  }

  // Cálculos trigonométricos para obtener coordenadas X e Y basadas en el ángulo
  const radiusNorm = 0.6 + ((seed % 10) / 25);
  const distance = maxDistance * radiusNorm;

  const x = Math.round(Math.cos(angle) * distance);
  const y = Math.round(Math.sin(angle) * (distance * 0.75)); // 0.75 aplana un poco la dispersión vertical

  // Rotación y escala aleatorias pero controladas para dar efecto "orgánico"
  const rotation = Math.round(((seed * 3) % (maxRotation * 2)) - maxRotation);
  const scale = 0.96 + (((seed * 2) % 8) / 100); // Escala entre 0.96 y 1.03
  const opacity = 0.8 + (((seed * 5) % 18) / 100); // Opacidad inicial alta para que sean visibles desde el inicio

  return { x, y, rotation, scale, opacity };
}

/**
 * SELECCIONADOR DE ICONO DE CATEGORÍA
 * Asigna un icono de Lucide específico según el ID de la categoría de datos.
 */
function getCategoryIcon(id: string) {
  switch (id) {
    case "programming-languages": return <Code2 className="w-4 h-4 text-orange" />;
    case "web-technologies": return <Globe className="w-4 h-4 text-orange" />;
    case "frameworks-libraries": return <Boxes className="w-4 h-4 text-orange" />;
    case "tools-platforms": return <Wrench className="w-4 h-4 text-orange" />;
    case "databases-cloud": return <Database className="w-4 h-4 text-orange" />;
    case "soft-skills": return <Sparkles className="w-4 h-4 text-orange" />;
    default: return <Cpu className="w-4 h-4 text-orange" />;
  }
}

export default function TechStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // 1. CHECK DE ACCESIBILIDAD
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Seleccionamos todos los elementos DOM que vamos a animar
      const cards = containerRef.current.querySelectorAll<HTMLElement>(".tech-card");
      const items = containerRef.current.querySelectorAll<HTMLElement>(".tech-item");

      // Si el usuario prefiere reducir movimiento, mostramos todo estático inmediatamente
      if (prefersReducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0 });
        gsap.set(items, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 });
        return;
      }

      const viewportWidth = window.innerWidth;

      // 2. FASE INICIAL: DISPERSIÓN (SCATTER)
      // Antes de empezar la animación, colocamos cada ítem en su posición "desordenada" calculada
      items.forEach((el) => {
        // Leemos los índices que guardamos en el JSX como data-attributes
        const catIdx = Number(el.dataset.catIndex || 0);
        const itemIdx = Number(el.dataset.itemIndex || 0);

        // Obtenemos las coordenadas aleatorias deterministas
        const scatter = getScatterOffsets(catIdx, itemIdx, viewportWidth);

        // Aplicamos esos valores instantáneamente con gsap.set
        gsap.set(el, {
          x: scatter.x,
          y: scatter.y,
          rotation: scatter.rotation,
          scale: scatter.scale,
          opacity: scatter.opacity,
        });
      });

      // 3. TIMELINE CONTROLADA POR SCROLL (SCRUB)
      // 'scrub: 1.2' significa que la animación sigue al scroll con un retraso suave de 1.2s
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%", // Empieza cuando el top del contenedor llega al 85% de la pantalla
          end: "center 50%", // Termina cuando el centro del contenedor llega al 50%
          scrub: 1.2, // Suavizado
        },
      });

      // Animación A: Las tarjetas de categoría aparecen suavemente
      tl.fromTo(
        cards,
        { opacity: 0.35, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "none", // Ease none es crucial para scrub para que siga fielmente al scroll
        },
        0 // Posición en el timeline (empieza al tiempo 0)
      );

      // Animación B: Los ítems tecnológicos convergen a su posición final (x:0, y:0)
      tl.to(
        items,
        {
          x: 0,                   // Vuelven a su posición natural en el flujo HTML
          y: 0,
          rotation: 0,            // Se enderezan
          scale: 1,               // Recuperan su tamaño normal
          opacity: 1,             // Opacidad total
          duration: 1,
          ease: "power2.out",
          stagger: {              // Efecto cascada: no llegan todos a la vez
            each: 0.005,          // 5ms de diferencia entre cada ítem
            from: "start",
          },
        },
        0.05                      // Empieza casi inmediatamente después de iniciar la timeline
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left overflow-hidden md:overflow-visible"
    >
      {techStackData.map((category, catIdx) => (
        <div
          key={category.id}
          // .tech-card: Target para la animación de entrada de la tarjeta
          className="tech-card relative rounded-xl border border-white/10 bg-[#171616] p-6 flex flex-col justify-between transition-all duration-300 hover:border-orange/40"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-5">
              <h4 className="text-lg font-bold font-barlow-condensed tracking-wider uppercase text-foreground flex items-center gap-2">
                {getCategoryIcon(category.id)}
                {category.category}
              </h4>
            </div>

            {category.description && (
              <p className="text-xs text-foreground/50 font-barlow-condensed uppercase tracking-wider mb-4">
                {category.description}
              </p>
            )}

            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {category.items.map((skill, skillIdx) => (
                <span
                  key={`${category.id}-${skill}`}
                  // Data attributes cruciales para que JS sepa qué dispersión aplicar
                  data-cat-index={catIdx}
                  data-item-index={skillIdx}
                  // .tech-item: Target para la animación de convergencia
                  className="tech-item group/pill inline-flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#1c1b1b]/80 hover:bg-[#242222] hover:border-white/20 transition-all duration-200 cursor-default select-none hover:-translate-y-0.5 shadow-sm"
                >
                  <TechIcon
                    name={skill}
                    className={`
                      w-6 h-6 sm:w-6.5 sm:h-6.5 shrink-0 transition-transform duration-200 group-hover/pill:scale-110 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]
                      ${category.id === "soft-skills"
                        ? "text-orange"
                        : ""
                      }
                    `}
                  />
                  <span className="text-xs sm:text-[13px] font-mono font-medium tracking-wide text-foreground/90 group-hover/pill:text-white transition-colors">
                    {skill}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}