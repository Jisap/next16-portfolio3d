"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAppContext } from "../app/context/AppContext";
import { animateDrawSVG } from "../../lib/drawSvg";


/**
 * Propósito: Pantalla de carga inicial con animación de logo y transición de salida tipo cortina.
 * Flujo de animación:
    - Inicia con cortina expandida (pantalla negra).
    - Dibuja los trazos del logo en paralelo.
    - Colapsa la cortina para revelar el contenido.
    - Desmonta el overlay del DOM al finalizar.
 * Gestión de estado: Usa isMounted para eliminar completamente el overlay después de la animación, evitando interferencias.
 * Referencias: Almacena los paths del logo en un array para animarlos secuencialmente mediante la utilidad animateDrawSVG.
 */


// Estados del path SVG para la cortina: expandida (cubre pantalla) y colapsada (invisible)
const CURTAIN_COLLAPSED = "M0 2S175 1 500 1s500 1 500 1V0H0Z";
const CURTAIN_EXPANDED = "M0 1000S175 1000 500 1000s500 1000 500 1000V0H0Z";

export default function LoadingScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setIsLoading } = useAppContext();
  // Controla si el overlay está montado en el DOM
  const [isMounted, setIsMounted] = useState(true);

  const overlayRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<SVGPathElement>(null);
  // Array para almacenar referencias a los paths del logo que se animarán
  const pathsRef = useRef<(SVGPathElement | null)[]>([]);

  useGSAP(() => {
    if (!curtainRef.current) return;

    // Inicializa la cortina en estado expandido (visible)
    gsap.set(curtainRef.current, { attr: { d: CURTAIN_EXPANDED } });

    const tl = gsap.timeline({
      // Al finalizar toda la secuencia, actualiza el estado global y desmonta el overlay
      onComplete: () => {
        setIsLoading(false);
        setIsMounted(false);
      },
    });

    // Fase 1: Dibuja en paralelo todos los trazos del logo usando la utilidad externa
    tl.add(() => {
      pathsRef.current.forEach((path) => {
        if (path) {
          animateDrawSVG(path, 0, 100, 0.9, "power2.inOut");
        }
      });
    });

    // Pausa breve para apreciar el logo completo antes de ocultarlo
    tl.to({}, { duration: 0.5 });

    // Fase 2: Colapsa la cortina revelando el contenido principal
    tl.to(curtainRef.current, {
      attr: { d: CURTAIN_COLLAPSED },
      duration: 0.8,
      ease: "power3.inOut",
    });

    // Fase 3: Desvanece el contenedor overlay completamente
    tl.to(overlayRef.current, { autoAlpha: 0, duration: 0.3 }, "-=0.2");
  }, []); // Solo se ejecuta una vez al montar

  return (
    <>
      {/* Renderizado condicional: solo muestra el overlay mientras isMounted sea true */}
      {isMounted && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[9999] pointer-events-none"
        >
          <svg
            className="absolute inset-0 w-full h-lvh"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
          >
            <path ref={curtainRef} className="fill-[#0d0d0d]" d={CURTAIN_EXPANDED} />
          </svg>

          {/* Contenedor centrado del logo AKA */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <svg
              viewBox="0 0 360 150"
              className="w-48 h-20 sm:w-64 sm:h-28 md:w-80 md:h-36 fill-none drop-shadow-[0_0_25px_rgba(249,52,52,0.25)]"
            >
              {/* Chevron Triangle */}
              <path
                ref={(el) => { pathsRef.current[0] = el; }}
                d="M 25 35 L 68 65 L 25 95 Z"
                className="stroke-orange stroke-[8] fill-none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Letter 'A' (First) */}
              <path
                ref={(el) => { pathsRef.current[1] = el; }}
                d="M 95 105 L 125 25 L 155 105"
                className="stroke-[#f2f2f2] stroke-[10] fill-none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                ref={(el) => { pathsRef.current[2] = el; }}
                d="M 107 78 L 143 78"
                className="stroke-[#f2f2f2] stroke-[10] fill-none"
                strokeLinecap="round"
              />

              {/* Letter 'K' */}
              <path
                ref={(el) => { pathsRef.current[3] = el; }}
                d="M 180 25 L 180 105"
                className="stroke-[#f2f2f2] stroke-[10] fill-none"
                strokeLinecap="round"
              />
              <path
                ref={(el) => { pathsRef.current[4] = el; }}
                d="M 230 25 L 180 65"
                className="stroke-[#f2f2f2] stroke-[10] fill-none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                ref={(el) => { pathsRef.current[5] = el; }}
                d="M 195 55 L 235 105"
                className="stroke-[#f2f2f2] stroke-[10] fill-none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Letter 'A' (Second) */}
              <path
                ref={(el) => { pathsRef.current[6] = el; }}
                d="M 260 105 L 290 25 L 320 105"
                className="stroke-[#f2f2f2] stroke-[10] fill-none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                ref={(el) => { pathsRef.current[7] = el; }}
                d="M 272 78 L 308 78"
                className="stroke-[#f2f2f2] stroke-[10] fill-none"
                strokeLinecap="round"
              />

              {/* Underline Accent */}
              <path
                ref={(el) => { pathsRef.current[8] = el; }}
                d="M 95 124 L 320 124"
                className="stroke-orange stroke-[7] fill-none"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      )}
      {children}
    </>
  );
}