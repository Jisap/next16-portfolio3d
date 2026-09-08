"use client";

import { useRef, useCallback, useEffect } from "react";

const POOL_SIZE = 3;

interface SoundPool {
    instances: HTMLAudioElement[];
    index: number;
}

const pools: Record<string, SoundPool> = {};  // Se inicializa el pool de sonidos

function getPool(src: string): SoundPool {    // Se obtiene el pool de sonidos
    if (!pools[src]) {
        const instances: HTMLAudioElement[] = [];
        for (let i = 0; i < POOL_SIZE; i++) {
            const audio = new Audio(src);
            audio.preload = "auto";
            audio.volume = 0.3;
            instances.push(audio);
        }
        pools[src] = { instances, index: 0 };
    }
    return pools[src];
}

export function playSound(src: string) {
    if (typeof window === "undefined") return;
    const pool = getPool(src);
    const audio = pool.instances[pool.index];
    pool.index = (pool.index + 1) % POOL_SIZE;
    audio.currentTime = 0;
    audio.play().catch(() => {
        // Autoplay blocked — ignore silently
    });
}

export function playClick() {
    playSound("/sounds/click.mp3");
}

export function playHover() {
    playSound("/sounds/hover.mp3");
}

/**
 * Hook that preloads sounds on mount and returns play functions.
 */
export function useSoundEffects() {
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;
        // Preload pools
        getPool("/sounds/click.mp3");
        getPool("/sounds/hover.mp3");
    }, []);

    return {
        playClick: useCallback(() => playClick(), []),
        playHover: useCallback(() => playHover(), []),
    };
}