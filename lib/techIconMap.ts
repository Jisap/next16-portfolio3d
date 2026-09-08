import React from "react";
import type { IconType } from "react-icons";
// Importación masiva de iconos de "Simple Icons" (si) para tecnologías específicas
import {
    SiC,
    SiCplusplus,
    SiPython,
    SiJavascript,
    SiTypescript,
    SiHtml5,
    SiCss,
    SiReact,
    SiNextdotjs,
    SiTailwindcss,
    SiBootstrap,
    SiStreamlit,
    SiNodedotjs,
    SiExpress,
    SiFlask,
    SiMysql,
    SiMongodb,
    SiFirebase,
    SiSupabase,
    SiPytorch,
    SiOpencv,
    SiScikitlearn,
    SiGit,
    SiGithub,
    SiPostman,
    SiNpm,
    SiVite,
    SiRender,
    SiFigma,
    SiDocker,
    SiExpo,
    SiPostgresql,
    SiDrizzle,
} from "react-icons/si";

// Iconos de VS Code y Java de otras librerías para mayor precisión
import { VscVscode } from "react-icons/vsc";
import { FaJava } from "react-icons/fa6";

// Iconos semánticos de Lucide para habilidades blandas (Soft Skills)
import { Brain, Puzzle, Users, Compass, Zap, Code2 } from "lucide-react";

// Alias para mantener consistencia en los nombres (CSS3 y VS Code tienen nombres distintos en sus librerías)
const SiCss3 = SiCss;
const SiVisualstudiocode = VscVscode;

export type TechIconType =
    | IconType
    | React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

// --- MAPA DE ICONOS ---
// Relaciona un string (nombre de la tech) con su componente de icono correspondiente.
// Esto permite buscar iconos dinámicamente sin importararlos uno por uno en cada página.
export const techIconMap: Record<string, TechIconType> = {
    // Lenguajes de Programación
    C: SiC,
    "C++": SiCplusplus,
    Java: FaJava,
    Python: SiPython,
    JavaScript: SiJavascript,
    TypeScript: SiTypescript,

    // Tecnologías Web
    HTML5: SiHtml5,
    CSS3: SiCss3,
    "React.js": SiReact,
    React: SiReact, // Múltiples claves apuntan al mismo icono para flexibilidad
    "Next.js": SiNextdotjs,
    Next: SiNextdotjs,
    "Node.js": SiNodedotjs,
    Node: SiNodedotjs,
    "Express.js": SiExpress,
    Express: SiExpress,

    // Frameworks & Librerías (Incluye IA como PyTorch y OpenCV)
    "React Native": SiReact,
    Expo: SiExpo,
    "Tailwind CSS": SiTailwindcss,
    Bootstrap: SiBootstrap,
    Flask: SiFlask,
    Streamlit: SiStreamlit,
    OpenCV: SiOpencv,
    "Scikit-learn": SiScikitlearn,
    "Scikit-Learn": SiScikitlearn,
    "scikit-learn": SiScikitlearn,
    PyTorch: SiPytorch,

    // Herramientas & Plataformas
    Git: SiGit,
    GitHub: SiGithub,
    Postman: SiPostman,
    "VS Code": SiVisualstudiocode,
    "Visual Studio Code": SiVisualstudiocode,
    npm: SiNpm,
    Vite: SiVite,
    Docker: SiDocker,
    Figma: SiFigma,
    Render: SiRender,

    // Bases de Datos & Cloud
    PostgreSQL: SiPostgresql,
    Postgres: SiPostgresql,
    "Drizzle ORM": SiDrizzle,
    Drizzle: SiDrizzle,
    MySQL: SiMysql,
    MongoDB: SiMongodb,
    Supabase: SiSupabase,
    Firebase: SiFirebase,

    // Soft Skills (Habilidades blandas representadas con iconos conceptuales)
    "Analytical Thinking": Brain,
    "Problem Solving": Puzzle,
    "Team Collaboration": Users,
    Adaptability: Compass,
    "Quick Learning": Zap,
};

// --- MAPA DE COLORES DE MARCA ---
// Define los colores hexadecimales oficiales de cada tecnología.
// Esto evita que los iconos se vean todos del mismo color y da un aspecto más profesional y "vivo".
export const techBrandColors: Record<string, string> = {
    // Programming Languages
    C: "#A8B9CC",
    "C++": "#00599C",
    Java: "#ED8B00",
    Python: "#3776AB",
    JavaScript: "#F7DF1E", // Amarillo oficial de JS
    TypeScript: "#3178C6",

    // Web Technologies
    HTML5: "#E34F26",
    CSS3: "#1572B6",
    "React.js": "#61DAFB", // Azul cian de React
    React: "#61DAFB",
    "Next.js": "#FFFFFF",
    Next: "#FFFFFF",
    "Node.js": "#5FA04E",
    Node: "#5FA04E",
    "Express.js": "#E2E8F0",
    Express: "#E2E8F0",

    // Frameworks & Libraries
    "React Native": "#61DAFB",
    Expo: "#FFFFFF",
    "Tailwind CSS": "#06B6D4",
    Bootstrap: "#9063CD",
    Flask: "#E2E8F0",
    Streamlit: "#FF4B4B",
    OpenCV: "#5C3EE8",
    "Scikit-learn": "#F7931E",
    "Scikit-Learn": "#F7931E",
    "scikit-learn": "#F7931E",
    PyTorch: "#EE4C2C",

    // Tools & Platforms
    Git: "#F05032",
    GitHub: "#FFFFFF",
    Postman: "#FF6C37",
    "VS Code": "#007ACC",
    "Visual Studio Code": "#007ACC",
    npm: "#CB3837",
    Vite: "#BD34FE",
    Docker: "#2496ED",
    Figma: "#F24E1E",
    Render: "#46E3B7",

    // Databases & Cloud
    PostgreSQL: "#4169E1",
    Postgres: "#4169E1",
    "Drizzle ORM": "#C5F74F",
    Drizzle: "#C5F74F",
    MySQL: "#4479A1",
    MongoDB: "#47A248",
    Supabase: "#3ECF8E",
    Firebase: "#FFCA28",
};

/**
 * BUSCADOR INTELIGENTE DE ICONOS
 * Intenta encontrar el icono primero por coincidencia exacta.
 * Si falla, normaliza el nombre (quita espacios, pasa a minúsculas) para encontrar coincidencias parciales.
 */
export function getTechIcon(name: string): TechIconType | undefined {
    if (techIconMap[name]) {
        return techIconMap[name];
    }

    // Normalización: "React.js" -> "reactjs"
    const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, "");

    for (const [key, icon] of Object.entries(techIconMap)) {
        if (key.toLowerCase().replace(/[^a-z0-9]/g, "") === normalized) {
            return icon;
        }
    }

    return undefined;
}

/**
 * BUSCADOR DE COLORES DE MARCA
 * Misma lógica de normalización para asegurar que si escribes "react native" o "ReactNative", 
 * encuentre el color correcto.
 */
export function getTechBrandColor(name: string): string | undefined {
    if (techBrandColors[name]) {
        return techBrandColors[name];
    }

    const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, "");
    for (const [key, color] of Object.entries(techBrandColors)) {
        if (key.toLowerCase().replace(/[^a-z0-9]/g, "") === normalized) {
            return color;
        }
    }

    return undefined;
}

/**
 * COMPONENTE REUTILIZABLE <TechIcon />
 * Este es el "producto final" que usas en tu JSX.
 * Se encarga de:
 * 1. Buscar el icono correcto.
 * 2. Aplicar el color de marca oficial automáticamente.
 * 3. Usar un icono por defecto (Code2) si la tecnología no está registrada.
 */
export function TechIcon({
    name,
    className,
    style,
}: {
    name: string;
    className?: string;
    style?: React.CSSProperties;
}) {
    // Obtiene el componente del icono o usa Code2 como fallback
    const IconComponent = getTechIcon(name) || Code2;

    // Obtiene el color de marca
    const brandColor = getTechBrandColor(name);

    // Fusiona el color de marca con cualquier estilo extra que pase el usuario
    const combinedStyle = brandColor ? { color: brandColor, ...style } : style;

    // Renderiza el icono dinámicamente usando React.createElement
    return React.createElement(IconComponent, {
        className,
        style: combinedStyle,
    });
}