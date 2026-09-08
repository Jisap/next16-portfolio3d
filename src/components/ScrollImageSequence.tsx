"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


/**
 * Propósito: Renderiza una secuencia de 100 imágenes WebP en un <canvas> sincronizada con el scroll vertical de la página.
 * Optimización de carga: Usa precarga por lotes (PRELOAD_BATCH_SIZE) y image.decode() para no bloquear el hilo principal.
 * Lógica de dibujo:
     - Escala las imágenes para cubrir el viewport (object-fit: cover manual).
     -Implementa un fallback inteligente (drawCurrentFrame) que busca el frame más cercano disponible si el actual aún no ha cargado.
 */

const FRAME_COUNT = 100;
const PRELOAD_BATCH_SIZE = 10;

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Genera la ruta dinámica para cada frame de la secuencia
const framePath = (index: number) =>
    `/Images/Home/sequence/frame-${String(index + 1).padStart(3, "0")}.webp`;

export default function ScrollImageSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const currentFrameRef = useRef(0);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    // Detecta preferencia del usuario para reducir movimiento (accesibilidad)
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

        updatePreference();
        mediaQuery.addEventListener("change", updatePreference);

        return () => mediaQuery.removeEventListener("change", updatePreference);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        const images: HTMLImageElement[] = [];
        const pendingResolves = new Set<() => void>();
        let isCancelled = false;
        let resizeFrame: number | null = null;
        let sequenceTween: gsap.core.Tween | null = null;

        // Dibuja un frame específico escalado para cubrir el canvas manteniendo proporción
        const drawFrame = (image: HTMLImageElement) => {
            if (isCancelled || !image.naturalWidth || !image.naturalHeight) return;

            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = "high";
            context.clearRect(0, 0, canvas.width, canvas.height);

            const scale = Math.max(
                canvas.width / image.naturalWidth,
                canvas.height / image.naturalHeight
            );
            const width = image.naturalWidth * scale;
            const height = image.naturalHeight * scale;
            const x = (canvas.width - width) / 2;
            const y = (canvas.height - height) / 2;

            context.drawImage(image, x, y, width, height);
        };

        // Busca el frame actual o el más cercano ya cargado para evitar huecos visuales
        const drawCurrentFrame = () => {
            for (let distance = 0; distance < FRAME_COUNT; distance++) {
                const lower = currentFrameRef.current - distance;
                const upper = currentFrameRef.current + distance;
                const image = images[lower] ?? images[upper];

                if (image?.complete && image.naturalWidth > 0) {
                    drawFrame(image);
                    return;
                }
            }
        };

        // Ajusta el tamaño del canvas considerando DPR (Retina) para nitidez
        const resizeCanvas = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(window.innerWidth * dpr);
            canvas.height = Math.round(window.innerHeight * dpr);
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = "high";

            drawCurrentFrame();
        };

        // Carga una imagen específica con manejo de promesas y decodificación asíncrona
        const loadFrame = (index: number) =>
            new Promise<HTMLImageElement>((resolve) => {
                if (images[index]?.complete && images[index].naturalWidth > 0) {
                    resolve(images[index]);
                    return;
                }

                const image = new Image();
                image.decoding = "async";
                images[index] = image;

                const finish = () => {
                    pendingResolves.delete(finish);
                    if (!isCancelled && Math.abs(index - currentFrameRef.current) <= 1) {
                        drawCurrentFrame();
                    }
                    resolve(image);
                };
                pendingResolves.add(finish);

                image.onload = () => {
                    void image.decode().catch(() => undefined).finally(finish);
                };
                image.onerror = finish;
                image.src = framePath(index);
            });

        // Precarga el resto de frames en lotes para optimizar el rendimiento inicial
        const preloadRemainingFrames = async () => {
            for (let start = 1; start < FRAME_COUNT && !isCancelled; start += PRELOAD_BATCH_SIZE) {
                const indexes = Array.from(
                    { length: Math.min(PRELOAD_BATCH_SIZE, FRAME_COUNT - start) },
                    (_, offset) => start + offset
                );
                await Promise.all(indexes.map(loadFrame));
            }
        };

        // Manejo eficiente del resize con requestAnimationFrame
        const handleResize = () => {
            if (resizeFrame !== null) cancelAnimationFrame(resizeFrame);
            resizeFrame = requestAnimationFrame(() => {
                resizeFrame = null;
                resizeCanvas();
            });
        };

        resizeCanvas();
        window.addEventListener("resize", handleResize);

        // Inicializa con el primer frame y dispara la precarga si no hay restricción de movimiento
        void loadFrame(0).then((firstFrame) => {
            if (isCancelled) return;
            drawFrame(firstFrame);
            if (!prefersReducedMotion) void preloadRemainingFrames();
        });

        if (!prefersReducedMotion) {
            const frameState = { index: 0 };
            // Vincula el índice del frame al scroll de la página usando GSAP Scrub
            sequenceTween = gsap.to(frameState, {
                index: FRAME_COUNT - 1,
                ease: "none",
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true,
                },
                onUpdate: () => {
                    currentFrameRef.current = Math.round(frameState.index);
                    drawCurrentFrame();
                },
            });
        }

        // Limpieza completa de recursos al desmontar el componente
        return () => {
            isCancelled = true;
            sequenceTween?.scrollTrigger?.kill();
            sequenceTween?.kill();
            window.removeEventListener("resize", handleResize);

            if (resizeFrame !== null) cancelAnimationFrame(resizeFrame);
            [...pendingResolves].forEach((finish) => finish());
            images.forEach((image) => {
                image.onload = null;
                image.onerror = null;
                image.src = "";
            });
        };
    }, [prefersReducedMotion]);

    return (
        <>
            {/* Canvas que renderiza la secuencia de imágenes controlada por scroll */}
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                className="fixed inset-0 z-0 h-full w-full pointer-events-none opacity-[0.82] brightness-[1.03] contrast-[1.08] saturate-[1.05]"
            />
            {/* Capas de superposición para mejorar legibilidad y profundidad visual */}
            <div
                aria-hidden="true"
                className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-background/30 via-transparent to-background/80"
            />
            <div
                aria-hidden="true"
                className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_50%,_var(--background)_95%)]"
            />
        </>
    );
}