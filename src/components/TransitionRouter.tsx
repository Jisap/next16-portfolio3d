"use client";

import React, { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Propósito: Componente wrapper que añade transición tipo "cortina" entre cambios de ruta
 * Mecanismo: Usa dos estados del path SVG (colapsado/expandido) animados con GSAP
 * Estrategia de renderizado: Mantiene el contenido anterior visible mientras anima, luego swappea al nuevo contenido cuando está oculto
 * Trigger: La animación se dispara automáticamente al detectar cambios en pathname
 */

// Estados del path SVG: colapsado (invisible) y expandido (cubre pantalla)
const CURTAIN_COLLAPSED = "M0 2S175 1 500 1s500 1 500 1V0H0Z";
const CURTAIN_EXPANDED = "M0 1000S175 1000 500 1000s500 1000 500 1000V0H0Z";

export default function TransitionRouter({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const curtainRef = useRef<SVGPathElement>(null);
  const isFirstRender = useRef(true);

  // Mantiene los children visibles durante la transición
  const [displayChildren, setDisplayChildren] = useState(children);

  // Almacena los nuevos children para mostrarlos después de la animación
  const pendingChildren = useRef(children);
  pendingChildren.current = children;

  useGSAP(
    () => {
      // En el primer render, muestra los children sin animación
      if (isFirstRender.current) {
        isFirstRender.current = false;
        setDisplayChildren(children);
        return;
      }
      if (!curtainRef.current) return;

      const tl = gsap.timeline();

      // Fase 1: Expande la cortina y actualiza el contenido cuando está cubierta
      tl.to(curtainRef.current, {
        attr: { d: CURTAIN_EXPANDED },
        duration: 0.55,
        ease: "power3.in",
        onComplete: () => setDisplayChildren(pendingChildren.current),
      })
        // Fase 2: Colapsa la cortina revelando el nuevo contenido
        .to(curtainRef.current, {
          attr: { d: CURTAIN_COLLAPSED },
          duration: 0.55,
          ease: "power3.out",
          delay: 0.05,
        });
    },
    { dependencies: [pathname] } // Se ejecuta al cambiar de ruta
  );

  return (
    <>
      {/* SVG overlay que actúa como cortina de transición */}
      <svg
        className="fixed inset-0 w-full h-lvh z-[9998] pointer-events-none"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <path
          ref={curtainRef}
          className="fill-foreground"
          d={CURTAIN_COLLAPSED}
        />
      </svg>
      {displayChildren}
    </>
  );
}