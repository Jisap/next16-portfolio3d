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
  toggleActions?: string;
  once?: boolean;
  stagger?: number;                                                     // Retraso entre cada letra en segundos
  duration?: number;                                                    // Duración de la animación de cada letra
}

const ScrollRevealText = ({
  children,
  triggerRef,
  triggerStart = "top 85%",
  triggerEnd = "bottom 20%",
  toggleActions = "play reverse play reverse",
  once = false,
  stagger = 0.045,                                                      // 0.045s entre letras para efecto cascada fluido y visible
  duration = 0.6,
}: ScrollRevealTextProps) => {

  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!wrapperRef.current) return;

    const chars = wrapperRef.current.querySelectorAll(".char-span");     // Selecciona todos los elementos con la clase "char-span"
    if (chars.length === 0) return;                                      // Si no hay elementos, no hay animación

    const targetTrigger = (triggerRef && triggerRef.current) ? triggerRef.current : wrapperRef.current;

    gsap.fromTo(
      chars,
      {
        yPercent: 100,                                                   // Estado inicial: desplazado hacia abajo
        opacity: 0,                                                      // Estado inicial: transparente
      },
      {
        yPercent: 0,                                                     // Estado final: posición original
        opacity: 1,                                                      // Estado final: visible
        duration,                                                        // Duración de la animación de cada letra
        ease: "power3.out",                                              // Curva de aceleración
        stagger,                                                         // Escalón de tiempo perceptible entre letras
        scrollTrigger: {
          trigger: targetTrigger,                                        // Elemento que activa la animación
          start: triggerStart,                                           // Posición de inicio
          end: triggerEnd,                                               // Posición de fin
          once,                                                          // Si solo se ejecuta una vez
          toggleActions: once ? undefined : toggleActions,               // Acciones de reproducción / reversión
        },
      }
    );
  }, { scope: wrapperRef, dependencies: [triggerRef, triggerStart, triggerEnd, toggleActions, once, stagger, duration] });

  return <div ref={wrapperRef}>{children}</div>;                      // Retorna el wrapper con los caracteres
}

export default ScrollRevealText