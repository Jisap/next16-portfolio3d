"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ProjectImageCarouselProps {
  /** Project screenshot paths. Pass an empty array (or omit) if none exist yet. */
  images: string[];
  /** Used for accessible alt text, e.g. the project name. */
  alt: string;
  /** How long each image stays on screen before crossfading to the next. Default 3000ms. */
  intervalMs?: number;
  className?: string;
  /** Optional click callback with the currently active image index. */
  onImageClick?: (index: number) => void;
}

/**
 * Renders a project's screenshots with an automatic crossfade every `intervalMs`.
 * - 0 images  -> clean gradient placeholder, never a broken image icon.
 * - 1 image   -> static, no cycling, no dots.
 * - 2+ images -> auto-cycles with a smooth opacity crossfade, pauses on hover,
 *                shows small progress dots.
 *
 * Parent element must be `position: relative` with a defined height/aspect
 * ratio, since this uses next/image's `fill` mode internally.
 */
export default function ProjectImageCarousel({
  images,
  alt,
  intervalMs = 3000,
  className = "",
  onImageClick,
}: ProjectImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const hasImages = images && images.length > 0;
  const isCycling = hasImages && images.length > 1;

  useEffect(() => {
    if (!isCycling || isPaused) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isCycling, isPaused, images.length, intervalMs]);

  // Reset to the first frame if the images array itself changes (e.g. new project)
  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  if (!hasImages) {
    return null;
  }

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${onImageClick ? "cursor-pointer" : ""} ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={() => onImageClick?.(activeIndex)}
    >
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`${alt} — screenshot ${index + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center transition-opacity duration-700 ease-in-out pointer-events-none"
          style={{ opacity: index === activeIndex ? 1 : 0 }}
        />
      ))}

      {/* Progress dots — interactive so users can manually cycle frames */}
      {isCycling && (
        <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(index);
              }}
              aria-label={`Go to image ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer p-0 border-0 ${index === activeIndex ? "w-4 bg-orange" : "w-1.5 bg-foreground/40 hover:bg-foreground/70"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}