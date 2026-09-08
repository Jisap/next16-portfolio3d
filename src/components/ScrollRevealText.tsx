"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealTextProps {
  children: React.ReactNode;
  triggerRef: React.RefObject<HTMLElement | null>;
  triggerStart?: string;
  triggerEnd?: string;
}

const ScrollRevealText = ({
  children,
  triggerRef,
  triggerStart = "top 85%",
  triggerEnd = "top 40%",
}: ScrollRevealTextProps) => {

  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!wrapperRef.current || !triggerRef.current) return;              // Si no hay ref, no hay animación

    const chars = wrapperRef.current.querySelectorAll(".char-span");     // Selecciona todos los elementos con la clase "char-span"
    if (chars.length === 0) return;                                      // Si no hay elementos, no hay animación

    gsap.set(chars, { yPercent: 100, opacity: 0 });                      // Estado inicial: ocultos y desplazados

    const st = ScrollTrigger.create({                                    // Crea un ScrollTrigger
      trigger: triggerRef.current,                                       // Elemento que activa la animación
      start: triggerStart,                                               // Posición de inicio (cuando el trigger entra en el viewport)
      end: triggerEnd,                                                   // Posición de fin (cuando el trigger sale del viewport)
      once: true,                                                        // La animación solo se ejecuta una vez
      onEnter: () => {                                                   // Función que se ejecuta cuando el trigger entra en el viewport
        gsap.to(chars, {                                                    // Animación de los caracteres
          yPercent: 0,                                                      // Vuelve a la posición original
          opacity: 1,                                                       // Se vuelve visible
          duration: 0.7,                                                    // Duración de la animación
          ease: "power3.out",                                               // Curva de aceleración
          stagger: (i, target) =>                                                     // Retraso entre caracteres
            0.03 * parseFloat(target.getAttribute("data-delay") || "0") + i * 0.008,  // Calcula el retraso para cada caracter
        });
      },
    });

    return () => st.kill();                                            // Limpia el ScrollTrigger cuando el componente se desmonta
  }, []);

  return <div ref={wrapperRef}>{children}</div>;                      // Retorna el wrapper con los caracteres
}

export default ScrollRevealText