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
    if (!wrapperRef.current || !triggerRef.current) return;

    const chars = wrapperRef.current.querySelectorAll(".char-span");
    if (chars.length === 0) return;

    gsap.set(chars, { yPercent: 100, opacity: 0 });

    const st = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: triggerStart,
      end: triggerEnd,
      once: true,
      onEnter: () => {
        gsap.to(chars, {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: (i, target) =>
            0.03 * parseFloat(target.getAttribute("data-delay") || "0") + i * 0.008,
        });
      },
    });

    return () => st.kill();
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}

export default ScrollRevealText